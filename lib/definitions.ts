
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
        "rain"?: {
            "3h": 0.14
        },
        "timezone": number,
        "id": number,
        "name": string | JSX.Element,
        "cod": number
}

export type List = {
    "dt": number,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "sea_level": number,
        "grnd_level": number,
        "humidity": number,
        "temp_kf": number
    },
    "weather": [
    {
        "id": number,
        "main": string,
        "description": string,
        "icon": string
    }
    ],
        "clouds": {
        "all": number
    },
    "wind": {
        "speed": number,
        "deg": number,
        "gust": number
    },
    "visibility": number,
    "pop": number,
    "rain": {
        "3h": number
    },
    "sys": {
        "pod": string
    },
    "dt_txt": string
}

export type ForecastData = {
    "cod": string,
    "message": number,
    "cnt": number,
    "list": List[],
    "city": {
        "id": number,
        "name": string,
        "coord": {
            "lat": number,
            "lon": number
        },
        "country": string,
        "population": number,
        "timezone": number,
        "sunrise": number,
        "sunset": number
    }
}