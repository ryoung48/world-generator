import { climates } from '../types'

export type WeatherConditions =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'rainy'
  | 'stormy'
  | 'overcast'
  | 'windy'

export type CloudTypes =
  | 'clear skies'
  | 'haze'
  | 'cirrus clouds'
  | 'altostratus clouds'
  | 'stratus clouds'
  | 'altocumulus clouds'
  | 'cumulus clouds'
  | 'nimbus clouds'

export type WeatherIcons =
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
  clouds: CloudTypes
  climate: climates
}

export interface WeatherPhenomena {
  wind: number
  icon: WeatherIcons
  weather: string
}
