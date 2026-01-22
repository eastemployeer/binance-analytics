import { Router } from "express";
import * as marketController from '@src/controllers/market.controller';
import { validate } from "@src/middlewares/validate";
import getSymbolDataAnalysisSchema from '@src/validators/getSymbolDataAnalysis.schema';

const marketRouter = Router();

marketRouter.get('/symbol-price-analysis', validate(getSymbolDataAnalysisSchema), marketController.getSymbolDataAnalysis)

export default marketRouter;

