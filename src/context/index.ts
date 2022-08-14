import { createContext, Dispatch, useContext } from 'react'

import { view__actions, view__state } from './state/types'

interface ContextProps {
  state: view__state
  dispatch: Dispatch<view__actions>
}

export const ViewContext = createContext({} as ContextProps)

export const view__context = () => {
  return useContext(ViewContext)
}
