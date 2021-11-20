import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('minimum_wage_claim');
      table
        .integer('company_id')
        .notNullable()
        .references('id')
        .inTable('companies');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
