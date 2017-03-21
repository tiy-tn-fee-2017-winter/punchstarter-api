'use strict';

const Project = use('App/Model/Project');
const attributes = ['name', 'collection', 'country', 'description', 'campaign', 'video_url', 'start_time', 'end_time'];

class BAasicProjectController {

  * index(request, response) {
    const collection = request.param('collection');
    const projects = yield Project.with('pledgeLevels').where({ collection }).fetch();

    response.send(projects);
  }

  * store(request, response) {
    const input = request.only(attributes);
    input.collection = request.param('collection');
    const project = yield Project.create(input);

    response.send(project);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const project = yield Project.with('pledgeLevels').where({ id, collection }).firstOrFail();

    response.send(project);
  }

  * update(request, response) {
    const input = request.only(attributes);
    const id = request.param('id');
    const collection = request.param('collection');

    const project = yield Project.with('pledgeLevels').where({ id, collection }).firstOrFail();
    project.fill(input);
    yield project.save(input);

    response.send(project);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const project = yield Project.query().where({ id, collection }).firstOrFail();
    yield project.delete();

    response.status(204).send();
  }

}

module.exports = BAasicProjectController;
