export const PORTFOLIO_BASE_PATH = '/portal/portfolio' as const

export const getPortfolioRoutes = (basePath: string = PORTFOLIO_BASE_PATH) => {
  const normalizedBasePath = basePath.replace(/\/+$/, '')

  return {
    HOME: normalizedBasePath || '/',
    PROFILE: `${normalizedBasePath}/profile`,
    TECH_STACK: `${normalizedBasePath}/tech-stack`,
  } as const
}

export type PortfolioRoute = string
