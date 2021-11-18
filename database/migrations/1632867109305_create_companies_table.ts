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
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('profile_picture_id')
        .references('id')
        .inTable('profiles_pictures')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
