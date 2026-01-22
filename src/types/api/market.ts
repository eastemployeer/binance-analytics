import { MarketInterval } from "../market";

export interface GetSymbolDataAnalysisRequest {
    symbol: string;
    interval: MarketInterval;
    startTime?: number;
    endTime?: number;
}