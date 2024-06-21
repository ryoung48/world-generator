import { Divider, Grid } from '@mui/material'
import { ExclamationThick } from 'mdi-material-ui'
import { Fragment } from 'react'

import { ACTOR } from '../../../models/actors'
import { QUEST } from '../../../models/quests'
import { Hub } from '../../../models/regions/places/hub/types'
import { TEXT } from '../../../models/utilities/text'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { StyledText } from '../../common/text/styled'
import { cssColors } from '../../theme/colors'

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
                  subtitle={'hard'}
                ></DetailedTableRow>
              )
            },
            {
              text: 'Patron',
              value: quest => {
                const patron = window.world.actors[quest.patron]
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
                    subtitle={patron.profession.key}
                  ></DetailedTableRow>
                )
              }
            },
            {
              text: 'Elements',
              value: quest => (
                <DetailedTableRow
                  title={<StyledText text={quest.location}></StyledText>}
                  subtitle={quest.enemies.toLowerCase()}
                ></DetailedTableRow>
              )
            }
          ]}
          expand={{
            content: quest => (
              <Grid container>
                <Grid item xs={12}>
                  <b>Introduction: </b> {TEXT.capitalize(quest.introduction)}.
                </Grid>
                <Grid item xs={12}>
                  <b>Objective: </b> <i>{TEXT.capitalize(quest.type)}.</i>{' '}
                  {TEXT.capitalize(quest.complication)}.
                </Grid>
                <Grid item xs={12} my={1}>
                  <Divider></Divider>
                </Grid>
                {quest.challenges.map((step, i) => (
                  <Grid container item xs={12} key={i} my={0.5}>
                    <Grid item xs={12}>
                      <i>{TEXT.titleCase(step.type)}. </i>
                      <StyledText text={TEXT.capitalize(step.text)}></StyledText>.
                    </Grid>
                    <Grid item xs={12} style={{ color: cssColors.subtitle, fontSize: 10 }}>
                      <StyledText text={step.setting}></StyledText>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )
          }}
        ></DataTable>
      </Grid>
    </Fragment>
  )
}
