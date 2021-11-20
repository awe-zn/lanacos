import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AcademicExperiences extends BaseSchema {
  protected tableName = 'academic_experiences';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 32).notNullable();
      table.date('start_date').notNullable();
      table.date('end_date');
      table
        .integer('institution_id')
        .notNullable()
        .references('id')
        .inTable('institutions');
      table
        .integer('academic_level_id')
        .notNullable()
        .references('id')
        .inTable('academic_levels');
      table
        .integer('certificate_id')
        .notNullable()
        .references('id')
        .inTable('certificates');
      table
        .integer('resume_id')
        .notNullable()
        .references('id')
        .inTable('resumes');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
