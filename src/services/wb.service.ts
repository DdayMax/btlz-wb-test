import env from "#config/env/env.js";
import { wbApiResponseSchema } from "#types/wb.js";
import WbApiClient from "../clients/wbApiClient.js";
import { getTariffsSorted, saveBoxTariffs } from "../postgres/repos/wb.repo.js";

const wbApiClient = new WbApiClient({
    wbApiUrl: env.WB_API_URL,
    token: env.WB_API_TOKEN,
});

async function getBoxTariffs(date: Date) {
    const res = await wbApiClient.getBoxTariffs(date);
    const { response } = wbApiResponseSchema.parse(res);
    return response;
}

export async function fetchAndSave(date: Date) {
    const response = await getBoxTariffs(date);
    await saveBoxTariffs(response, date);
}

export async function getFormattedTariffs(sortBy: "ASC" | "DESC") {
    const tariffs = await getTariffsSorted(sortBy);
    if (!tariffs.length) throw new Error("tariffs db is empty");

    return tariffs.map((t) => [
        new Intl.DateTimeFormat("sv-SE").format(t.date),
        t.warehouse_name,
        t.geo_name,
        t.box_delivery_base,
        t.box_delivery_coef_expr,
        t.box_delivery_liter,
        t.box_delivery_marketplace_base,
        t.box_delivery_marketplace_coef_expr,
        t.box_delivery_marketplace_liter,
        t.box_storage_base,
        t.box_storage_coef_expr,
        t.box_storage_liter,
    ]);
}
