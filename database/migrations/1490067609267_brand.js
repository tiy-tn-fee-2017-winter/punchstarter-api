'use strict';

const Schema = use('Schema');

class BrandSchema extends Schema {

  up() {
    this.create('brands', (table) => {
      table.increments();
      table.string('name');
      table.string('country');
      table.string('collection');
      
      table.timestamps();
    });
  }

  down() {
    this.drop('brands');
  }

}

module.exports = BrandSchema;
