import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid } from '@mui/material'
import {
  CheckBold,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CloseCircle,
  CloseThick,
  ExclamationThick,
  PauseCircle,
  Skull
} from 'mdi-material-ui'
import { useEffect, useState } from 'react'

import { difficulties } from '../../../models/threads/difficulty'
import { Thread, ThreadActor } from '../../../models/threads/types'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { cssColors } from '../../theme/colors'
import { DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'

export const thread__icons = {
  perfection: { Icon: CheckCircle, color: cssColors.difficulty.easy },
  success: { Icon: CheckBold, color: cssColors.difficulty.easy },
  pyrrhic: { Icon: CloseThick, color: cssColors.difficulty.hard },
  failure: { Icon: CloseCircle, color: cssColors.difficulty.hard },
  abandoned: { Icon: CloseCircle, color: 'gray' },
  blocked: { Icon: Skull, color: 'gray' },
  'in progress': { Icon: ExclamationThick, color: cssColors.difficulty.medium },
  paused: { Icon: PauseCircle, color: 'gray' }
}

const describeActor = (actor: ThreadActor) => {
  const culture = window.world.cultures[actor.culture]
  return (
    <StyledText
      text={`(${
        actor.monstrous
          ? 'monstrous'
          : `${actor.age}, ${actor.gender} ${decorateText({
              label: culture.name.toLowerCase(),
              tooltip: culture.species,
              color: cssColors.subtitle
            })}`
      })`}
    ></StyledText>
  )
}

export function ThreadView(props: { threads: Thread[] }) {
  const { threads } = props
  const [expanded, setExpanded] = useState(0)
  const handleChange = (panel: number) => () => {
    if (panel === expanded) setExpanded(-1)
    else setExpanded(panel)
  }
  useEffect(() => {
    if (threads.length <= expanded) setExpanded(0)
  }, [threads])
  return (
    <div>
      {threads.map((thread, i) => {
        const {
          tag,
          category,
          text,
          complication,
          patron,
          antagonist,
          place,
          thing,
          weather,
          difficulty
        } = thread
        const { Icon, color } = thread__icons[difficulty === 'deadly' ? 'blocked' : 'in progress']
        const open = i === expanded
        return (
          <Accordion square expanded={open} onChange={handleChange(i)} key={i}>
            <AccordionSummary expandIcon={open ? <ChevronUp /> : <ChevronDown />}>
              <Grid container>
                <Grid item pr={2}>
                  <Icon style={{ color }}></Icon>
                </Grid>
                <Grid item>
                  <DetailedTableRow
                    title={<b>{titleCase(tag)}</b>}
                    subtitle={
                      <StyledText
                        color={cssColors.subtitle}
                        text={`${decorateText({
                          label: difficulty,
                          color: difficulties[difficulty].color,
                          bold: true
                        })}, ${category}, ${weather}`}
                      ></StyledText>
                    }
                  ></DetailedTableRow>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <span style={{ fontSize: 12 }}>
                    {text} <i>{complication}.</i>
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
                </Grid>
                <Grid item xs={4}>
                  <DetailedTableRow
                    title={patron.name}
                    subtitle={
                      <span>
                        <b>patron</b> {describeActor(patron)}, {patron.alias.toLowerCase()}, seeking{' '}
                        {thing.toLowerCase()}
                      </span>
                    }
                  ></DetailedTableRow>
                </Grid>
                <Grid item xs={2} mx={2}>
                  <Divider orientation='vertical'></Divider>
                </Grid>
                <Grid item xs={4}>
                  <DetailedTableRow
                    title={antagonist.name}
                    subtitle={
                      <span>
                        <b>rival</b> {describeActor(antagonist)}, {antagonist.alias.toLowerCase()},
                        can be found {place.toLowerCase()}
                      </span>
                    }
                  ></DetailedTableRow>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
