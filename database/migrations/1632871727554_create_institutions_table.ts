import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Institutions extends BaseSchema {
  protected tableName = 'institutions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 128).notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
