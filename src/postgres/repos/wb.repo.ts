import knex from "#postgres/knex.js";
import { WbApiResponse } from "#types/wb.js";
import { getTodayDate } from "#utils/utils.js";
import { WbBoxTariffDb } from "./types/wb.types.js";

export async function saveBoxTariffs(response: WbApiResponse["response"]) {
    const rows = response.data.warehouseList.map((w) => ({
        date: getTodayDate(),
        warehouse_name: w.warehouseName,
        geo_name: w.geoName,
        box_delivery_base: w.boxDeliveryBase,
        box_delivery_coef_expr: w.boxDeliveryCoefExpr,
        box_delivery_liter: w.boxDeliveryLiter,
        box_delivery_marketplace_base: w.boxDeliveryMarketplaceBase,
        box_delivery_marketplace_coef_expr: w.boxDeliveryMarketplaceCoefExpr,
        box_delivery_marketplace_liter: w.boxDeliveryMarketplaceLiter,
        box_storage_base: w.boxStorageBase,
        box_storage_coef_expr: w.boxStorageCoefExpr,
        box_storage_liter: w.boxStorageLiter,
    }));

    return knex("wb_box_tariffs").insert(rows).onConflict(["date", "warehouse_name", "geo_name"]).merge();
}

export async function getTariffsSorted(sortBy: "ASC" | "DESC"): Promise<WbBoxTariffDb[]> {
    return knex("wb_box_tariffs").select("*").where("date", getTodayDate()).orderBy("box_delivery_coef_expr", sortBy) as unknown as Promise<WbBoxTariffDb[]>;
}
