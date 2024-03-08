
export type WeatherData = {
        "coord": {
            "lon": number,
            "lat": number
        },
        "weather": [
            {
                "id": number,
                "main": string | JSX.Element,
                "description": string | JSX.Element,
                "icon": string | JSX.Element
            }
        ],
        "base": string,
        "main": {
            "temp": number | JSX.Element,
            "feels_like": number,
            "temp_min": number | JSX.Element,
            "temp_max": number | JSX.Element,
            "pressure": number,
            "humidity": number | JSX.Element,
            "sea_level"?: number,
            "grnd_level"?: number
        },
        "visibility": number | JSX.Element,
        "wind": {
            "speed": number | JSX.Element,
            "deg": number,
            "gust"?: number
        },
        "clouds": {
            "all": number | string
        },
        "dt": number | JSX.Element,
        "sys": {
            "type"?: number,
            "id"?: number,
            "country": string | JSX.Element,
            "sunrise": number | JSX.Element,
            "sunset": number | JSX.Element
        },
        "timezone": number,
        "id": number,
        "name": string | JSX.Element,
        "cod": number
        }
