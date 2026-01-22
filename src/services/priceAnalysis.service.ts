import { MarketCandle } from "@src/types/market";
import { PriceAnalysisProps, PriceAnalysisResult, PriceDirection, SingleCandleAnalysisResult } from "@src/types/priceAnalysis";

function getPriceDirection(diff: number): PriceDirection {
    if (diff > 0) return 'up';
    if (diff < 0) return 'down';
    return 'neutral';
}

function getCandleAnalysis(candle: MarketCandle): SingleCandleAnalysisResult {
    const diff = candle.close - candle.open;

    return {
        priceDirection: getPriceDirection(diff),
        absoluteChange: diff,
        percentageChange: (diff / candle.open) * 100
    }
}

function getOverallAnalysis(candles: MarketCandle[]) {
    const firstCandle = candles[0];
    const lastCandle = candles[candles.length - 1];
    const diff = lastCandle.close - firstCandle.open;

    return {
        priceDirection: getPriceDirection(diff),
        absoluteChange: diff,
        percentageChange: (diff/ firstCandle.open) * 100,
        actualStartTime: new Date(firstCandle.openTime).toISOString(),
        actualEndTime: new Date(lastCandle.closeTime).toISOString()
    }
}

export function analyzeCandlesData({candles, requestedEndTime, requestedStartTime}: PriceAnalysisProps): PriceAnalysisResult {
    const candlesAnalysis = candles.map((candle) => getCandleAnalysis(candle));
    const overallAnalysis = getOverallAnalysis(candles);

    return {
        candles: candlesAnalysis,
        overall: {
            ...overallAnalysis,
            requestedStartTime: requestedStartTime ? new Date(requestedStartTime).toISOString() : null,
            requestedEndTime: requestedEndTime ? new Date(requestedEndTime).toISOString(): null,
        }
    }

}