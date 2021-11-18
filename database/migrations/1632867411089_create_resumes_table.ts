import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Resumes extends BaseSchema {
  protected tableName = 'resumes';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('county_id')
        .nullable()
        .references('id')
        .inTable('counties')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.string('district', 64).notNullable();
      table.string('cpf', 11).notNullable();
      table.string('autobiography').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
