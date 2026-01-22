import { MarketCandle } from "@src/types/market";
import { PriceAnalysisProps, PriceAnalysisResult, PriceDirection, SingleCandleAnalysisResult } from "@src/types/priceAnalysis";

function getPriceDirection(diff: number): PriceDirection {
    if (diff > 0) return 'up';
    if (diff < 0) return 'down';
    return 'neutral';
}

/**
 * Generates price analysis for single candle (compares price at openTime and closeTime)
 */

function getCandleAnalysis(candle: MarketCandle): SingleCandleAnalysisResult {
    const diff = candle.close - candle.open;

    return {
        priceDirection: getPriceDirection(diff),
        absoluteChange: Math.abs(diff),
        percentageChange: (diff / candle.open) * 100
    }
}


/**
 * Generates overall price analysis for specific candles set
 */
function getOverallAnalysis(candles: MarketCandle[]) {
    const firstCandle = candles[0];
    const lastCandle = candles[candles.length - 1];
    const diff = lastCandle.close - firstCandle.open;

    return {
        priceDirection: getPriceDirection(diff),
        absoluteChange: Math.abs(diff),
        percentageChange: (diff/ firstCandle.open) * 100,
        actualStartTime: new Date(firstCandle.openTime).toISOString(),
        actualEndTime: new Date(lastCandle.closeTime).toISOString()
    }
}


/**
 * Generates complete price analysis for:
 * 1. Each candle
 * 2. Overall
 */
export function analyzeCandlesData({candles, requestedEndTime, requestedStartTime}: PriceAnalysisProps): PriceAnalysisResult | null {
    if (candles.length < 1) return null;
    
    const candlesAnalysis = candles.map((candle) => getCandleAnalysis(candle));
    const overallAnalysis = getOverallAnalysis(candles);

    return {
        overall: {
            ...overallAnalysis,
            requestedStartTime: requestedStartTime ? new Date(requestedStartTime).toISOString() : null,
            requestedEndTime: requestedEndTime ? new Date(requestedEndTime).toISOString(): null,
        },
        candles: candlesAnalysis,
    }
}