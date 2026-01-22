import { describe, it, expect, jest } from '@jest/globals';
import { ErrorCode } from '@src/helpers/errors';
import { MarketInterval } from '@src/types/market';

const candlesMock = jest.fn<(payload: unknown) => Promise<unknown>>();

jest.mock('binance-api-node', () => ({
    __esModule: true,
    default: () => ({candles: candlesMock})
}))


describe('fetchCandles', () => {
    let fetchCandles: typeof import('@src/services/binanceApi.service').fetchCandles;

    beforeAll(async () => {
        const binanceApiService = await import('@src/services/binanceApi.service');
        fetchCandles = binanceApiService.fetchCandles;
    });

    it('throws AppError when Binance API fails', async () => {
        const payload = {
            symbol: 'ETHBTC',
            startTime: 100,
            endTime: 200,
            interval: MarketInterval.FIVE_MINUTES
        }

        candlesMock.mockRejectedValueOnce(new Error('any error. Doesnt matter.'));

        await expect(fetchCandles(payload)).rejects.toMatchObject({
            status: 500,
            code: ErrorCode.BINANCE_API_ERROR
        })
    })

    it('successfully retrieves candles, maps numeric fields, limits fields', async () => {
        candlesMock.mockResolvedValueOnce([{
            openTime: 1508328900000,
            open: '0.05655000',
            high: '0.05656500',
            low: '0.05613200',
            close: '0.05632400',
            volume: '68.88800000',
            closeTime: 1508329199999,
            quoteAssetVolume: '2.29500857',
            trades: 85,
            baseAssetVolume: '40.61900000',
        }])

        const payload = {
            symbol: 'ETHBTC',
            startTime: 100,
            endTime: 200,
            interval: MarketInterval.FIVE_MINUTES
        }

        const response = await fetchCandles(payload);

        expect(candlesMock).toHaveBeenCalledWith(payload);
        expect(response).toEqual([{
            openTime: 1508328900000,
            closeTime: 1508329199999,
            open: 0.05655000,
            close: 0.05632400
        }])
    })
})