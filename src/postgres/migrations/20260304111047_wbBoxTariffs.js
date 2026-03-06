/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("wb_box_tariffs", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("warehouse_name").notNullable();
        table.string("geo_name").notNullable();

        table.decimal("box_delivery_base", 10, 2);
        table.decimal("box_delivery_coef_expr", 10, 2);
        table.decimal("box_delivery_liter", 10, 2);

        table.decimal("box_delivery_marketplace_base", 10, 2);
        table.decimal("box_delivery_marketplace_coef_expr", 10, 2);
        table.decimal("box_delivery_marketplace_liter", 10, 2);

        table.decimal("box_storage_base", 10, 2);
        table.decimal("box_storage_coef_expr", 10, 2);
        table.decimal("box_storage_liter", 10, 2);

        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();

        table.unique(["date", "warehouse_name", "geo_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("wb_box_tariffs");
}
