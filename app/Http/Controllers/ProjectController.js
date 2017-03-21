'use strict';

const Project = use('App/Model/Project');
const attributes = ['name', 'country', 'description', 'campaign', 'video-url', 'start-time', 'end-time'];

class ProjectController {

  * index(request, response) {
    const collection = request.param('collection');
    const projects = yield Project.with('pledgeLevels').where({ collection }).fetch();

    response.jsonApi('Project', projects);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    input.collection = request.param('collection');
    const project = yield Project.create(Object.assign({}, input, foreignKeys));
    yield project.related('pledgeLevels').load();

    response.jsonApi('Project', project);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const project = yield Project.with('pledgeLevels').where({ id, collection }).firstOrFail();

    response.jsonApi('Project', project);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    request.jsonApi.assertId(id);
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const project = yield Project.with('pledgeLevels').where({ id, collection }).firstOrFail();
    project.fill(Object.assign({}, input, foreignKeys));
    yield project.save();

    response.jsonApi('Project', project);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');

    const project = yield Project.query().where({ id, collection }).firstOrFail();
    yield project.delete();

    response.status(204).send();
  }

}

module.exports = ProjectController;
