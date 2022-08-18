import { css } from '@emotion/css'
import { Grid } from '@mui/material'

import { npc__describeAttributes } from '../../../../models/npcs/actors/stats/attributes'
import { Actor } from '../../../../models/npcs/actors/types'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

const border = '2px solid #9C2B1B'

const classes = {
  attribute: css`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: ${cssColors.primary};
    border-top: ${border};
    margin-top: 10px;
  `,
  value: css`
    font-size: 14px;
    text-align: center;
    color: ${cssColors.primary};
    border-bottom: ${border};
    margin-bottom: 10px;
    margin-top: 3px;
  `
}

export function AttributesView(props: { attributes: Actor['attributes'] }) {
  const { attributes } = props
  const described = npc__describeAttributes(attributes)
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.attribute}>
          {described.map(({ attribute }, i) => (
            <Grid item key={i} xs={2} mt={1}>
              {attribute}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.value}>
          {described.map(({ value, desc }, i) => {
            const negative = value - 10 < 0
            const round = negative ? Math.ceil : Math.floor
            return (
              <Grid item key={i} xs={2} mb={1}>
                <StyledText
                  text={`${decorateText({
                    label: value.toString(),
                    tooltip: desc,
                    color: cssColors.primary
                  })} (${negative ? '-' : '+'}${round(Math.abs(value - 10) / 2)})`}
                ></StyledText>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}
