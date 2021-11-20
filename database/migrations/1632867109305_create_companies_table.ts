import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Companies extends BaseSchema {
  protected tableName = 'companies';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 64).notNullable();
      table.string('description').notNullable();
      table
        .integer('manager_id')
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('profile_picture_id')
        .references('id')
        .inTable('profiles_pictures');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
