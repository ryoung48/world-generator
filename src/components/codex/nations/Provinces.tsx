import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

import { REGION } from '../../../models/regions'
import { hook__spawn } from '../../../models/regions/provinces/hooks'
import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { CLIMATE } from '../../../models/world/climate'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { DataTable, DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'
import { HooksView } from '../provinces/Hooks'
import { quest__icons } from '../provinces/quests/styles'

const itemsPerPage = 5

export function ProvincesTable() {
  const { state } = VIEW.context()
  const [expanded, setExpanded] = useState(-1)
  const [page, setPage] = useState(0)
  const nation = window.world.regions[state.region]
  const pc = DIFFICULTY.avatar.cr(state.avatar)
  useEffect(() => {
    const idx = nation.provinces.findIndex(idx => state.province === idx)
    if (idx === -1 || expanded < 0) {
      setPage(0)
      setExpanded(-1)
    } else {
      setPage(Math.floor(idx / itemsPerPage))
      setExpanded(idx)
    }
  }, [state.province])
  return (
    <DataTable
      data={REGION.provinces(nation).sort((a, b) => b.hub.population - a.hub.population)}
      headers={[
        {
          text: '',
          value: () => {
            const { Icon, color } = quest__icons['in progress']
            return (
              <IconButton>
                <Icon style={{ color }}></Icon>
              </IconButton>
            )
          }
        },
        {
          text: 'Quest',
          value: province => {
            const hooks = hook__spawn({ loc: province, pc })
            const { tier, odds } = DIFFICULTY.odds({ pc, ...hooks.difficulty })
            return (
              <DetailedTableRow
                title={titleCase(hooks.mission.tag)}
                subtitle={
                  <StyledText
                    text={decorateText({
                      label: `${tier} (${formatters.percent(1 - odds)})`,
                      color: DIFFICULTY.lookup[tier].color
                    })}
                  ></StyledText>
                }
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Province',
          value: ({ name, hub }) => (
            <DetailedTableRow title={name} subtitle={hub.type}></DetailedTableRow>
          )
        },
        {
          text: 'Terrain',
          value: ({ environment, region: ridx }) => {
            const region = window.world.regions[ridx]
            const climate = CLIMATE.lookup[region.climate]
            return (
              <DetailedTableRow
                title={titleCase(environment.terrain)}
                subtitle={
                  <StyledText
                    text={decorateText({
                      label: environment.climate,
                      color: cssColors.subtitle,
                      tooltip: `${titleCase(region.climate)} (${climate.code})`
                    })}
                  ></StyledText>
                }
              ></DetailedTableRow>
            )
          }
        }
      ]}
      paging={[page, setPage]}
      rowsPerPage={itemsPerPage}
      expand={{
        content: province => {
          return <HooksView province={province}></HooksView>
        },
        expanded: [expanded, setExpanded]
      }}
    ></DataTable>
  )
}
