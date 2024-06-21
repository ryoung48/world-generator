import { Button, Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { DUNGEON } from '../../../models/quests/dungeons'
import { Hub } from '../../../models/regions/places/hub/types'
import { TEXT } from '../../../models/utilities/text'
import { DataTable } from '../../common/DataTable'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'

export function DungeonView(props: { hub: Hub }) {
  const dungeons = DUNGEON.spawn(props.hub)
  const { dispatch } = VIEW.context()
  return (
    <Fragment>
      <Grid item xs={12} my={2}>
        <Divider style={{ fontSize: 10 }}></Divider>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          data={dungeons}
          headers={[
            {
              text: 'Theme',
              value: 'theme'
            },
            {
              text: 'Hostiles',
              value: 'hostiles'
            }
          ]}
          expand={{
            content: dungeon => (
              <Grid container>
                <Grid item xs={12}>
                  <b>History: </b> {TEXT.capitalize(dungeon.history ?? '???')}
                </Grid>
                <Grid item xs={12} my={1}>
                  <Divider></Divider>
                </Grid>
                {dungeon.rooms?.map(room => (
                  <Grid container item xs={12} key={room.setting} my={0.5}>
                    {room['combat encounter'] && (
                      <Grid item xs={12}>
                        <i>Hostiles: </i>
                        {TEXT.capitalize(room['combat encounter'])}
                      </Grid>
                    )}
                    {room.hazards && (
                      <Grid item xs={12}>
                        <i>Hazards: </i>
                        {TEXT.capitalize(room.hazards)}
                      </Grid>
                    )}
                    {room.enigmas && (
                      <Grid item xs={12}>
                        <i>Enigmas: </i>
                        {TEXT.capitalize(room.enigmas)}
                      </Grid>
                    )}
                    {room['treasure locations'] && (
                      <Grid item xs={12}>
                        <i>Treasure: </i>
                        {TEXT.capitalize(room['treasure locations'])}
                      </Grid>
                    )}
                    <Grid item xs={12} style={{ color: cssColors.subtitle, fontSize: 10 }}>
                      {room.setting}
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} my={1}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} my={1}>
                  <Button
                    onClick={() => {
                      VIEW.loading({
                        action: () => DUNGEON.details(dungeon),
                        dispatch
                      })
                    }}
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
            )
          }}
        ></DataTable>
      </Grid>
    </Fragment>
  )
}
