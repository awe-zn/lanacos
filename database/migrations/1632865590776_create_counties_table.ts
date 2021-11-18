import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Counties extends BaseSchema {
  protected tableName = 'counties';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('code').notNullable();
      table.string('name', 64).notNullable();
      table
        .integer('state_code')
        .notNullable()
        .references('code')
        .inTable('states')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
