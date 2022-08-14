import { climates } from '../types'

export type weather_conditions =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'rainy'
  | 'stormy'
  | 'overcast'
  | 'windy'

export type cloud_types =
  | 'clear skies'
  | 'haze'
  | 'cirrus clouds'
  | 'altostratus clouds'
  | 'stratus clouds'
  | 'altocumulus clouds'
  | 'cumulus clouds'
  | 'nimbus clouds'

export type weather_icons =
  | 'cloudy'
  | 'fog'
  | 'lightning'
  | 'night'
  | 'pouring'
  | 'snowy-heavy'
  | 'snowy-rainy'
  | 'snowy'
  | 'sunny'
  | 'sunset'
  | 'windy'

export interface WeatherParams {
  rain: number
  temp: number
  clouds: cloud_types
  climate: climates
}

export interface WeatherPhenomena {
  wind: number
  icon: weather_icons
  weather: string
}
