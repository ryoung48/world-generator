import { css } from '@emotion/css'
import { createTheme, Zoom } from '@mui/material'

import { cssColors } from './colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: cssColors.primary
    },
    secondary: {
      main: cssColors.secondary
    }
  },
  typography: {
    fontFamily: ['Josefin Sans'].join(','),
    fontSize: 12
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small'
      },
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        TransitionComponent: Zoom
      },
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          padding: `5px 16px 5px 16px`,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          lineHeight: 1.5
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          letterSpacing: 1
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard'
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          letterSpacing: 1,
          lineHeight: 1,
          fontSize: 12,
          borderRadius: 0
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: cssColors.background.cards,
          border: `thick double ${cssColors.primary}`,
          borderRadius: 0,
          padding: 10
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          lineHeight: 1
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: '#f1e5d6',
          border: `1px solid ${theme.palette.divider}`,
          '&:not(:last-child)': {
            borderBottom: 0
          },
          '&:before': {
            display: 'none'
          }
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingTop: 0
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        rounded: {
          borderRadius: 0
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          fontSize: 12
        }
      }
    }
  }
})

export const style__subtitle = css`
  font-size: 10px;
  color: ${cssColors.subtitle};
`

export const style__clickable = (color?: string) => css`
  cursor: pointer;
  border-bottom: 1px dotted ${color ?? 'black'};
`
