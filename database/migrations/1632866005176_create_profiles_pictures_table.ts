import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProfilesPictures extends BaseSchema {
  protected tableName = 'profiles_pictures';

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
