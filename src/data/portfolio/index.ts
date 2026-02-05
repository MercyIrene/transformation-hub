export * from './applications';
export * from './projects';

export interface PortfolioMetrics {
  applications: {
    total: number;
    active: number;
    deprecated: number;
    planned: number;
    healthScore: number;
    complianceRate: number;
  };
  projects: {
    total: number;
    inProgress: number;
    completed: number;
    onHold: number;
    totalBudget: number;
    spentBudget: number;
    averageProgress: number;
  };
}

export const portfolioMetrics: PortfolioMetrics = {
  applications: {
    total: 6,
    active: 3,
    deprecated: 1,
    planned: 1,
    healthScore: 71,
    complianceRate: 83
  },
  projects: {
    total: 6,
    inProgress: 3,
    completed: 1,
    onHold: 1,
    totalBudget: 14800000,
    spentBudget: 6595000,
    averageProgress: 54
  }
};