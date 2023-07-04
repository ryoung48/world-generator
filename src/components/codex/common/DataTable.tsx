import { css } from '@emotion/css'
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { style__subtitle } from '../../theme'
import { cssColors } from '../../theme/colors'

type TableHeaders<T extends Object> = {
  text: string
  align?: TableCellProps['align']
  value: keyof T | ((_data: T) => ReactNode)
  hidden?: boolean
}[]

type TableRowExpansion<T extends Object> = {
  align?: TableCellProps['align']
  content: (_data: T) => ReactNode
  onClick?: (_data: T) => void
  idx?: (_data: T) => number
  disabled?: (_data: T) => boolean
  expanded?: [number, (_item: number) => void]
}

const classes = {
  root: css`
    table tbody tr:nth-child(odd) {
      background-color: #e0e5c1;
    }
    tfoot,
    th,
    table tbody tr:nth-child(even) {
      background-color: ${cssColors.background.cards};
    }
  `,
  header: css`
    font-size: 12px !important;
    font-weight: 600 !important;
  `,
  cell: css`
    padding: 1px 16px 1px 16px !important;
  `,
  footer: css`
    border-color: transparent !important;
  `,
  expanded: css`
    padding: 15px;
    font-size: 0.88rem !important;
    background-color: ${cssColors.background.cards} !important;
    box-shadow: inset 0px 4px 8px -5px rgb(50 50 50 / 75%),
      inset 0px -4px 8px -5px rgb(50 50 50 / 75%);
  `
}

function ExpandableRow<T extends Object>(props: {
  row: T
  idx: number
  headers: TableHeaders<T>
  expand: TableRowExpansion<T>
  rowStyles?: (_item: T) => string | undefined
}) {
  const { row, expand, headers, rowStyles } = props
  const idx = expand?.idx?.(row) ?? props.idx
  const [expanded, setExpanded] = expand.expanded
  const open = expanded === idx
  return (
    <Fragment>
      <TableRow className={rowStyles?.(row)}>
        {headers.map(({ align, value }, j) => (
          <TableCell key={j} align={align} className={classes.cell}>
            {typeof value === 'function' ? value(row) : row[value].toString()}
          </TableCell>
        ))}
        {expand.content && (
          <TableCell key='expand' align={expand.align} className={classes.cell}>
            <IconButton
              size='small'
              onClick={() => {
                expand.onClick?.(row)
                setExpanded(open ? -1 : idx)
              }}
              disabled={expand.disabled?.(row)}
              color='primary'
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {open && (
        <TableRow className={classes.expanded}>
          <TableCell style={{ padding: 15 }} colSpan={headers.length + 1}>
            <Box>{expand.content(row)}</Box>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  )
}

export function DataTable<T extends Object>(props: {
  headers: TableHeaders<T>
  data: T[]
  rowsPerPage?: number
  expand?: TableRowExpansion<T>
  paging?: [number, Dispatch<SetStateAction<number>>]
  rowStyles?: (_item: T) => string | undefined
}) {
  const { data, rowsPerPage = 5, rowStyles } = props
  const headers = props.headers.filter(header => !header.hidden)
  const [page, setPage] = props.paging ?? useState(0)
  const rows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const expand = { expanded: useState(-1), ...props.expand }
  useEffect(() => {
    rows.length === 0 && setPage(0)
  }, [data])
  return (
    <TableContainer component='div' className={classes.root}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {headers.map(({ align, text }, i) => (
              <TableCell key={i} align={align} className={classes.header}>
                {text}
              </TableCell>
            ))}
            {expand.content && <TableCell key='expanded' className={classes.header}></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <ExpandableRow
              key={i}
              idx={page * rowsPerPage + i}
              row={row}
              headers={headers}
              expand={expand}
              rowStyles={rowStyles}
            ></ExpandableRow>
          ))}
        </TableBody>
        {data.length > rowsPerPage && (
          <TableFooter>
            <TableRow>
              <TablePagination
                className={classes.footer}
                rowsPerPageOptions={[]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  )
}

export function DetailedTableRow(props: { title: ReactNode; subtitle: ReactNode; link?: boolean }) {
  const { title, subtitle, link } = props
  return (
    <Grid container m={0} direction='column' style={{ lineHeight: link ? 1.3 : 1.2 }}>
      <Grid item>{title}</Grid>
      <Grid item className={style__subtitle} style={{ fontSize: 10 }}>
        {subtitle}
      </Grid>
    </Grid>
  )
}
