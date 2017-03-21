'use strict';

const Schema = use('Schema');

class CarSchema extends Schema {

  up() {
    this.create('cars', (table) => {
      table.increments();
      table.string('name');
      table.string('year');
      table.integer('hp');
      table.string('collection');
      table.integer('brand_id').references('brands.id').onDelete('CASCADE');
      table.float('price');
      table.timestamps();
    });
  }

  down() {
    this.drop('cars');
  }

}

module.exports = CarSchema;
