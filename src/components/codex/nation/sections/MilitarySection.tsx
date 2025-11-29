import { Box } from '@mui/material'
import { MILITARY } from '../../../../models/nations/military'
import { Province } from '../../../../models/provinces/types'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'
import { getMilitaryIcon } from '../icons'

interface MilitarySectionProps {
  nation: Province
}

export function MilitarySection({ nation }: MilitarySectionProps) {
  const military = MILITARY.get(nation)

  return (
    <span>
      {military
        .sort((a, b) => b[1] - a[1])
        .map(([key, value], idx) => (
          <Box
            key={key}
            sx={{
              display: 'inline-flex',
              gap: 0.25,
              paddingLeft: idx == 0 ? 0 : 0.25
            }}
          >
            <Box sx={{ transform: 'translateY(1.5px)' }}>{getMilitaryIcon(key)}</Box>
            <StyledText
              text={TEXT.decorate({
                label: `${TEXT.titleCase(key)}`,
                tooltip: MILITARY.tooltip[key].toLowerCase()
              })}
            />
            {`(${TEXT.formatters.compact(value)})`}{' '}
            {idx < military.length - 1 && <span style={{ opacity: 0.4 }}>,</span>}
          </Box>
        ))}
    </span>
  )
}
