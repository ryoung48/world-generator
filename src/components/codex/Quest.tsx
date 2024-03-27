import { Divider, Grid } from '@mui/material'
import { ExclamationThick } from 'mdi-material-ui'
import { Fragment } from 'react'

import { ACTOR } from '../../models/npcs'
import { QUEST } from '../../models/quests'
import { Hub } from '../../models/regions/places/hub/types'
import { TEXT } from '../../models/utilities/text'
import { cssColors } from '../theme/colors'
import { DataTable, DetailedTableRow } from './common/DataTable'
import { StyledText } from './common/text/styled'

export function QuestView(props: { hub: Hub }) {
  const quests = QUEST.spawn(props.hub)
  return (
    <Fragment>
      <Grid item xs={12} my={2}>
        <Divider style={{ fontSize: 10 }}></Divider>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          data={quests}
          headers={[
            {
              text: '',
              value: () => (
                <ExclamationThick style={{ color: cssColors.difficulty.medium }}></ExclamationThick>
              )
            },
            {
              text: 'Quest',
              value: quest => (
                <DetailedTableRow
                  title={TEXT.titleCase(quest.type)}
                  subtitle={quest.enemies.toLowerCase()}
                ></DetailedTableRow>
              )
            },
            {
              text: 'Patron',
              value: quest => {
                const patron = window.world.npcs[quest.patron]
                return (
                  <DetailedTableRow
                    title={
                      <StyledText
                        text={TEXT.decorate({
                          label: patron.name,
                          details: ACTOR.describe(patron)
                        })}
                      ></StyledText>
                    }
                    subtitle={patron.profession.title}
                  ></DetailedTableRow>
                )
              }
            },
            {
              text: 'Difficulty',
              value: () => (
                <DetailedTableRow title={'Hard'} subtitle={'intricate'}></DetailedTableRow>
              )
            }
          ]}
          expand={{
            content: () => <Grid container>nothing yet :)</Grid>
          }}
        ></DataTable>
      </Grid>
    </Fragment>
  )
}
