import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import { quest__advance, quest__details } from '../../../models/quests'
import { stage__current, stage__spawn, stage__weather } from '../../../models/quests/stages'
import { Province } from '../../../models/regions/provinces/types'
import { avatar__cr, difficulties, difficulty__odds } from '../../../models/utilities/difficulty'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'
import { quest__icons } from './quests/styles'

export function QuestGen(props: { province: Province }) {
  const { dispatch, state } = view__context()
  const [quest, setQuest] = useState<Province['quest']>(null)
  const [solution, setSolution] = useState('')
  const province = props.province
  const pc = avatar__cr(state.avatar)
  useEffect(() => {
    setQuest(null)
    dispatch({ type: 'select province', payload: { target: province } })
    const init = async () => {
      dispatch({ type: 'loading', payload: true })
      const plot = await quest__details({ province, pc })
      if (plot?.objectives) {
        setQuest(plot)
        await stage__spawn(plot)
        plot.started = true
        setQuest(plot)
        dispatch({ type: 'loading', payload: false })
      }
    }
    init()
  }, [province])
  if (!quest?.objectives) return <span>... </span>
  const objectives = quest.objectives.filter(objective => objective.status)
  const current = stage__current(quest)
  if (current) objectives.push(current)
  const ended = quest.status !== undefined
  const started = quest.started
  const { tier, odds } = difficulty__odds({ pc, ...quest.difficulty })
  const patron = window.world.npcs[quest.npcs.find(npc => npc.id === quest.questGiver)?.ref]
  return (
    <Grid container sx={{ fontSize: 12, lineHeight: 1.5 }}>
      <Grid item xs={12}>
        <StyledText
          text={decorateText({
            label: `(${formatters.percent(1 - odds)})`,
            color: difficulties[tier].color
          })}
        ></StyledText>{' '}
        <b>{quest.title}: </b>
        {quest.description}{' '}
        {patron && (
          <span>
            (<StyledText text={decorateText({ link: patron })}></StyledText>)
          </span>
        )}
      </Grid>
      {started && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 5, marginBottom: 10 }}>
              Stages ({objectives.length} / {quest.objectives.length})
            </Divider>
          </Grid>
          {objectives.map((stage, i) => {
            const status = stage.status ?? 'in progress'
            const { Icon, color } = quest__icons[status]
            const selected = stage.options?.find(option => option.selected)
            stage__weather({ stage, quest })
            const npcs = stage.npcs.filter(npc => quest.npcs.find(({ id }) => id === npc))
            let stageText = `${stage.text.replace(
              /(\.)*$/,
              npcs.length > 0
                ? ` (${stage.npcs
                    .map(npc => {
                      const match = quest.npcs.find(({ id }) => id === npc)
                      return decorateText({
                        link: window.world.npcs[match.ref]
                      })
                    })
                    .join(', ')}).`
                : '.'
            )}`
            if (selected) {
              const { tier, odds } = difficulty__odds({ pc, cr: selected.difficulty })
              stageText = `${decorateText({
                label: `(${formatters.percent(1 - odds)})`,
                color: difficulties[tier].color,
                italics: true
              })} ${stageText} ${stage.resolution}. ${decorateText({
                label:
                  stage.status === 'perfection' || stage.status === 'success'
                    ? stage.sideEffects.positive
                    : stage.sideEffects.negative,
                italics: true
              })}. ${decorateText({
                label: titleCase(selected.tag),
                italics: true,
                tooltip: selected.text
              })}.`
            }
            return (
              <Grid item xs={12} key={i} my={0.5}>
                <Grid container alignContent='top'>
                  <Grid item xs={1}>
                    <Icon style={{ color }}></Icon>
                  </Grid>
                  <Grid item xs={10}>
                    <DetailedTableRow
                      link
                      title={<StyledText text={stageText}></StyledText>}
                      subtitle={
                        <StyledText
                          text={`${stage.location.replace(/(\.)*$/, ',')} ${stage.setting.weather}${
                            stage.setting.duration
                          }`}
                          color={cssColors.subtitle}
                        ></StyledText>
                      }
                    ></DetailedTableRow>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Fragment>
      )}
      {current?.options && started && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}>Solutions</Divider>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                value={solution}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setSolution((event.target as HTMLInputElement).value)
                }}
              >
                {current.options.map(option => {
                  const { tier, odds } = difficulty__odds({ pc, cr: option.difficulty })
                  return (
                    <FormControlLabel
                      key={option.tag}
                      value={option.tag}
                      control={<Radio size='small' />}
                      label={
                        <span style={{ fontSize: 12, lineHeight: 1.5 }}>
                          <i>
                            <StyledText
                              text={decorateText({
                                label: `(${formatters.percent(1 - odds)}) `,
                                color: difficulties[tier].color,
                                italics: true
                              })}
                            ></StyledText>
                            {titleCase(option.tag)}.
                          </i>{' '}
                          {option.text}.
                        </span>
                      }
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Fragment>
      )}
      <Grid item xs={12}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
      </Grid>
      <Grid item container justifyContent='space-between' xs={12}>
        <Grid item>
          {ended ? (
            <Fragment>
              <Grid item xs={12}>
                <span>
                  <i>Quest {quest.status === 'failure' ? 'failed' : 'completed'}.</i>
                </span>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                style={{ marginRight: 10 }}
                disabled={started && !solution && current?.options !== undefined}
                onClick={async () => {
                  dispatch({ type: 'loading', payload: true })
                  if (!started || (current && !current.options)) {
                    await stage__spawn(quest)
                    quest.started = true
                  } else {
                    await quest__advance({ quest, tag: solution, pc })
                  }
                  setSolution('')
                  setQuest(quest)
                  dispatch({ type: 'loading', payload: false })
                }}
              >
                {ended ? 'Complete' : 'Continue'}
              </Button>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
