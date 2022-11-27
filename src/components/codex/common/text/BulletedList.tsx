import { ReactNode } from 'react'

export function BulletedList(props: { list: ReactNode[] }) {
  const { list } = props
  return (
    <ul style={{ lineHeight: 1.4, listStyleType: 'circle', paddingInlineStart: 20 }}>
      {list.map((content, i) => (
        <li key={i}>{content}</li>
      ))}
    </ul>
  )
}
