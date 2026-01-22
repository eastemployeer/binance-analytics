export enum ErrorCode {
    BINANCE_API_ERROR = 1000,
    VALIDATION_ERROR = 1001,
}

export const errorMessages = {
    [ErrorCode.BINANCE_API_ERROR]: 'Binance API Error',
    [ErrorCode.VALIDATION_ERROR]: 'Validation Error'
}