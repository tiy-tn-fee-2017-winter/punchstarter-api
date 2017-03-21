'use strict';

const Car = use('App/Model/Car');
const attributes = ['name', 'year', 'hp', 'price'];

class CarController {

  * index(request, response) {
    const collection = request.param('collection');
    const cars = yield Car.with('brand').where({ collection }).fetch();

    response.jsonApi('Car', cars);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    input.collection = request.param('collection');
    const foreignKeys = {
      brand_id: request.jsonApi.getRelationId('brand'),
    };
    const car = yield Car.create(Object.assign({}, input, foreignKeys));
    yield car.related('brand').load();

    response.jsonApi('Car', car);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const car = yield Car.with('brand').where({ id, collection }).firstOrFail();

    response.jsonApi('Car', car);
  }

  * update(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      brand_id: request.jsonApi.getRelationId('brand'),
    };

    const car = yield Car.with('brand').where({ id, collection }).firstOrFail();
    car.fill(Object.assign({}, input, foreignKeys));
    yield car.save();

    response.jsonApi('Car', car);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');

    const car = yield Car.query().where({ id, collection }).firstOrFail();
    yield car.delete();

    response.status(204).send();
  }

}

module.exports = CarController;
