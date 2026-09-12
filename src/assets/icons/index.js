// Local animated weather icons. These replace the Firebase-hosted SVGs whose
// download links expired - CRA resolves each import to a bundled asset URL,
// so they still drop straight into <img src={...} />.
import day from './day.svg';
import night from './night.svg';
import cloudy from './cloudy.svg';
import cloudyDay from './cloudy-day.svg';
import cloudyNight from './cloudy-night.svg';
import rainy from './rainy.svg';
import thunder from './thunder.svg';
import snowy from './snowy.svg';
import location from './location.svg';

export const icons = {
    day,
    night,
    cloudy,
    cloudyDay,
    cloudyNight,
    rainy,
    thunder,
    snowy,
    location,
}

// Maps an OpenWeather "main" condition to an icon.
// isNight lets "Clear"/"Clouds" pick their after-dark variant.
export function iconFor(weather, isNight = false) {
    switch (weather) {
        case "Clear":
            return isNight ? icons.night : icons.day;
        case "Clouds":
            return isNight ? icons.cloudyNight : icons.cloudyDay;
        case "Haze":
        case "Mist":
        case "Fog":
        case "Smoke":
        case "Dust":
            return icons.cloudy;
        case "Rain":
        case "Drizzle":
            return icons.rainy;
        case "Thunder":
        case "Thunderstorm":
            return icons.thunder;
        case "Snow":
            return icons.snowy;
        default:
            return isNight ? icons.night : icons.day;
    }
}

export default icons;
