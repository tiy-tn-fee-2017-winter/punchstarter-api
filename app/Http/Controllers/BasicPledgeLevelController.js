'use strict';

const PledgeLevel = use('App/Model/PledgeLevel');
const attributes = ['name', 'collection', 'price', 'project_id', 'description', 'delivery_date', 'ships_to', 'project_id'];

class BasicPledgeLevelController {

  * index(request, response) {
    const basicPledgeLevels = yield PledgeLevel.with('project').fetch();

    response.send(basicPledgeLevels);
  }

  * store(request, response) {
    const input = request.only(attributes);
    const basicPledgeLevel = yield PledgeLevel.create(input);

    response.send(basicPledgeLevel);
  }

  * show(request, response) {
    const id = request.param('id');
    const basicPledgeLevel = yield PledgeLevel.with('project').where({ id }).firstOrFail();

    response.send(basicPledgeLevel);
  }

  * update(request, response) {
    const input = request.only(attributes);
    const id = request.param('id');

    const basicPledgeLevel = yield PledgeLevel.with('project').where({ id }).firstOrFail();
    basicPledgeLevel.fill(input);
    yield basicPledgeLevel.save(input);

    response.send(basicPledgeLevel);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const basicPledgeLevel = yield PledgeLevel.query().where({ id }).firstOrFail();
    yield basicPledgeLevel.delete();

    response.status(204).send();
  }

}

module.exports = BasicPledgeLevelController;
