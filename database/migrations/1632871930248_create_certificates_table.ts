import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Certificates extends BaseSchema {
  protected tableName = 'certificates';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('path').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
