import { css } from '@emotion/css'
import { createTheme, Zoom } from '@mui/material'

import { css_colors } from './colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: css_colors.primary
    },
    secondary: {
      main: css_colors.secondary
    }
  },
  typography: {
    fontFamily: ['Josefin Sans'].join(',')
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
          fontSize: 14,
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
          backgroundColor: css_colors.background.cards,
          border: `thick double ${css_colors.primary}`,
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
    }
  }
})

export const style__subtitle = css`
  font-size: 12px;
  color: ${css_colors.subtitle};
`

export const style__clickable = (color?: string) => css`
  cursor: pointer;
  border-bottom: 1px dotted ${color ?? 'black'};
`
