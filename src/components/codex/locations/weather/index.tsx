import { css } from '@emotion/css'
import { Box, Grid } from '@mui/material'
import {
  MoonFirstQuarter,
  MoonFull,
  MoonLastQuarter,
  MoonNew,
  MoonWaningCrescent,
  MoonWaningGibbous,
  MoonWaxingGibbous,
  WeatherCloudy,
  WeatherFog,
  WeatherLightning,
  WeatherNight,
  WeatherPouring,
  WeatherSnowy,
  WeatherSnowyHeavy,
  WeatherSnowyRainy,
  WeatherSunny,
  WeatherSunset,
  WeatherWindy
} from 'mdi-material-ui'

import { location__conditions } from '../../../../models/regions/locations/environment/conditions'
import { formatHours } from '../../../../models/utilities/math/time'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { freezingPoint } from '../../../../models/world/climate/weather'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'
import { ClimateView } from './Climate'

const weatherIconMap = {
  cloudy: WeatherCloudy,
  fog: WeatherFog,
  lightning: WeatherLightning,
  night: WeatherNight,
  pouring: WeatherPouring,
  'snowy-heavy': WeatherSnowyHeavy,
  'snowy-rainy': WeatherSnowyRainy,
  snowy: WeatherSnowy,
  sunny: WeatherSunny,
  sunset: WeatherSunset,
  windy: WeatherWindy
}

const moonIconMap = {
  new: MoonNew,
  'waxing-crescent': MoonWaningCrescent,
  'first-quarter': MoonFirstQuarter,
  'waxing-gibbous': MoonWaxingGibbous,
  full: MoonFull,
  'waning-gibbous': MoonWaningGibbous,
  'last-quarter': MoonLastQuarter,
  'waning-crescent': MoonWaningCrescent
}

const classes = {
  icon: css`
    color: ${cssColors.primary};
    font-size: 50px !important;
  `
}

export function WeatherView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const { conditions, visible, icon } = location__conditions(location)
  const { sun, moon, day, night, rainChance } = conditions
  const isDay = visible.sun
  const current = isDay ? day : night
  const { heat, wind } = current
  const sunrise = formatHours(sun.rise)
  const sunset = formatHours(sun.set)
  const moonrise = formatHours(moon.rise)
  const moonset = formatHours(moon.set)
  const precipitation = heat.degrees <= freezingPoint ? 'snow' : 'rain'
  const WeatherIcon = weatherIconMap[icon]
  const MoonIcon = moonIconMap[moon.icon]
  return (
    <Grid container alignContent='center' justifyContent='center'>
      <Grid item xs={2}>
        <WeatherIcon className={classes.icon} />
      </Grid>
      <Grid item xs={4}>
        <SectionList
          list={[
            {
              label: 'Conditions',
              content: (
                <StyledText
                  text={`${decorateText({
                    label: current.conditions,
                    tooltip: `${formatters.percent({
                      value: rainChance
                    })} chance of ${precipitation}`
                  })}`}
                ></StyledText>
              )
            },
            {
              label: 'Temperature',
              content: (
                <StyledText
                  text={decorateText({
                    label: heat.desc,
                    tooltip: `${heat.degrees.toFixed(0)}°F`
                  })}
                ></StyledText>
              )
            },
            {
              label: 'Wind Speed',
              content: (
                <StyledText
                  text={decorateText({
                    label: wind.desc,
                    tooltip: `${wind.speed.toFixed(0)} mph`
                  })}
                ></StyledText>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={4}>
        <SectionList
          list={[
            { label: 'Clouds', content: current.clouds },
            {
              label: 'Sunlight',
              content: (
                <Box
                  component='span'
                  sx={{ color: visible.sun ? cssColors.black : cssColors.subtitle }}
                >{`${sunrise} - ${sunset}`}</Box>
              )
            },
            {
              label: 'Moonlight',
              content: (
                <Box
                  component='span'
                  sx={{ color: visible.moon ? cssColors.black : cssColors.subtitle }}
                >{`${moonrise} - ${moonset}`}</Box>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={1}>
        <MoonIcon className={classes.icon} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <ClimateView></ClimateView>
      </Grid>
    </Grid>
  )
}
