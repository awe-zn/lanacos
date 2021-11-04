import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('username', 16).notNullable().unique();
      table.string('fullname', 64).notNullable();
      table.string('password').notNullable();
      table.boolean('admin').notNullable().defaultTo(false);
      table.boolean('email_confirmed').notNullable().defaultTo(false);
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
