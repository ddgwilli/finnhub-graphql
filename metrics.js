const graphql = require('graphql');
const fetch = require('node-fetch');

const reformatBrokenFieldNames = (metrics) => {
  const brokenFieldNames = {
    "10DayAverageTradingVolume": "tenDayAverageTradingVolume",
    "13WeekPriceReturnDaily": "thirteenWeekPriceReturnDaily",
    "26WeekPriceReturnDaily": "twentySixWeekPriceReturnDaily",
    "3MonthAverageTradingVolume": "threeMonthAverageTradingVolume",
    "52WeekHigh": "fiftyTwoWeekHigh",
    "52WeekHighDate": "fiftyTwoWeekHighDate",
    "52WeekLow": "fiftyTwoWeekLow",
    "52WeekLowDate": "fiftyTwoWeekLowDate",
    "52WeekPriceReturnDaily": "fiftyTwoWeekPriceReturnDaily",
    "5DayPriceReturnDaily": "fiveDayPriceReturnDaily",
    "currentEv/freeCashFlowAnnual": "currentEvDividedByFreeCashFlowAnnual",
    "currentEv/freeCashFlowTTM": "currentEvDividedByFreeCashFlowTTM",
    "freeOperatingCashFlow/revenue5Y": "freeOperatingCashFlowDividedByRevenue5Y",
    "freeOperatingCashFlow/revenueTTM": "freeOperatingCashFlowDividedByRevenueTTM",
    "longTermDebt/equityAnnual": "longTermDebtDividedByEquityAnnual",
    "longTermDebt/equityQuarterly": "longTermDebtDividedByEquityQuarterly",
    "netProfitMargin%Annual": "netProfitMarginPercentageAnnual",
    "priceRelativeToS&P50013Week": "priceRelativeToSP50013Week",
    "priceRelativeToS&P50026Week": "priceRelativeToSP50026Week",
    "priceRelativeToS&P5004Week": "priceRelativeToSP5004Week",
    "priceRelativeToS&P50052Week": "priceRelativeToSP50052Week",
    "priceRelativeToS&P50052Week": "priceRelativeToSP50052Week",
    "totalDebt/totalEquityAnnual": "totalDebtDividedByTotalEquityAnnual",
    "totalDebt/totalEquityQuarterly": "totalDebtDividedByTotalEquityQuarterly",
  };

  for (const field in brokenFieldNames) {
    if(!brokenFieldNames.hasOwnProperty(field)) {
      continue;
    }

    if(metrics[field] != null) {
      metrics[brokenFieldNames[field]] = metrics[field];
      delete metrics[field];
    }
  }
}

const getMetrics = (symbol, metric) => {
  return fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=${metric}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => {
    const metrics = json["metric"];
    reformatBrokenFieldNames(metrics);
    
    return metrics;
  });
}

const metricsResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];
  const metric = args["metric"];

  return getMetrics(symbol, metric);
}

const metricType = new graphql.GraphQLObjectType({
  name: 'Metric',
  fields: {
    tenDayAverageTradingVolume: { type: graphql.GraphQLFloat },
    thirteenWeekPriceReturnDaily: { type: graphql.GraphQLFloat },
    twentySixWeekPriceReturnDaily: { type: graphql.GraphQLFloat },
    threeMonthAverageTradingVolume: { type: graphql.GraphQLFloat },
    fiftyTwoWeekHigh: { type: graphql.GraphQLFloat },
    fiftyTwoWeekHighDate: { type: graphql.GraphQLFloat },
    fiftyTwoWeekLow: { type: graphql.GraphQLFloat },
    fiftyTwoWeekLowDate: { type: graphql.GraphQLFloat },
    fiftyTwoWeekPriceReturnDaily: { type: graphql.GraphQLFloat },
    fiveDayPriceReturnDaily: { type: graphql.GraphQLFloat },
    assetTurnoverAnnual: { type: graphql.GraphQLFloat },
    assetTurnoverTTM: { type: graphql.GraphQLFloat },
    beta: { type: graphql.GraphQLFloat },
    bookValuePerShareAnnual: { type: graphql.GraphQLFloat },
    bookValuePerShareQuarterly: { type: graphql.GraphQLFloat },
    bookValueShareGrowth5Y: { type: graphql.GraphQLFloat },
    capitalSpendingGrowth5Y: { type: graphql.GraphQLFloat },
    cashFlowPerShareAnnual: { type: graphql.GraphQLFloat },
    cashFlowPerShareTTM: { type: graphql.GraphQLFloat },
    cashPerSharePerShareAnnual: { type: graphql.GraphQLFloat },
    cashPerSharePerShareQuarterly: { type: graphql.GraphQLFloat },
    currentDividendYieldTTM: { type: graphql.GraphQLFloat },
    currentEvDividedByfreeCashFlowAnnual: { type: graphql.GraphQLFloat },
    currentEvDividedByfreeCashFlowTTM: { type: graphql.GraphQLFloat },
    currentRatioAnnual: { type: graphql.GraphQLFloat },
    currentRatioQuarterly: { type: graphql.GraphQLFloat },
    dilutedEpsExclExtraTTM: { type: graphql.GraphQLFloat },
    dividendGrowthRate5Y: { type: graphql.GraphQLFloat },
    dividendPerShare5Y: { type: graphql.GraphQLFloat },
    dividendPerShareAnnual: { type: graphql.GraphQLFloat },
    dividendsPerShareTTM: { type: graphql.GraphQLFloat },
    dividendYield5Y: { type: graphql.GraphQLFloat },
    dividendYieldIndicatedAnnual: { type: graphql.GraphQLFloat },
    ebitdaCagr5Y: { type: graphql.GraphQLFloat },
    ebitdaInterimCagr5Y: { type: graphql.GraphQLFloat },
    ebitdAnnual: { type: graphql.GraphQLFloat },
    ebitdPerShareTTM: { type: graphql.GraphQLFloat },
    ebitdTTM: { type: graphql.GraphQLFloat },
    ebtAnnual: { type: graphql.GraphQLFloat },
    ebtNormalizedAnnual: { type: graphql.GraphQLFloat },
    ebtTTM: { type: graphql.GraphQLFloat },
    epsBasicExclExtraItemsAnnual: { type: graphql.GraphQLFloat },
    epsBasicExclExtraItemsTTM: { type: graphql.GraphQLFloat },
    epsExclExtraItemsAnnual: { type: graphql.GraphQLFloat },
    epsExclExtraItemsTTM: { type: graphql.GraphQLFloat },
    epsGrowth3Y: { type: graphql.GraphQLFloat },
    epsGrowth5Y: { type: graphql.GraphQLFloat },
    epsGrowthQuarterlyYoy: { type: graphql.GraphQLFloat },
    epsGrowthTTMYoy: { type: graphql.GraphQLFloat },
    epsInclExtraItemsAnnual: { type: graphql.GraphQLFloat },
    epsInclExtraItemsTTM: { type: graphql.GraphQLFloat },
    epsNormalizedAnnual: { type: graphql.GraphQLFloat },
    focfCagr5Y: { type: graphql.GraphQLFloat },
    freeCashFlowAnnual: { type: graphql.GraphQLFloat },
    freeCashFlowPerShareTTM: { type: graphql.GraphQLFloat },
    freeCashFlowTTM: { type: graphql.GraphQLFloat },
    freeOperatingCashFlowDividedByrevenue5Y: { type: graphql.GraphQLFloat },
    freeOperatingCashFlowDividedByrevenueTTM: { type: graphql.GraphQLFloat },
    grossMargin5Y: { type: graphql.GraphQLFloat },
    grossMarginAnnual: { type: graphql.GraphQLFloat },
    grossMarginTTM: { type: graphql.GraphQLFloat },
    inventoryTurnoverAnnual: { type: graphql.GraphQLFloat },
    inventoryTurnoverTTM: { type: graphql.GraphQLFloat },
    longTermDebtDividedByequityAnnual: { type: graphql.GraphQLFloat },
    longTermDebtDividedByequityQuarterly: { type: graphql.GraphQLFloat },
    marketCapitalization: { type: graphql.GraphQLFloat },
    monthToDatePriceReturnDaily: { type: graphql.GraphQLFloat },
    netDebtAnnual: { type: graphql.GraphQLFloat },
    netDebtInterim: { type: graphql.GraphQLFloat },
    netIncomeCommonAnnual: { type: graphql.GraphQLFloat },
    netIncomeCommonNormalizedAnnual: { type: graphql.GraphQLFloat },
    netIncomeCommonTTM: { type: graphql.GraphQLFloat },
    netIncomeEmployeeAnnual: { type: graphql.GraphQLFloat },
    netIncomeEmployeeTTM: { type: graphql.GraphQLFloat },
    netInterestCoverageAnnual: { type: graphql.GraphQLFloat },
    netInterestCoverageTTM: { type: graphql.GraphQLFloat },
    netMarginGrowth5Y: { type: graphql.GraphQLFloat },
    netProfitMarginPercentageAnnual: { type: graphql.GraphQLFloat },
    netProfitMargin5Y: { type: graphql.GraphQLFloat },
    netProfitMarginTTM: { type: graphql.GraphQLFloat },
    operatingMargin5Y: { type: graphql.GraphQLFloat },
    operatingMarginAnnual: { type: graphql.GraphQLFloat },
    operatingMarginTTM: { type: graphql.GraphQLFloat },
    payoutRatioAnnual: { type: graphql.GraphQLFloat },
    payoutRatioTTM: { type: graphql.GraphQLFloat },
    pbAnnual: { type: graphql.GraphQLFloat },
    pbQuarterly: { type: graphql.GraphQLFloat },
    pcfShareTTM: { type: graphql.GraphQLFloat },
    peBasicExclExtraTTM: { type: graphql.GraphQLFloat },
    peExclExtraAnnual: { type: graphql.GraphQLFloat },
    peExclExtraHighTTM: { type: graphql.GraphQLFloat },
    peExclExtraTTM: { type: graphql.GraphQLFloat },
    peExclLowTTM: { type: graphql.GraphQLFloat },
    peInclExtraTTM: { type: graphql.GraphQLFloat },
    peNormalizedAnnual: { type: graphql.GraphQLFloat },
    pfcfShareAnnual: { type: graphql.GraphQLFloat },
    pfcfShareTTM: { type: graphql.GraphQLFloat },
    pretaxMargin5Y: { type: graphql.GraphQLFloat },
    pretaxMarginAnnual: { type: graphql.GraphQLFloat },
    pretaxMarginTTM: { type: graphql.GraphQLFloat },
    priceRelativeToSP50013Week: { type: graphql.GraphQLFloat },
    priceRelativeToSP50026Week: { type: graphql.GraphQLFloat },
    priceRelativeToSP5004Week: { type: graphql.GraphQLFloat },
    priceRelativeToSP50052Week: { type: graphql.GraphQLFloat },
    priceRelativeToSP50052Week: { type: graphql.GraphQLFloat },
    psAnnual: { type: graphql.GraphQLFloat },
    psTTM: { type: graphql.GraphQLFloat },
    ptbvAnnual: { type: graphql.GraphQLFloat },
    ptbvQuarterly: { type: graphql.GraphQLFloat },
    quickRatioAnnual: { type: graphql.GraphQLFloat },
    quickRatioQuarterly: { type: graphql.GraphQLFloat },
    receivablesTurnoverAnnual: { type: graphql.GraphQLFloat },
    receivablesTurnoverTTM: { type: graphql.GraphQLFloat },
    revenueAnnual: { type: graphql.GraphQLFloat },
    revenueEmployeeAnnual: { type: graphql.GraphQLFloat },
    revenueEmployeeTTM: { type: graphql.GraphQLFloat },
    revenueGrowth3Y: { type: graphql.GraphQLFloat },
    revenueGrowth5Y: { type: graphql.GraphQLFloat },
    revenueGrowthQuarterlyYoy: { type: graphql.GraphQLFloat },
    revenueGrowthTTMYoy: { type: graphql.GraphQLFloat },
    revenuePerShareAnnual: { type: graphql.GraphQLFloat },
    revenuePerShareTTM: { type: graphql.GraphQLFloat },
    revenueShareGrowth5Y: { type: graphql.GraphQLFloat },
    revenueTTM: { type: graphql.GraphQLFloat },
    roaa5Y: { type: graphql.GraphQLFloat },
    roae5Y: { type: graphql.GraphQLFloat },
    roaeTTM: { type: graphql.GraphQLFloat },
    roaRfy: { type: graphql.GraphQLFloat },
    roeRfy: { type: graphql.GraphQLFloat },
    roeTTM: { type: graphql.GraphQLFloat },
    roi5Y: { type: graphql.GraphQLFloat },
    roiAnnual: { type: graphql.GraphQLFloat },
    roiTTM: { type: graphql.GraphQLFloat },
    tangibleBookValuePerShareAnnual: { type: graphql.GraphQLFloat },
    tangibleBookValuePerShareQuarterly: { type: graphql.GraphQLFloat },
    tbvCagr5Y: { type: graphql.GraphQLFloat },
    totalDebtDividedBytotalEquityAnnual: { type: graphql.GraphQLFloat },
    totalDebtDividedBytotalEquityQuarterly: { type: graphql.GraphQLFloat },
    totalDebtCagr5Y: { type: graphql.GraphQLFloat },
    yearToDatePriceReturnDaily: { type: graphql.GraphQLFloat },
  },
});

const metricCategoryType = new graphql.GraphQLEnumType({
  name: 'MetricType',
  values: {
    price: { value: 'price' },
    valuation: { value: 'valuation' },
    growth: { value: 'growth'},
    margin: { value: 'management' },
    financialStrength: { value: 'financialStrength' },
    perShare: { value: 'perShare' },
  }
});

const endpoint = {
  type: metricType,
  resolve: metricsResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    metric: { type: graphql.GraphQLNonNull(metricCategoryType) },
  }
}

module.exports = { endpoint, type: metricType, resolver: metricsResolver, metricCategoryType };