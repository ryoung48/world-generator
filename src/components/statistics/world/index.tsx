import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import {
  AccountGroup,
  ChartLineVariant,
  DramaMasks,
  Earth,
  Forest,
  HomeGroup,
  MapMarker,
  Sword
} from 'mdi-material-ui'
import { FC, ReactNode } from 'react'

import { GEOGRAPHY } from '../../../models/cells/geography'
import { NATION } from '../../../models/nations'
import { MATH } from '../../../models/utilities/math'
import { TEXT } from '../../../models/utilities/text'
import { MAP_METRICS } from '../../world/shapes/metrics'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: ReactNode
  color?: string
}

const StatCard: FC<StatCardProps> = ({ title, value, description, icon, color = '#1976d2' }) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          left: 20,
          height: 56,
          width: 56,
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 2,
          color: 'white'
        }}
      >
        {icon}
      </Box>
      <CardContent sx={{ pt: 4, pb: 2, pl: 2, pr: 2 }}>
        <Box sx={{ ml: 7 }}>
          <Typography
            color='textSecondary'
            gutterBottom
            variant='subtitle2'
            sx={{ textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
          <Typography variant='h4' component='div' sx={{ mb: 1, fontWeight: 'bold' }}>
            {value}
          </Typography>
          {description && (
            <Typography
              variant='body2'
              color='textSecondary'
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                pt: 1,
                mt: 1
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

interface WorldStatisticsProps {
  totalNations?: number
  totalPopulation?: number
  totalProvinces?: number
  averageDevelopment?: number
}

const WorldStatistics: FC<WorldStatisticsProps> = () => {
  const nations = NATION.nations()
  const totalNations = nations.length
  const totalPopulation = window.world.provinces.reduce(
    (sum, province) => sum + province.population,
    0
  )
  const totalProvinces = window.world.provinces.length
  const averageDevelopment =
    window.world.provinces.reduce((sum, province) => sum + province.development, 0) /
    window.world.provinces.length

  // Find largest nation by province count
  const largestNation = nations.reduce(
    (max, nation) =>
      nation.subjects.length > max.count ? { nation, count: nation.subjects.length } : max,
    { nation: nations[0], count: 0 }
  )

  // Add new calculations for cultures and wars
  const uniqueCultures = window.world.cultures.length

  const nationsAtWar = nations.filter(nation =>
    NATION.provinces(nation).some(province => province.battleground)
  ).length

  // Add calculations for land and ocean area
  const units = MAP_METRICS.metric ? 'km²' : 'mi²'
  const land = GEOGRAPHY.land()
  const cellArea = window.world.cell.area
  let landArea = land.length * cellArea
  if (MAP_METRICS.metric) {
    landArea = MATH.conversion.area.mi.km(landArea)
  }
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4
          }}
        >
          World Statistics
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Provinces'
              value={totalProvinces}
              description='Total provinces in the world'
              icon={<HomeGroup sx={{ fontSize: 28 }} />}
              color='#ff9800'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Total Nations'
              value={totalNations}
              description='Number of civilizations'
              icon={<Earth sx={{ fontSize: 28 }} />}
              color='#2196f3'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Unique Cultures'
              value={uniqueCultures}
              description='Number of distinct cultures'
              icon={<DramaMasks sx={{ fontSize: 28 }} />}
              color='#673ab7'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Total Population'
              value={TEXT.formatters.compact(totalPopulation)}
              description='World population'
              icon={<AccountGroup sx={{ fontSize: 28 }} />}
              color='#4caf50'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Land Area'
              value={`${TEXT.formatters.compact(landArea)} ${units} (${TEXT.formatters.percent(
                land.length / window.world.cells.length
              )})`}
              description='Total land surface area'
              icon={<Forest sx={{ fontSize: 28 }} />}
              color='#33691e'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Average Development'
              value={averageDevelopment.toFixed(2)}
              description='Global development level'
              icon={<ChartLineVariant sx={{ fontSize: 28 }} />}
              color='#f44336'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Largest Nation'
              value={`${largestNation.nation.name} (${largestNation.count})`}
              description='Nation with most provinces'
              icon={<MapMarker sx={{ fontSize: 28 }} />}
              color='#795548'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title='Nations at War'
              value={nationsAtWar}
              description='Countries currently in conflict'
              icon={<Sword sx={{ fontSize: 28 }} />}
              color='#d32f2f'
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default WorldStatistics
