import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Occupations extends BaseSchema {
  protected tableName = 'occupations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('code').notNullable();
      table.string('name').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
