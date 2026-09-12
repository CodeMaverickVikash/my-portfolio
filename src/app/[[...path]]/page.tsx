'use client'

import { useEffect, useState } from 'react'
import { PortfolioApp } from '@mypartner/my-portfolio'

const readPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

export default function PortfolioPage() {
  const [path, setPath] = useState('/')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPath(readPath())
    const handlePopState = () => setPath(readPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  if (!mounted) return null

  return <PortfolioApp path={path} basePath="" onNavigate={navigate} />
}
