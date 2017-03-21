'use strict';

const Schema = use('Schema');

class PledgeLevelSchema extends Schema {

  up() {
    this.create('pledge_levels', (table) => {
      table.increments();
      table.string('name');
      table.integer('collection');
      table.integer('price');
      table.text('description');
      table.string('delivery_date');
      table.string('ships_to');
      table.integer('project_id')
        .references('projects.id')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('pledge_levels');
  }

}

module.exports = PledgeLevelSchema;
