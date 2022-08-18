import { Grid, IconButton } from '@mui/material'
import { Update } from 'mdi-material-ui'

import { actor__relation } from '../../../../models/npcs/actors'
import { location__travel } from '../../../../models/regions/locations'
import { location__templates } from '../../../../models/regions/locations/spawn/taxonomy'
import { province__neighborhood } from '../../../../models/regions/provinces'
import { deconstructHours, hourMS } from '../../../../models/utilities/math/time'
import { view__context } from '../../../context'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { ToggleButtons } from '../../common/navigation/ToggleButtons'
import { WaitView } from './Wait'

export function TravelView() {
  const { state, dispatch } = view__context()
  const src = window.world.locations[state.codex.location]
  const province = window.world.provinces[src.province]
  const avatar = window.world.actors[state.avatar]
  return (
    <Grid container>
      <Grid item xs={12}>
        <ToggleButtons
          selection={['settlement', 'wilderness']}
          content={selected => {
            const destinations = province__neighborhood(province)
              .filter(n => n !== src && location__templates[n.type].group === selected)
              .map(dst => {
                const { idx, name, type, subtype } = dst
                const { miles, hours } = location__travel({ src, dst })
                return {
                  idx,
                  name,
                  type: subtype ?? type,
                  time: deconstructHours(hours),
                  miles: `${miles.toFixed(1)} miles`,
                  hours,
                  travel: null
                }
              })
              .sort((a, b) => a.hours - b.hours)
            return (
              <DataTable
                data={destinations}
                headers={[
                  {
                    text: 'Location',
                    value: item => (
                      <DetailedTableRow title={item.name} subtitle={item.type}></DetailedTableRow>
                    )
                  },
                  {
                    text: 'Distance',
                    value: item => (
                      <DetailedTableRow
                        title={`${item.time.days.toFixed(0)} day(s), ${item.time.hours.toFixed(
                          0
                        )} hour(s), ${item.time.minutes.toFixed(0)} minute(s)`}
                        subtitle={item.miles}
                      ></DetailedTableRow>
                    )
                  },
                  {
                    text: 'Travel',
                    value: dest => (
                      <IconButton
                        color='primary'
                        size='small'
                        disabled={!avatar}
                        onClick={() => {
                          avatar.location.curr = dest.idx
                          actor__relation({ actor: avatar, type: 'party' }).forEach(actor => {
                            actor.location.curr = dest.idx
                          })
                          dispatch({ type: 'set avatar', payload: { avatar } })
                          dispatch({
                            type: 'update codex',
                            payload: { target: window.world.locations[dest.idx] }
                          })
                          dispatch({
                            type: 'tick',
                            payload: { duration: dest.hours * hourMS }
                          })
                        }}
                      >
                        <Update fontSize='small'></Update>
                      </IconButton>
                    )
                  }
                ]}
              ></DataTable>
            )
          }}
        ></ToggleButtons>
      </Grid>
      <Grid item xs={12}>
        <WaitView></WaitView>
      </Grid>
    </Grid>
  )
}
