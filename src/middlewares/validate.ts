import AppError from '@src/helpers/AppError';
import { ErrorCode } from '@src/helpers/errors';
import { NextFunction, Request, Response } from 'express';
import {ZodType} from 'zod';

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const validated = schema.safeParse({...req.query});
        if (!validated.success) {
            throw new AppError(400, ErrorCode.VALIDATION_ERROR, validated.error.issues[0].message)
        }

        req.body = validated.data;
        next();
    }
}