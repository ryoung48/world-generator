export function ColoredBox(props: { color: string; border?: boolean }) {
  const { color, border = true } = props
  const size = border ? 3.5 : 5
  return (
    <span
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        border: border ? `1px solid #000000` : undefined,
        display: 'inline-block',
        verticalAlign: 'middle',
        transform: 'translateY(-1px)'
      }}
    />
  )
}
