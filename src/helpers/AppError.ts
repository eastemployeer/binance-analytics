import { ErrorCode, errorMessages } from "./errors";

export default class AppError<T extends ErrorCode = ErrorCode> extends Error {
    public details: string | undefined;

    constructor(public status: number, public code: T, details?: string) {
        const message = errorMessages[code]; 
        super(message);
        this.details = details;
    }
}