import './index.css'

import { Chart, registerables } from 'chart.js'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app'
import { fonts } from './components/theme/fonts'

Chart.register(...registerables)
Chart.defaults.font.family = fonts.content

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
