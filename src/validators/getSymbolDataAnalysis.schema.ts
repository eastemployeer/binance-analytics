import { MarketInterval } from '@src/types/market';
import {z} from 'zod';

/**
 * Query validation schema for GET /api/symbol-price-analysis
 */
const schema = z.object({
    symbol: z.string(),
    interval: z.enum(MarketInterval, {error: 'Invalid interval value'}),
    startTime: z.coerce.number().optional(),
    endTime: z.coerce.number().optional(),
})

export default schema;