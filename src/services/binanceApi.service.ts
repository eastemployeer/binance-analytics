import AppError from "@src/helpers/AppError";
import { ErrorCode } from "@src/helpers/errors";
import { GetSymbolDataAnalysisRequest } from "@src/types/api/market";
import { MarketCandle } from "@src/types/market";
import Binance from 'binance-api-node';

const client = Binance();


/**
 * Fetches candles using Binance API
 */
export const fetchCandles = async (data: GetSymbolDataAnalysisRequest): Promise<MarketCandle[]> => {
    try {
        const response = await client.candles(data);

        const candles = response.map((candle) => ({
            openTime: candle.openTime,
            open: parseFloat(candle.open),
            close: parseFloat(candle.close),
            closeTime: candle.closeTime
        }))

        return candles;
    } catch (e: unknown) {
        throw new AppError(500, ErrorCode.BINANCE_API_ERROR)
    }
}