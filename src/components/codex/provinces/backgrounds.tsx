import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

import { Province } from '../../../models/regions/provinces/types'
import {
  location__threads,
  thread__abandoned,
  thread__complexity,
  thread__ongoing,
  thread__paused
} from '../../../models/threads'
import { difficulties } from '../../../models/threads/difficulty'
import { stage__current } from '../../../models/threads/stages'
import { Thread } from '../../../models/threads/types'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { view__context } from '../../context'
import { style__clickable } from '../../theme'
import { cssColors } from '../../theme/colors'
import { DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'
import { thread__icons } from './threads/styles'
import { ThreadView } from './threads/Thread'

const sortThreads = (params: { threads: Thread[]; location: Province }) => {
  const { threads, location } = params
  const active = threads.filter(thread => thread.location === location.idx)
  const distant = threads.filter(
    thread =>
      thread.location !== location.idx &&
      !thread.closed &&
      (stage__current(thread)?.transition?.src === location.idx || thread.origin === location.idx)
  )
  return [...active, ...distant]
}

export function ThreadList() {
  const { state, dispatch } = view__context()
  const { codex, journal } = state
  const [expanded, setExpanded] = useState(-1)
  const location = window.world.provinces[codex.province]
  const threads = sortThreads({
    threads: journal.map(j => window.world.threads[j]),
    location
  })
  useEffect(() => {
    const threads = location__threads(location)
    if (threads) dispatch({ type: 'refresh journal' })
  }, [location])
  const handleChange = (panel: number) => () => {
    if (panel === expanded) setExpanded(-1)
    else setExpanded(panel)
  }
  const goToThread = (thread: Thread) => {
    setExpanded(thread.idx)
  }
  return (
    <div>
      {threads.map((thread, i) => {
        const paused = thread__paused(thread)
        const progress = thread__ongoing(thread)
        const abandoned = thread__abandoned(thread)
        const { Icon, color } =
          thread__icons[
            abandoned ? 'abandoned' : paused ? 'paused' : progress ? 'in progress' : thread.status
          ]
        const open = i === expanded
        const parent = window.world.threads[thread.parent]
        return (
          <Accordion square expanded={open} onChange={handleChange(i)} key={i}>
            <AccordionSummary expandIcon={open ? <ChevronUp /> : <ChevronDown />}>
              <Grid container>
                <Grid item pr={2}>
                  <Icon style={{ color }}></Icon>
                </Grid>
                <Grid item>
                  <DetailedTableRow
                    title={
                      <span>
                        {titleCase(thread.background.tag)} (#{thread.idx})
                      </span>
                    }
                    subtitle={
                      <span>
                        <StyledText
                          color={cssColors.subtitle}
                          text={`${decorateText({
                            label: thread.difficulty,
                            color: difficulties[thread.difficulty].color,
                            bold: true
                          })}, ${thread__complexity(thread)} (${thread.complexity})`}
                        ></StyledText>
                        {parent ? (
                          <span>
                            ,{' '}
                            <span
                              className={style__clickable(cssColors.subtitle)}
                              onClick={() => goToThread(parent)}
                              onKeyPress={() => goToThread(parent)}
                              role='link'
                              tabIndex={0}
                            >
                              #{parent.idx}
                            </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    }
                  ></DetailedTableRow>
                </Grid>
                {/* <Grid item>
                  <DetailedTableRow
                    title={
                      <StyledText
                        text={decorateText({
                          link: loc
                        })}
                      ></StyledText>
                    }
                    subtitle={loc.type}
                    link
                  ></DetailedTableRow>
                </Grid>
                <Grid item>
                  <DetailedTableRow
                    title={
                      <StyledText
                        text={`${thread.progress}/${decorateText({
                          label: thread.failures.toString(),
                          color: cssColors.primary
                        })}`}
                      ></StyledText>
                    }
                    subtitle={<span>{abandoned ? 'abandoned' : thread.status}</span>}
                  ></DetailedTableRow>
                </Grid> */}
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ThreadView
                thread={thread}
                goToThread={goToThread}
                clearExpand={() => setExpanded(-1)}
              ></ThreadView>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
