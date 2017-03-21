'use strict';

const PledgeLevel = use('App/Model/PledgeLevel');
const attributes = ['name', 'price', 'description', 'delivery-date', 'ships-to'];

class PledgeLevelController {

  * index(request, response) {
    const collection = request.param('collection');
    const pledgeLevels = yield PledgeLevel.with('project').where({ collection }).fetch();

    response.jsonApi('PledgeLevel', pledgeLevels);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      project_id: request.jsonApi.getRelationId('project'),
    };
    input.collection = request.param('collection');
    const pledgeLevel = yield PledgeLevel.create(Object.assign({}, input, foreignKeys));
    yield pledgeLevel.related('project').load();

    response.jsonApi('PledgeLevel', pledgeLevel);
  }

  * show(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const pledgeLevel = yield PledgeLevel.with('project').where({ id, collection }).firstOrFail();

    response.jsonApi('PledgeLevel', pledgeLevel);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      project_id: request.jsonApi.getRelationId('project'),
    };

    const pledgeLevel = yield PledgeLevel.with('project').where({ id, collection }).firstOrFail();
    pledgeLevel.fill(Object.assign({}, input, foreignKeys));
    yield pledgeLevel.save();

    response.jsonApi('PledgeLevel', pledgeLevel);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');

    const pledgeLevel = yield PledgeLevel.query().where({ id, collection }).firstOrFail();
    yield pledgeLevel.delete();

    response.status(204).send();
  }

}

module.exports = PledgeLevelController;
