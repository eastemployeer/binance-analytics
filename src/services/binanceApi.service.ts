import { GetSymbolDataAnalysisRequest } from "@src/types/api/market";
import { MarketCandle } from "@src/types/market";
import Binance from 'binance-api-node';

const client = Binance();

export const fetchCandles = async (data: GetSymbolDataAnalysisRequest): Promise<MarketCandle[]> => {
    const response = await client.candles(data);

    const candles = response.map((candle) => ({
        openTime: candle.openTime,
        open: parseFloat(candle.open),
        close: parseFloat(candle.close),
        closeTime: candle.closeTime
    }))

    return candles;
}