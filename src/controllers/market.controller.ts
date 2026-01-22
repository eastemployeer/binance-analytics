import { fetchCandles } from "@src/services/binanceApi.service";
import { analyzeCandlesData } from "@src/services/priceAnalysis.service";
import { GetSymbolDataAnalysisRequest } from "@src/types/api/market"
import { Request, Response } from "express"

export const getSymbolDataAnalysis = async (req: Request, res: Response) => {
    const data = req.body as GetSymbolDataAnalysisRequest;
    const candles = await fetchCandles(data);
    const result = analyzeCandlesData({candles, requestedStartTime: data.startTime, requestedEndTime: data.endTime})

    res.status(200).json(result);
}