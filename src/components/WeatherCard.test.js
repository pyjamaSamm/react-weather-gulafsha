import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import icons from '../assets/icons';

// A midday reading: dt sits between sunrise and sunset.
const daytime = {
    temp: 30,
    humidity: 70,
    pressure: 1006,
    weather: 'Clouds',
    weatherDesc: 'overcast clouds',
    name: 'Kolkata',
    windspeed: 3.6,
    sunrise: 1000,
    sunset: 2000,
    dt: 1500,
    country: 'IN',
}

describe('WeatherCard', () => {
    it('shows the temperature and the three readings beside it', () => {
        render(<WeatherCard {...daytime} />);

        expect(screen.getByText('30')).toBeInTheDocument();
        expect(screen.getByText('70')).toBeInTheDocument();
        expect(screen.getByText('1006')).toBeInTheDocument();
        expect(screen.getByText('3.6')).toBeInTheDocument();
        expect(screen.getByText('overcast clouds')).toBeInTheDocument();
    });

    it('labels the location with the city and its country', () => {
        render(<WeatherCard {...daytime} />);
        expect(screen.getByText('Kolkata, IN')).toBeInTheDocument();
    });

    it('drops the comma when the country is missing', () => {
        render(<WeatherCard {...daytime} country={undefined} />);
        expect(screen.getByText('Kolkata')).toBeInTheDocument();
    });

    it('shows no location at all before any lookup has returned', () => {
        const { container } = render(<WeatherCard />);
        expect(container).not.toHaveTextContent('undefined');
        expect(container).not.toHaveTextContent('null');
    });

    it('uses the daytime icon while the sun is up', () => {
        render(<WeatherCard {...daytime} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyDay);
    });

    it('uses the night icon once the sun has set', () => {
        render(<WeatherCard {...daytime} dt={2500} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyNight);
    });

    it('uses the night icon before the sun has risen', () => {
        render(<WeatherCard {...daytime} dt={500} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyNight);
    });

    it('stays on the daytime icon when the API gave no sunrise or sunset', () => {
        render(<WeatherCard {...daytime} sunrise={undefined} sunset={undefined} dt={500} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyDay);
    });

    it('re-evaluates the icon when a second city reports the same condition at night', () => {
        const { rerender } = render(<WeatherCard {...daytime} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyDay);

        // same weather string, different city - only dt/sunrise/sunset move
        rerender(<WeatherCard {...daytime} name="Lima" country="PE" dt={2500} />);
        expect(screen.getByAltText('overcast clouds')).toHaveAttribute('src', icons.cloudyNight);
    });

    it('formats the sunset time, and shows a dash when there is none', () => {
        const { unmount } = render(<WeatherCard {...daytime} />);
        expect(screen.getByText(/^\d{1,2}:\d{1,2} PM$/)).toBeInTheDocument();
        unmount();

        render(<WeatherCard {...daytime} sunset={undefined} />);
        expect(screen.getByText('--')).toBeInTheDocument();
    });

    it('falls back to a generic alt text when the API sent no description', () => {
        render(<WeatherCard {...daytime} weatherDesc={undefined} />);
        expect(screen.getByAltText('weather icon')).toBeInTheDocument();
    });
});
