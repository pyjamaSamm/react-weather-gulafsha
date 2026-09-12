import icons, { iconFor } from './index';

describe('iconFor', () => {
    it('picks the day/night variant for clear skies', () => {
        expect(iconFor('Clear', false)).toBe(icons.day);
        expect(iconFor('Clear', true)).toBe(icons.night);
    });

    it('picks the day/night variant for clouds', () => {
        expect(iconFor('Clouds', false)).toBe(icons.cloudyDay);
        expect(iconFor('Clouds', true)).toBe(icons.cloudyNight);
    });

    it('treats the low-visibility conditions as plain cloud, day or night', () => {
        for (const condition of ['Haze', 'Mist', 'Fog', 'Smoke', 'Dust']) {
            expect(iconFor(condition, false)).toBe(icons.cloudy);
            expect(iconFor(condition, true)).toBe(icons.cloudy);
        }
    });

    it('maps the wet and stormy conditions to their own icons', () => {
        expect(iconFor('Rain')).toBe(icons.rainy);
        expect(iconFor('Drizzle')).toBe(icons.rainy);
        expect(iconFor('Thunder')).toBe(icons.thunder);
        expect(iconFor('Thunderstorm')).toBe(icons.thunder);
        expect(iconFor('Snow')).toBe(icons.snowy);
    });

    it('falls back to the sun or moon for conditions it does not know', () => {
        expect(iconFor('Tornado', false)).toBe(icons.day);
        expect(iconFor('Tornado', true)).toBe(icons.night);
        expect(iconFor(undefined, false)).toBe(icons.day);
    });

    it('defaults to daytime when nothing is said about night', () => {
        expect(iconFor('Clear')).toBe(icons.day);
    });
});
