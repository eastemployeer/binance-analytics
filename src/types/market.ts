export enum MarketInterval {
    ONE_MINUTE = '1m',
    THREE_MINUTES = '3m',
    FIVE_MINUTES = '5m',
    FIFTEEN_MINUTES = '15m',
    FOUR_HOURS = '4h',
    ONE_DAY = '1d',
    ONE_WEEK = '1w',
    ONE_MONTH = '1M'
}

export interface MarketCandle {
    openTime: number,
    open: number,
    closeTime: number,
    close: number
}

