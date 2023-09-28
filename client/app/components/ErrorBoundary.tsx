'use client'
import React, { Component, ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error: ', error, errorInfo)
    this.setState({ hasError: true })
  }

  render():
    | string
    | number
    | boolean
    | Iterable<React.ReactNode>
    | React.PromiseLikeOfReactNode
    | React.JSX.Element
    | null
    | undefined {
    if (this.state.hasError) {
      return <h1>Quelque chose s&#39;est mal passé.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
