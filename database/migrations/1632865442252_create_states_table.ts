import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class States extends BaseSchema {
  protected tableName = 'states';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 64).notNullable();
      table.integer('code').notNullable().unique();
      table.string('initials', 2).notNullable().unique();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
