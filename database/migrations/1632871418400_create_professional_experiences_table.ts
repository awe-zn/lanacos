import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProfessionalExperiences extends BaseSchema {
  protected tableName = 'professional_experiences';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.date('start_date').notNullable();
      table.date('end_date');
      table.string('workplace', 64).notNullable();
      table
        .integer('occupation_id')
        .nullable()
        .references('id')
        .inTable('occupations')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
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
