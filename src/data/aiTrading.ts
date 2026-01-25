// AI Trading Module Data

export type TradingCategory = 'stocks' | 'commodities';

export type AgentStrategy = 
  | 'technical'
  | 'fundamental'
  | 'news_sentiment'
  | 'hybrid'
  | 'arbitrage'
  | 'market_making';

export type AssetClass = 
  | 'equities'
  | 'etf'
  | 'options'
  | 'futures'
  | 'forex'
  | 'crypto'
  | 'precious_metals'
  | 'energy'
  | 'agriculture';

export type GPUStatus = 'available' | 'in_use' | 'maintenance' | 'reserved';

export interface TradingAgent {
  id: string;
  name: string;
  strategy: AgentStrategy;
  description: string;
  model: string;
  framework: string;
  assetClasses: AssetClass[];
  capabilities: string[];
  
  // Performance metrics
  sharpeRatio: number;
  winRate: number; // percentage
  avgReturn: number; // percentage (monthly)
  maxDrawdown: number; // percentage
  tradesPerDay: number;
  avgHoldingPeriod: string;
  
  // Resource usage
  gpuRequired: boolean;
  latencyMs: number;
  
  status: 'active' | 'backtesting' | 'paper_trading' | 'inactive';
}

export interface GPUCluster {
  id: string;
  name: string;
  location: string;
  provider: string;
  gpuType: 'H100' | 'A100' | 'L40S' | 'RTX4090';
  totalGPUs: number;
  availableGPUs: number;
  allocatedGPUs: number;
  maintenanceGPUs: number;
  vramPerGPU: number; // GB
  tflopsFP16: number;
  status: GPUStatus;
  utilizationPercent: number;
  costPerHour: number; // CAD
  latencyToExchange: string;
}

export interface MarketData {
  timestamp: string;
  price: number;
  volume: number;
  prediction?: number;
  signal?: 'buy' | 'sell' | 'hold';
}

export interface TradingPosition {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  category: TradingCategory;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  agentId: string;
  openDate: string;
}

export interface TradingFirm {
  id: string;
  name: string;
  type: 'hedge_fund' | 'prop_trading' | 'asset_manager' | 'bank' | 'fintech';
  headquarters: string;
  aum: number; // millions CAD
  description: string;
  tradingCategories: TradingCategory[];
  
  agents: TradingAgent[];
  gpuClusters: GPUCluster[];
  
  // Aggregate metrics
  totalDailyVolume: number; // millions CAD
  avgDailyTrades: number;
  ytdReturn: number; // percentage
  totalGPUs: number;
  aiAllocation: number; // percentage of trades using AI
}

// Sample price history for charts
export const generatePriceHistory = (basePrice: number, days: number, volatility: number): MarketData[] => {
  const data: MarketData[] = [];
  let price = basePrice;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.5) * volatility * price;
    price = Math.max(price + change, basePrice * 0.5);
    
    const volume = Math.floor(Math.random() * 10000000 + 1000000);
    const prediction = price * (1 + (Math.random() - 0.5) * 0.02);
    const rand = Math.random();
    const signal: 'buy' | 'sell' | 'hold' = rand > 0.6 ? 'buy' : rand < 0.4 ? 'sell' : 'hold';
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume,
      prediction: Math.round(prediction * 100) / 100,
      signal,
    });
  }
  return data;
};

// Market assets
export const marketAssets: { symbol: string; name: string; category: TradingCategory; assetClass: AssetClass; price: number; change: number; volume: number }[] = [
  // Stocks
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', category: 'stocks', assetClass: 'equities', price: 142.35, change: 1.25, volume: 8500000 },
  { symbol: 'TD.TO', name: 'Toronto-Dominion Bank', category: 'stocks', assetClass: 'equities', price: 83.20, change: -0.45, volume: 7200000 },
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', category: 'stocks', assetClass: 'equities', price: 98.75, change: 3.82, volume: 12500000 },
  { symbol: 'ENB.TO', name: 'Enbridge Inc.', category: 'stocks', assetClass: 'equities', price: 52.40, change: 0.15, volume: 5800000 },
  { symbol: 'CNR.TO', name: 'Canadian National Railway', category: 'stocks', assetClass: 'equities', price: 168.90, change: -1.20, volume: 3200000 },
  { symbol: 'BCE.TO', name: 'BCE Inc.', category: 'stocks', assetClass: 'equities', price: 45.60, change: -0.85, volume: 4100000 },
  { symbol: 'BAM.TO', name: 'Brookfield Asset Management', category: 'stocks', assetClass: 'equities', price: 62.15, change: 1.92, volume: 6700000 },
  { symbol: 'XIU.TO', name: 'iShares S&P/TSX 60 ETF', category: 'stocks', assetClass: 'etf', price: 32.45, change: 0.28, volume: 15000000 },
  { symbol: 'XQQ.TO', name: 'iShares NASDAQ 100 ETF', category: 'stocks', assetClass: 'etf', price: 45.80, change: 1.15, volume: 8900000 },
  
  // Commodities
  { symbol: 'GC=F', name: 'Gold Futures', category: 'commodities', assetClass: 'precious_metals', price: 2035.50, change: 12.30, volume: 250000 },
  { symbol: 'SI=F', name: 'Silver Futures', category: 'commodities', assetClass: 'precious_metals', price: 24.85, change: 0.45, volume: 180000 },
  { symbol: 'CL=F', name: 'Crude Oil WTI', category: 'commodities', assetClass: 'energy', price: 78.45, change: -1.25, volume: 520000 },
  { symbol: 'NG=F', name: 'Natural Gas', category: 'commodities', assetClass: 'energy', price: 2.85, change: 0.08, volume: 380000 },
  { symbol: 'HG=F', name: 'Copper Futures', category: 'commodities', assetClass: 'precious_metals', price: 4.25, change: 0.12, volume: 95000 },
  { symbol: 'ZC=F', name: 'Corn Futures', category: 'commodities', assetClass: 'agriculture', price: 485.25, change: -3.50, volume: 150000 },
  { symbol: 'ZW=F', name: 'Wheat Futures', category: 'commodities', assetClass: 'agriculture', price: 612.75, change: 5.25, volume: 120000 },
  { symbol: 'ZS=F', name: 'Soybean Futures', category: 'commodities', assetClass: 'agriculture', price: 1245.50, change: 8.75, volume: 85000 },
  { symbol: 'BTC-CAD', name: 'Bitcoin CAD', category: 'commodities', assetClass: 'crypto', price: 58450.00, change: 1250.00, volume: 2500000000 },
  { symbol: 'ETH-CAD', name: 'Ethereum CAD', category: 'commodities', assetClass: 'crypto', price: 3245.00, change: 85.50, volume: 1200000000 },
];

// Trading firms with full data
export const tradingFirms: TradingFirm[] = [
  {
    id: 'firm-001',
    name: 'QuantumTrade Capital',
    type: 'hedge_fund',
    headquarters: 'Toronto, ON',
    aum: 8500,
    description: 'Leading Canadian quantitative hedge fund specializing in AI-driven systematic trading strategies across multiple asset classes.',
    tradingCategories: ['stocks', 'commodities'],
    agents: [
      {
        id: 'agent-qt-001',
        name: 'AlphaSeeker',
        strategy: 'technical',
        description: 'High-frequency technical analysis agent using deep learning for pattern recognition and momentum signals.',
        model: 'Transformer-XL-Trading',
        framework: 'PyTorch',
        assetClasses: ['equities', 'etf', 'futures'],
        capabilities: ['Pattern recognition', 'Momentum detection', 'Volume analysis', 'Price action', 'Multi-timeframe analysis'],
        sharpeRatio: 2.45,
        winRate: 58.2,
        avgReturn: 4.8,
        maxDrawdown: 8.5,
        tradesPerDay: 450,
        avgHoldingPeriod: '2.5 hours',
        gpuRequired: true,
        latencyMs: 0.8,
        status: 'active',
      },
      {
        id: 'agent-qt-002',
        name: 'FundaMetrics',
        strategy: 'fundamental',
        description: 'Analyzes earnings, financial statements, and macroeconomic indicators for value-based positioning.',
        model: 'FinBERT-Large',
        framework: 'Hugging Face',
        assetClasses: ['equities', 'etf'],
        capabilities: ['Earnings analysis', 'Balance sheet scoring', 'Valuation metrics', 'Sector rotation', 'Macro correlation'],
        sharpeRatio: 1.85,
        winRate: 62.5,
        avgReturn: 2.8,
        maxDrawdown: 12.2,
        tradesPerDay: 15,
        avgHoldingPeriod: '18 days',
        gpuRequired: true,
        latencyMs: 250,
        status: 'active',
      },
      {
        id: 'agent-qt-003',
        name: 'NewsPulse',
        strategy: 'news_sentiment',
        description: 'Real-time news and social media sentiment analysis for event-driven trading opportunities.',
        model: 'SentimentGPT-7B',
        framework: 'LangChain',
        assetClasses: ['equities', 'futures', 'crypto'],
        capabilities: ['News parsing', 'Sentiment scoring', 'Event detection', 'Social media analysis', 'Earnings call transcripts'],
        sharpeRatio: 2.12,
        winRate: 55.8,
        avgReturn: 3.5,
        maxDrawdown: 15.3,
        tradesPerDay: 85,
        avgHoldingPeriod: '6 hours',
        gpuRequired: true,
        latencyMs: 45,
        status: 'active',
      },
      {
        id: 'agent-qt-004',
        name: 'OmniTrader',
        strategy: 'hybrid',
        description: 'Multi-strategy ensemble combining technical, fundamental, and sentiment signals with dynamic weighting.',
        model: 'Ensemble-Trading-70B',
        framework: 'Custom',
        assetClasses: ['equities', 'etf', 'futures', 'options'],
        capabilities: ['Multi-signal fusion', 'Dynamic allocation', 'Risk parity', 'Regime detection', 'Cross-asset correlation'],
        sharpeRatio: 2.78,
        winRate: 61.2,
        avgReturn: 5.2,
        maxDrawdown: 9.8,
        tradesPerDay: 220,
        avgHoldingPeriod: '4 hours',
        gpuRequired: true,
        latencyMs: 5,
        status: 'active',
      },
    ],
    gpuClusters: [
      {
        id: 'gpu-qt-001',
        name: 'Toronto Primary',
        location: 'Toronto, ON',
        provider: 'On-premise',
        gpuType: 'H100',
        totalGPUs: 64,
        availableGPUs: 8,
        allocatedGPUs: 52,
        maintenanceGPUs: 4,
        vramPerGPU: 80,
        tflopsFP16: 1979,
        status: 'in_use',
        utilizationPercent: 81,
        costPerHour: 0,
        latencyToExchange: '0.2ms',
      },
      {
        id: 'gpu-qt-002',
        name: 'Montreal Backup',
        location: 'Montreal, QC',
        provider: 'AWS',
        gpuType: 'A100',
        totalGPUs: 32,
        availableGPUs: 12,
        allocatedGPUs: 18,
        maintenanceGPUs: 2,
        vramPerGPU: 80,
        tflopsFP16: 312,
        status: 'available',
        utilizationPercent: 56,
        costPerHour: 45,
        latencyToExchange: '1.5ms',
      },
    ],
    totalDailyVolume: 850,
    avgDailyTrades: 12500,
    ytdReturn: 28.5,
    totalGPUs: 96,
    aiAllocation: 92,
  },
  {
    id: 'firm-002',
    name: 'Maple Commodities Partners',
    type: 'prop_trading',
    headquarters: 'Calgary, AB',
    aum: 2200,
    description: 'Specialized commodity trading firm leveraging AI for energy and agricultural markets.',
    tradingCategories: ['commodities'],
    agents: [
      {
        id: 'agent-mc-001',
        name: 'EnergyOracle',
        strategy: 'hybrid',
        description: 'Specialized in crude oil and natural gas trading using weather, inventory, and geopolitical analysis.',
        model: 'CommodityBERT-13B',
        framework: 'PyTorch',
        assetClasses: ['energy', 'futures'],
        capabilities: ['Weather modeling', 'Inventory analysis', 'Supply chain tracking', 'Geopolitical risk scoring', 'Seasonal patterns'],
        sharpeRatio: 2.15,
        winRate: 57.8,
        avgReturn: 4.2,
        maxDrawdown: 14.5,
        tradesPerDay: 180,
        avgHoldingPeriod: '8 hours',
        gpuRequired: true,
        latencyMs: 12,
        status: 'active',
      },
      {
        id: 'agent-mc-002',
        name: 'AgriPredict',
        strategy: 'fundamental',
        description: 'Agricultural commodity trading using satellite imagery, weather forecasts, and crop reports.',
        model: 'AgriVision-7B',
        framework: 'TensorFlow',
        assetClasses: ['agriculture', 'futures'],
        capabilities: ['Satellite analysis', 'Crop yield prediction', 'Weather integration', 'USDA report parsing', 'Supply/demand modeling'],
        sharpeRatio: 1.92,
        winRate: 59.5,
        avgReturn: 3.2,
        maxDrawdown: 11.8,
        tradesPerDay: 45,
        avgHoldingPeriod: '3 days',
        gpuRequired: true,
        latencyMs: 85,
        status: 'active',
      },
      {
        id: 'agent-mc-003',
        name: 'MetalMind',
        strategy: 'technical',
        description: 'Precious and industrial metals trading using technical indicators and macro correlations.',
        model: 'MetalTrader-XL',
        framework: 'PyTorch',
        assetClasses: ['precious_metals', 'futures'],
        capabilities: ['Gold/Silver correlation', 'USD hedging', 'Inflation tracking', 'Central bank monitoring', 'ETF flow analysis'],
        sharpeRatio: 1.78,
        winRate: 54.2,
        avgReturn: 2.8,
        maxDrawdown: 13.2,
        tradesPerDay: 95,
        avgHoldingPeriod: '12 hours',
        gpuRequired: true,
        latencyMs: 8,
        status: 'active',
      },
    ],
    gpuClusters: [
      {
        id: 'gpu-mc-001',
        name: 'Calgary HPC',
        location: 'Calgary, AB',
        provider: 'On-premise',
        gpuType: 'A100',
        totalGPUs: 48,
        availableGPUs: 6,
        allocatedGPUs: 40,
        maintenanceGPUs: 2,
        vramPerGPU: 80,
        tflopsFP16: 312,
        status: 'in_use',
        utilizationPercent: 83,
        costPerHour: 0,
        latencyToExchange: '0.5ms',
      },
    ],
    totalDailyVolume: 320,
    avgDailyTrades: 4800,
    ytdReturn: 22.8,
    totalGPUs: 48,
    aiAllocation: 88,
  },
  {
    id: 'firm-003',
    name: 'NorthStar Asset Management',
    type: 'asset_manager',
    headquarters: 'Vancouver, BC',
    aum: 15000,
    description: 'Institutional asset manager using AI to enhance portfolio construction and risk management.',
    tradingCategories: ['stocks', 'commodities'],
    agents: [
      {
        id: 'agent-ns-001',
        name: 'PortfolioAI',
        strategy: 'hybrid',
        description: 'Portfolio optimization and rebalancing using modern portfolio theory enhanced with ML.',
        model: 'PortOpt-Transformer',
        framework: 'PyTorch',
        assetClasses: ['equities', 'etf', 'futures'],
        capabilities: ['Mean-variance optimization', 'Factor analysis', 'Risk decomposition', 'Tax-loss harvesting', 'ESG integration'],
        sharpeRatio: 1.65,
        winRate: 64.5,
        avgReturn: 1.8,
        maxDrawdown: 8.2,
        tradesPerDay: 25,
        avgHoldingPeriod: '45 days',
        gpuRequired: true,
        latencyMs: 500,
        status: 'active',
      },
      {
        id: 'agent-ns-002',
        name: 'RiskGuardian',
        strategy: 'fundamental',
        description: 'Real-time risk monitoring and hedging recommendations across the portfolio.',
        model: 'RiskNet-13B',
        framework: 'TensorFlow',
        assetClasses: ['equities', 'etf', 'options', 'futures'],
        capabilities: ['VaR calculation', 'Stress testing', 'Correlation monitoring', 'Tail risk hedging', 'Liquidity scoring'],
        sharpeRatio: 1.42,
        winRate: 68.2,
        avgReturn: 0.8,
        maxDrawdown: 5.5,
        tradesPerDay: 10,
        avgHoldingPeriod: '30 days',
        gpuRequired: true,
        latencyMs: 150,
        status: 'active',
      },
      {
        id: 'agent-ns-003',
        name: 'AlphaScout',
        strategy: 'news_sentiment',
        description: 'Identifies alpha opportunities from alternative data and market sentiment.',
        model: 'AltData-GPT',
        framework: 'LangChain',
        assetClasses: ['equities', 'crypto'],
        capabilities: ['Alternative data analysis', 'Sentiment aggregation', 'Insider activity', 'Options flow', 'Short interest'],
        sharpeRatio: 1.95,
        winRate: 56.8,
        avgReturn: 3.2,
        maxDrawdown: 16.5,
        tradesPerDay: 35,
        avgHoldingPeriod: '5 days',
        gpuRequired: true,
        latencyMs: 65,
        status: 'active',
      },
    ],
    gpuClusters: [
      {
        id: 'gpu-ns-001',
        name: 'Vancouver Primary',
        location: 'Vancouver, BC',
        provider: 'Google Cloud',
        gpuType: 'A100',
        totalGPUs: 24,
        availableGPUs: 4,
        allocatedGPUs: 18,
        maintenanceGPUs: 2,
        vramPerGPU: 80,
        tflopsFP16: 312,
        status: 'in_use',
        utilizationPercent: 75,
        costPerHour: 38,
        latencyToExchange: '2.1ms',
      },
      {
        id: 'gpu-ns-002',
        name: 'Toronto Edge',
        location: 'Toronto, ON',
        provider: 'Azure',
        gpuType: 'H100',
        totalGPUs: 16,
        availableGPUs: 6,
        allocatedGPUs: 10,
        maintenanceGPUs: 0,
        vramPerGPU: 80,
        tflopsFP16: 1979,
        status: 'available',
        utilizationPercent: 62,
        costPerHour: 52,
        latencyToExchange: '0.3ms',
      },
    ],
    totalDailyVolume: 420,
    avgDailyTrades: 2100,
    ytdReturn: 15.2,
    totalGPUs: 40,
    aiAllocation: 65,
  },
  {
    id: 'firm-004',
    name: 'CryptoVault Trading',
    type: 'fintech',
    headquarters: 'Montreal, QC',
    aum: 850,
    description: 'Digital asset trading firm specializing in cryptocurrency and tokenized commodities.',
    tradingCategories: ['commodities'],
    agents: [
      {
        id: 'agent-cv-001',
        name: 'CryptoSentinel',
        strategy: 'hybrid',
        description: 'Multi-strategy crypto trading combining on-chain analytics, sentiment, and technical analysis.',
        model: 'CryptoGPT-13B',
        framework: 'Custom',
        assetClasses: ['crypto'],
        capabilities: ['On-chain analysis', 'Whale tracking', 'DEX monitoring', 'Social sentiment', 'Funding rates'],
        sharpeRatio: 2.85,
        winRate: 52.5,
        avgReturn: 8.5,
        maxDrawdown: 25.2,
        tradesPerDay: 380,
        avgHoldingPeriod: '45 minutes',
        gpuRequired: true,
        latencyMs: 2,
        status: 'active',
      },
      {
        id: 'agent-cv-002',
        name: 'ArbBot',
        strategy: 'arbitrage',
        description: 'Cross-exchange arbitrage and market making for major cryptocurrency pairs.',
        model: 'ArbNet-Fast',
        framework: 'C++/CUDA',
        assetClasses: ['crypto'],
        capabilities: ['Exchange arbitrage', 'Triangular arbitrage', 'Market making', 'Latency optimization', 'Order book analysis'],
        sharpeRatio: 3.45,
        winRate: 72.5,
        avgReturn: 2.2,
        maxDrawdown: 3.8,
        tradesPerDay: 2500,
        avgHoldingPeriod: '12 seconds',
        gpuRequired: true,
        latencyMs: 0.3,
        status: 'active',
      },
    ],
    gpuClusters: [
      {
        id: 'gpu-cv-001',
        name: 'Montreal Ultra-Low Latency',
        location: 'Montreal, QC',
        provider: 'On-premise',
        gpuType: 'RTX4090',
        totalGPUs: 32,
        availableGPUs: 4,
        allocatedGPUs: 28,
        maintenanceGPUs: 0,
        vramPerGPU: 24,
        tflopsFP16: 330,
        status: 'in_use',
        utilizationPercent: 88,
        costPerHour: 0,
        latencyToExchange: '0.1ms',
      },
    ],
    totalDailyVolume: 180,
    avgDailyTrades: 45000,
    ytdReturn: 42.5,
    totalGPUs: 32,
    aiAllocation: 98,
  },
];

// Strategy colors and labels
export const strategyConfig: Record<AgentStrategy, { label: string; color: string; icon: string }> = {
  technical: { label: 'Technical Analysis', color: '#3498DB', icon: 'LineChart' },
  fundamental: { label: 'Fundamental Analysis', color: '#2ECC71', icon: 'BarChart3' },
  news_sentiment: { label: 'News & Sentiment', color: '#9B59B6', icon: 'Newspaper' },
  hybrid: { label: 'Hybrid Strategy', color: '#E67E22', icon: 'Layers' },
  arbitrage: { label: 'Arbitrage', color: '#1ABC9C', icon: 'ArrowLeftRight' },
  market_making: { label: 'Market Making', color: '#E74C3C', icon: 'Activity' },
};

export const assetClassConfig: Record<AssetClass, { label: string; color: string }> = {
  equities: { label: 'Equities', color: '#3498DB' },
  etf: { label: 'ETFs', color: '#2ECC71' },
  options: { label: 'Options', color: '#9B59B6' },
  futures: { label: 'Futures', color: '#E67E22' },
  forex: { label: 'Forex', color: '#1ABC9C' },
  crypto: { label: 'Crypto', color: '#F1C40F' },
  precious_metals: { label: 'Precious Metals', color: '#BDC3C7' },
  energy: { label: 'Energy', color: '#E74C3C' },
  agriculture: { label: 'Agriculture', color: '#27AE60' },
};

// Performance data for charts
export const performanceData = [
  { month: 'Jan', return: 2.8, benchmark: 1.2, trades: 8500 },
  { month: 'Feb', return: 4.2, benchmark: 2.1, trades: 9200 },
  { month: 'Mar', return: -1.5, benchmark: -2.8, trades: 7800 },
  { month: 'Apr', return: 3.8, benchmark: 1.5, trades: 10200 },
  { month: 'May', return: 5.2, benchmark: 2.4, trades: 11500 },
  { month: 'Jun', return: 2.1, benchmark: 0.8, trades: 9800 },
  { month: 'Jul', return: 4.5, benchmark: 3.2, trades: 10800 },
  { month: 'Aug', return: -0.8, benchmark: -1.5, trades: 8200 },
  { month: 'Sep', return: 3.2, benchmark: 1.8, trades: 9500 },
  { month: 'Oct', return: 5.8, benchmark: 2.9, trades: 12200 },
  { month: 'Nov', return: 2.4, benchmark: 1.1, trades: 10100 },
  { month: 'Dec', return: 4.1, benchmark: 2.2, trades: 11800 },
];

export const tradingVolumeData = [
  { hour: '09:30', stocks: 45, commodities: 28 },
  { hour: '10:00', stocks: 62, commodities: 35 },
  { hour: '10:30', stocks: 58, commodities: 42 },
  { hour: '11:00', stocks: 72, commodities: 48 },
  { hour: '11:30', stocks: 65, commodities: 52 },
  { hour: '12:00', stocks: 48, commodities: 38 },
  { hour: '12:30', stocks: 42, commodities: 35 },
  { hour: '13:00', stocks: 55, commodities: 45 },
  { hour: '13:30', stocks: 68, commodities: 58 },
  { hour: '14:00', stocks: 75, commodities: 62 },
  { hour: '14:30', stocks: 82, commodities: 68 },
  { hour: '15:00', stocks: 95, commodities: 75 },
  { hour: '15:30', stocks: 88, commodities: 70 },
  { hour: '16:00', stocks: 78, commodities: 55 },
];

export const gpuUtilizationData = [
  { time: '00:00', training: 25, inference: 45, idle: 30 },
  { time: '04:00', training: 35, inference: 35, idle: 30 },
  { time: '08:00', training: 15, inference: 70, idle: 15 },
  { time: '12:00', training: 10, inference: 80, idle: 10 },
  { time: '16:00', training: 12, inference: 78, idle: 10 },
  { time: '20:00', training: 40, inference: 40, idle: 20 },
];
