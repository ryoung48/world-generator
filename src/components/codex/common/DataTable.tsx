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
import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react'

import { style__subtitle } from '../../theme'

type table_headers<T extends Object> = {
  text: string
  align?: TableCellProps['align']
  value: keyof T | ((_data: T) => ReactNode)
  hidden?: boolean
}[]

type table_row_expansion<T extends Object> = {
  align?: TableCellProps['align']
  content: (_data: T) => ReactNode
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
      background-color: #f7f2e1;
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
    background-color: #faf7ea !important;
    box-shadow: inset 0px 4px 8px -5px rgb(50 50 50 / 75%),
      inset 0px -4px 8px -5px rgb(50 50 50 / 75%);
  `
}

function ExpandableRow<T extends Object>(props: {
  row: T
  idx: number
  headers: table_headers<T>
  expand: table_row_expansion<T>
  rowStyles?: (_item: T) => string | undefined
}) {
  const { row, expand, headers, idx, rowStyles } = props
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
          <TableCell key='expand' align={expand.align}>
            <IconButton
              size='small'
              onClick={() => setExpanded(open ? -1 : idx)}
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
  headers: table_headers<T>
  data: T[]
  rowsPerPage?: number
  expand?: table_row_expansion<T>
  paging?: [number, Dispatch<SetStateAction<number>>]
  rowStyles?: (_item: T) => string | undefined
}) {
  const { data, rowsPerPage = 5, rowStyles } = props
  const headers = props.headers.filter(header => !header.hidden)
  const [page, setPage] = props.paging ?? useState(0)
  const rows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const expand = { expanded: useState(-1), ...props.expand }
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
              idx={i}
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
  const { title, subtitle } = props
  return (
    <Grid container m={0}>
      <Grid item xs={12}>
        {title}
      </Grid>
      <Grid item xs={12} className={style__subtitle} style={{ fontSize: 10 }}>
        {subtitle}
      </Grid>
    </Grid>
  )
}
