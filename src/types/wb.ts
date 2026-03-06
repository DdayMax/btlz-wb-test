import { z } from "zod";

const numberOrNull = z.string().transform((val) => {
    const parsed = parseFloat(val.replace(",", "."));
    return isNaN(parsed) ? null : parsed;
});

const warehouseSchema = z.object({
    boxDeliveryBase: numberOrNull,
    boxDeliveryCoefExpr: numberOrNull,
    boxDeliveryLiter: numberOrNull,
    boxDeliveryMarketplaceBase: numberOrNull,
    boxDeliveryMarketplaceCoefExpr: numberOrNull,
    boxDeliveryMarketplaceLiter: numberOrNull,
    boxStorageBase: numberOrNull,
    boxStorageCoefExpr: numberOrNull,
    boxStorageLiter: numberOrNull,
    geoName: z.string(),
    warehouseName: z.string(),
});

const dataSchema = z.object({
    dtNextBox: z.string(),
    dtTillMax: z.string(),
    warehouseList: z.array(warehouseSchema),
});

export const wbApiResponseSchema = z.object({
    response: z.object({
        data: dataSchema,
    }),
});

export type WbApiResponse = z.infer<typeof wbApiResponseSchema>;
