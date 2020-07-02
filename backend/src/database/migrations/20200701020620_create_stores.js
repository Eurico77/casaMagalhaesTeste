exports.up = function (knex) {
  return knex.schema.createTable("stores", function (table) {
    table.increments();

    table.string("name").notNullable();
    table.string("description").notNullable();

    table.string("company_id").notNullable();

    table.foreign("company_id").references("id").inTable("companys");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(stores);
};
