import { render, screen } from '@testing-library/react';
import LowerWeatherCard from './LowerWeatherCard';
import icons from '../assets/icons';

// Search builds this array with a placeholder at index 0, then pushes the
// forecast days after it - so the card reads arr[1] through arr[4].
const forecast = () => ([
    { temp: String, date: String, desc: String },
    { temp: 25, date: 'Mon 14', desc: 'Rain' },
    { temp: 26, date: 'Tue 15', desc: 'Clouds' },
    { temp: 27, date: 'Wed 16', desc: 'Clear' },
    { temp: 28, date: 'Thu 17', desc: 'Snow' },
]);

describe('LowerWeatherCard', () => {
    it('shows a temperature, day and condition for each of the four days', () => {
        render(<LowerWeatherCard name="Kolkata" arr={forecast()} />);

        for (const [temp, day, desc] of [
            ['25', '14 Mon', 'Rain'],
            ['26', '15 Tue', 'Clouds'],
            ['27', '16 Wed', 'Clear'],
            ['28', '17 Thu', 'Snow'],
        ]) {
            expect(screen.getByText(new RegExp(`^${temp}`))).toBeInTheDocument();
            expect(screen.getByText(day)).toBeInTheDocument();
            expect(screen.getByText(desc)).toBeInTheDocument();
        }
    });

    it('rewrites each date as day-of-month then weekday', () => {
        render(<LowerWeatherCard name="Kolkata" arr={forecast()} />);

        expect(screen.getByText('14 Mon')).toBeInTheDocument();
        expect(screen.queryByText('Mon 14')).not.toBeInTheDocument();
    });

    it('picks the icon that matches the condition for each day', () => {
        render(<LowerWeatherCard name="Kolkata" arr={forecast()} />);

        const sources = screen.getAllByAltText('weather icon').map((img) => img.getAttribute('src'));
        expect(sources).toEqual([icons.rainy, icons.cloudyDay, icons.day, icons.snowy]);
    });

    it('renders nothing but placeholders before a forecast arrives', () => {
        render(<LowerWeatherCard />);

        expect(screen.queryByText(/Rain|Clouds|Clear|Snow/)).not.toBeInTheDocument();
        expect(screen.getAllByAltText('weather icon')).toHaveLength(4);
    });

    it('ignores a forecast too short to fill the four days', () => {
        render(<LowerWeatherCard name="Kolkata" arr={forecast().slice(0, 3)} />);

        expect(screen.queryByText('Rain')).not.toBeInTheDocument();
        expect(screen.getAllByAltText('weather icon')).toHaveLength(4);
    });

    it('refreshes when a new city comes in', () => {
        const { rerender } = render(<LowerWeatherCard name="Kolkata" arr={forecast()} />);
        expect(screen.getByText('Rain')).toBeInTheDocument();

        const lima = forecast().map((d, i) => (i === 0 ? d : { ...d, desc: 'Clear' }));
        rerender(<LowerWeatherCard name="Lima" arr={lima} />);

        expect(screen.queryByText('Rain')).not.toBeInTheDocument();
        expect(screen.getAllByText('Clear')).toHaveLength(4);
    });
});
