'use client'
import './globals.css'
import ThemeRegistry from './config/ThemeRegistry'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { getMembers } from './actions/member.action'

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // !! Mettre à false pour mise en production
})
store.dispatch(getMembers())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeRegistry>
            <Provider store={store}>{children}</Provider>
          </ThemeRegistry>
        </ErrorBoundary>
      </body>
    </html>
  )
}
