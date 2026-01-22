import { MarketCandle } from "./market";

export type PriceDirection = 'up' | 'down' | 'neutral'

export interface SingleCandleAnalysisResult {
    priceDirection: PriceDirection,
    absoluteChange: number;
    percentageChange: number;
}

export interface OverallAnalysisResult extends SingleCandleAnalysisResult {
    requestedStartTime: string | null;
    requestedEndTime?: string | null;
    actualStartTime: string;
    actualEndTime: string;
}

export interface PriceAnalysisResult {
    overall: OverallAnalysisResult;
    candles: SingleCandleAnalysisResult[];
}

export interface PriceAnalysisProps {
    candles: MarketCandle[];
    requestedStartTime?: number;
    requestedEndTime?: number;
}