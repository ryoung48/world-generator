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

import { view__context } from '../../../../context'
import { location__conditions } from '../../../../models/regions/locations/environment/conditions'
import { format_hours } from '../../../../models/utilities/math/time'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { freezing_point } from '../../../../models/world/climate/weather'
import { css_colors } from '../../../theme/colors'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'
import { ClimateView } from './Climate'

const weather_icon_map = {
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

const moon_icon_map = {
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
    color: ${css_colors.primary};
    font-size: 50px !important;
  `
}

export function WeatherView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const { conditions, visible, icon } = location__conditions(location)
  const { sun, moon, day, night, rain_chance } = conditions
  const is_day = visible.sun
  const current = is_day ? day : night
  const { heat, wind } = current
  const sunrise = format_hours(sun.rise)
  const sunset = format_hours(sun.set)
  const moonrise = format_hours(moon.rise)
  const moonset = format_hours(moon.set)
  const precipitation = heat.degrees <= freezing_point ? 'snow' : 'rain'
  const WeatherIcon = weather_icon_map[icon]
  const MoonIcon = moon_icon_map[moon.icon]
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
                  text={`${decorate_text({
                    label: current.conditions,
                    tooltip: `${formatters.percent({
                      value: rain_chance
                    })} chance of ${precipitation}`
                  })}`}
                ></StyledText>
              )
            },
            {
              label: 'Temperature',
              content: (
                <StyledText
                  text={decorate_text({
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
                  text={decorate_text({
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
                  sx={{ color: visible.sun ? css_colors.black : css_colors.subtitle }}
                >{`${sunrise} - ${sunset}`}</Box>
              )
            },
            {
              label: 'Moonlight',
              content: (
                <Box
                  component='span'
                  sx={{ color: visible.moon ? css_colors.black : css_colors.subtitle }}
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
