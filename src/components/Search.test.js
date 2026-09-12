import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

const currentWeather = (name) => ({
    coord: { lon: 88.36, lat: 22.57 },
    main: { temp: 30, humidity: 70, pressure: 1006 },
    weather: [{ main: 'Clouds', description: 'overcast clouds' }],
    wind: { speed: 3.6 },
    sys: { country: 'IN', sunrise: 1000, sunset: 2000 },
    dt: 1500,
    name,
});

// The component reads list[9], [17], [25], [33] and [39], so the stub needs
// at least 40 slots.
const fiveDayForecast = () => ({
    list: Array.from({ length: 40 }, (_, i) => ({
        main: { temp: 25 + (i % 5) },
        dt_txt: `2026-09-${String(14 + Math.floor(i / 8)).padStart(2, '0')} 12:00:00`,
        weather: [{ main: 'Rain' }],
    })),
});

// A lookup resolves two promises before it calls setState, so let those
// microtasks drain inside act() - otherwise React warns about updates that
// land after the assertion.
const settle = () => act(async () => { await Promise.resolve(); await Promise.resolve(); });

const renderSearch = async () => {
    render(<Search />);
    await settle();
};

const press = async (label) => {
    await userEvent.click(screen.getByRole('button', { name: label }));
    await settle();
};

// Every lookup fires two requests: the current reading, then the forecast.
const urlsRequested = () => global.fetch.mock.calls.map(([url]) => url);
const weatherUrls = () => urlsRequested().filter((url) => url.includes('/weather?'));

let cityReturned;

beforeEach(() => {
    cityReturned = 'Kolkata';
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    global.fetch = jest.fn((url) => Promise.resolve({
        json: () => Promise.resolve(
            url.includes('/forecast') ? fiveDayForecast() : currentWeather(cityReturned)
        ),
    }));
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Search', () => {
    it('looks up the default city on first paint and renders what comes back', async () => {
        await renderSearch();

        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());
        expect(screen.getByText('30')).toBeInTheDocument();
        expect(weatherUrls()[0]).toContain('q=kolkata');
        expect(screen.getByRole('searchbox')).toHaveValue('kolkata');
    });

    it('hands the forecast on to the lower card', async () => {
        await renderSearch();

        await waitFor(() => expect(screen.getAllByText('Rain').length).toBeGreaterThan(0));
    });

    it('looks up whatever city is typed when Forecast is pressed', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        cityReturned = 'Lima';
        const input = screen.getByRole('searchbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'lima');
        await press('Forecast');

        await waitFor(() => expect(screen.getByText('Lima, IN')).toBeInTheDocument());
        expect(weatherUrls().some((url) => url.includes('q=lima'))).toBe(true);
    });

    it('trims the input and collapses runs of spaces inside the city name', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        const input = screen.getByRole('searchbox');
        await userEvent.clear(input);
        await userEvent.type(input, '  new   york  ');
        await press('Forecast');

        await waitFor(() => expect(weatherUrls().length).toBeGreaterThan(1));
        // encodeURIComponent turns the single separating space into %20
        expect(weatherUrls().some((url) => url.includes('q=new%20york'))).toBe(true);
        expect(weatherUrls().some((url) => url.includes('%20%20'))).toBe(false);
    });

    it('does not call the API when the box holds only whitespace', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        const input = screen.getByRole('searchbox');
        await userEvent.clear(input);
        await userEvent.type(input, '   ');
        global.fetch.mockClear();
        await press('Forecast');

        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('fires exactly one lookup per press of Forecast', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());
        expect(weatherUrls()).toHaveLength(1);

        await press('Forecast');
        expect(weatherUrls()).toHaveLength(2);

        await press('Forecast');
        expect(weatherUrls()).toHaveLength(3);
    });

    it('does not look anything up until the page is interacted with', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        // one current reading plus its forecast, and nothing more
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('keeps the last good reading on screen when a lookup fails', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        global.fetch.mockRejectedValue(new Error('network down'));
        const input = screen.getByRole('searchbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'nowhere');
        await press('Forecast');

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        expect(screen.getByText('Kolkata, IN')).toBeInTheDocument();
    });

    it('warns when a search the user asked for fails', async () => {
        await renderSearch();
        await waitFor(() => expect(screen.getByText('Kolkata, IN')).toBeInTheDocument());

        global.fetch.mockRejectedValue(new Error('network down'));
        const input = screen.getByRole('searchbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'nowhere');
        await press('Forecast');

        await waitFor(() => expect(window.alert).toHaveBeenCalled());
    });

    it('stays quiet when the lookup on first paint fails', async () => {
        global.fetch.mockRejectedValue(new Error('network down'));

        await renderSearch();

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        expect(window.alert).not.toHaveBeenCalled();
    });
});
