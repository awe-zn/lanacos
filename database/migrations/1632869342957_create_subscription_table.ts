import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Subscriptions extends BaseSchema {
  protected tableName = 'subscriptions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('job_id').notNullable().references('id').inTable('jobs');
      table
        .integer('resume_id')
        .notNullable()
        .references('id')
        .inTable('resumes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
