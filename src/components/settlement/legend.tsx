import { Box, Chip, Paper, styled, Typography, useTheme } from '@mui/material'
import { MapMarker, ScaleBalance, ViewDashboard } from 'mdi-material-ui'
import React from 'react'

import { cssColors } from '../theme/colors'
import { BLUEPRINT } from '../world/blueprints'
import { BUILDING } from '../world/blueprints/buildings'
import { DISTRICT } from '../world/blueprints/districts'
import { LegendProps } from './types'

const StyledList = styled('ol')(() => ({
  listStyleType: 'none',
  paddingLeft: 0,
  marginTop: 0,
  marginBottom: 0
}))

const LegendSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.75),
  padding: theme.spacing(0.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderLeft: `2px solid ${cssColors.secondary}`,
  '&:last-child': {
    marginBottom: 0
  }
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  paddingBottom: 2,
  fontSize: '0.8rem'
}))

const LegendContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: cssColors.background.legend,
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  maxHeight: '80vh',
  overflowY: 'auto',
  border: `1px solid ${cssColors.secondary}`
}))

const LegendHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  backgroundImage: 'linear-gradient(to right, #58180d, #7a2917)'
}))

const LegendContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1)
}))

const CircleChip = styled(Chip)({
  backgroundColor: 'black',
  color: 'white',
  fontWeight: 'bold',
  height: 20,
  width: 20,
  borderRadius: '50%',
  minWidth: 20,
  '& .MuiChip-label': {
    padding: 0,
    fontSize: '0.7rem'
  }
})

const InfoTypography = styled(Typography)({
  fontSize: '0.8rem',
  marginRight: '0.25rem'
})

const Legend: React.FC<LegendProps> = ({ x, y, city, transform }) => {
  const theme = useTheme()
  const { miles, blocks, diagram, districts: d } = BLUEPRINT.spawn()

  // Handle potential map boundary issues
  const i = diagram.delaunay.find(x, y)
  if (i === null || i === undefined || !blocks[i]) {
    return (
      <Box sx={{ m: 2 }}>
        <LegendContainer>
          <LegendHeader>
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <MapMarker sx={{ mr: 1 }} fontSize='small' />
              {city.name}
            </Typography>
            <Typography variant='caption'>{city.type}</Typography>
          </LegendHeader>
          <LegendContent>
            <Typography variant='body2' color='text.secondary' sx={{ fontStyle: 'italic' }}>
              Cursor outside map area
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant='caption' fontWeight='medium' color='text.secondary'>
                Position:
              </Typography>
              <Chip
                size='small'
                label={`${x.toFixed(0)}, ${y.toFixed(0)}`}
                sx={{ ml: 1, height: 20, background: 'rgba(0,0,0,0.05)' }}
              />
            </Box>
          </LegendContent>
        </LegendContainer>
      </Box>
    )
  }

  const block = blocks[i]
  const neighbors = block.n.map(n => blocks[n])
  const districts = [block, ...neighbors]
    .filter(n => n.district)
    .map(block => d[block.district.idx])
    .sort((a, b) => a.idx - b.idx)

  // Apply zoom transform to scale if available
  const k = transform?.k || 1
  const scaleText = `${(miles / k).toFixed(2)} mi`
  const showDistricts = DISTRICT.cutoff({ count: Object.values(d).length }) > k
  const selected = block?.district ? d[block.district.idx] : null
  const buildings = selected?.buildings ?? []
  const building = BUILDING.closest({
    buildings,
    point: { x, y }
  })

  return (
    <Box sx={{ m: 1.5 }}>
      <LegendContainer>
        <LegendHeader>
          <Typography
            variant='subtitle1'
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            <MapMarker sx={{ mr: 0.5, fontSize: '1rem' }} />
            {city.name}, {block.type}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='caption' sx={{ fontStyle: 'italic', fontSize: '0.75rem' }}>
              {city.type}
            </Typography>
            <Chip
              label={`${x.toFixed(0)}, ${y.toFixed(0)}`}
              size='small'
              sx={{
                height: 16,
                background: 'rgba(255,255,255,0.3)',
                color: 'white',
                fontWeight: 'medium',
                '& .MuiChip-label': {
                  px: 0.75,
                  fontSize: '0.7rem'
                }
              }}
            />
          </Box>
        </LegendHeader>

        <LegendContent>
          <LegendSection>
            <SectionTitle variant='subtitle2'>
              <ViewDashboard fontSize='small' sx={{ fontSize: '0.8rem' }} />
              Location
            </SectionTitle>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 0.25 }}>
              {selected ? (
                <>
                  <InfoTypography>District</InfoTypography>
                  <CircleChip label={selected.idx} size='small' sx={{ mr: 0.5 }} />
                  <InfoTypography sx={{ fontWeight: 'bold', mr: 0.25 }}>
                    {selected.name}
                  </InfoTypography>
                  <Typography
                    variant='body2'
                    component='span'
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      fontSize: '0.75rem'
                    }}
                  >
                    ({selected.type})
                  </Typography>
                </>
              ) : (
                <InfoTypography>{block.land ? 'Outskirts' : 'Ocean'}</InfoTypography>
              )}
            </Box>

            {building && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <InfoTypography>Building</InfoTypography>
                <CircleChip label={building.idx} size='small' sx={{ mr: 0.5 }} />
                <InfoTypography sx={{ fontWeight: 'bold', mr: 0.25 }}>
                  {building.type}
                </InfoTypography>
                <Typography
                  variant='body2'
                  component='span'
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    fontSize: '0.75rem'
                  }}
                >
                  {building.quality.desc}
                </Typography>
              </Box>
            )}
          </LegendSection>

          <LegendSection>
            <SectionTitle variant='subtitle2'>
              <ScaleBalance fontSize='small' sx={{ fontSize: '0.8rem' }} />
              Map Scale
            </SectionTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <InfoTypography>
                {scaleText} × {scaleText}
              </InfoTypography>
              <Chip
                label={`Zoom: ${k.toFixed(1)}×`}
                size='small'
                sx={{
                  backgroundColor: cssColors.secondary,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  height: 18,
                  '& .MuiChip-label': {
                    px: 0.75,
                    fontSize: '0.7rem'
                  }
                }}
              />
            </Box>
          </LegendSection>

          {(showDistricts ? districts.length > 0 : buildings.length > 0) && (
            <LegendSection>
              <SectionTitle variant='subtitle2'>
                {showDistricts ? 'Nearby Districts' : 'Buildings'}
              </SectionTitle>
              <StyledList>
                {showDistricts
                  ? districts.map(district => (
                      <Box
                        key={district.idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 0.25
                        }}
                      >
                        <CircleChip label={district.idx} size='small' sx={{ mr: 0.5 }} />
                        <InfoTypography
                          sx={{
                            fontWeight: district.idx === selected?.idx ? 'bold' : 'normal',
                            color:
                              district.idx === selected?.idx
                                ? theme.palette.primary.main
                                : 'inherit'
                          }}
                        >
                          {district.name}
                          <span
                            style={{
                              color: 'text.secondary',
                              fontStyle: 'italic',
                              fontSize: '0.75rem'
                            }}
                          >
                            {' '}
                            ({district.type})
                          </span>
                        </InfoTypography>
                      </Box>
                    ))
                  : buildings.map(building => (
                      <Box
                        key={building.idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 0.25
                        }}
                      >
                        <CircleChip label={building.idx} size='small' sx={{ mr: 0.5 }} />
                        <InfoTypography>
                          <strong>{building.type}</strong>
                          <span
                            style={{
                              color: 'text.secondary',
                              fontStyle: 'italic',
                              fontSize: '0.75rem'
                            }}
                          >
                            {', ' + building.quality.desc}
                          </span>
                        </InfoTypography>
                      </Box>
                    ))}
              </StyledList>
            </LegendSection>
          )}
        </LegendContent>
      </LegendContainer>
    </Box>
  )
}

export default Legend
