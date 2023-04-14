import { css } from '@emotion/css'
import { ReactNode } from 'react'

const classes = {
  list: css`
    font-size: 12px;
    line-height: 20px;
  `,
  label: css`
    font-weight: 600;
  `
}

export function SectionList(props: { list: { label: ReactNode; content: ReactNode }[] }) {
  const { list } = props
  return (
    <div className={classes.list}>
      {list.map(({ label, content }, i) => (
        <div key={i}>
          <span className={classes.label}>{label}: </span>
          {content}
        </div>
      ))}
    </div>
  )
}
