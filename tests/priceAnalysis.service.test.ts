import {describe, it, expect} from '@jest/globals';
import { analyzeCandlesData } from '@src/services/priceAnalysis.service';
import { MarketCandle } from '@src/types/market';

describe('analyzeCandlesData', () => {
    it('returns null when there are no candles', () => {
        const result = analyzeCandlesData({candles: []});
        expect(result).toBe(null);
    })

    it('correctly calculates candles price data', () => {
        const candles: MarketCandle[] = [
            {
                openTime: 1,
                open: 100,
                closeTime: 2,
                close: 110
            },
            {
                openTime: 2,
                open: 110,
                closeTime: 3,
                close: 55
            }
        ];
        const result = analyzeCandlesData({candles});

        expect(result).toMatchObject({
            candles: [
                {
                    priceDirection: 'up',
                    absoluteChange: 10,
                    percentageChange: 10,
                },
                {
                    priceDirection: 'down',
                    absoluteChange: 55,
                    percentageChange: -50

                }
            ],
            overall: {
                priceDirection: 'down',
                absoluteChange: 45,
                percentageChange: -45,
                requestedStartTime: null,
                requestedEndTime: null,
                actualStartTime: new Date(1).toISOString(),
                actualEndTime: new Date(3).toISOString(),
            }
        })
    })
})