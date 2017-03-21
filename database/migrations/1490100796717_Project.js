'use strict';

const Schema = use('Schema');

class ProjectSchema extends Schema {

  up() {
    this.create('projects', (table) => {
      table.increments();
      table.string('name');
      table.string('collection');
      table.string('country');
      table.text('description');
      table.text('campaign');
      table.string('video_url');
      table.timestamp('start_time');
      table.timestamp('end_time');

      table.timestamps();
    });
  }

  down() {
    this.drop('projects');
  }

}

module.exports = ProjectSchema;
