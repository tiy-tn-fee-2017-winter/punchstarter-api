'use strict';

const Brand = use('App/Model/Brand');
const attributes = ['name', 'country', 'collection'];

class BrandController {

  * index(request, response) {
    const brands = yield Brand.with('cars').fetch();

    response.jsonApi('Brand', brands);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const brand = yield Brand.create(Object.assign({}, input, foreignKeys));

    yield brand.related('cars').load();

    response.jsonApi('Brand', brand);
  }

  * show(request, response) {
    const id = request.param('id');
    const brand = yield Brand.with('cars').where({ id }).firstOrFail();

    response.jsonApi('Brand', brand);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const brand = yield Brand.with('cars').where({ id }).firstOrFail();
    brand.fill(Object.assign({}, input, foreignKeys));
    yield brand.save();

    response.jsonApi('Brand', brand);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const brand = yield Brand.query().where({ id }).firstOrFail();
    yield brand.delete();

    response.status(204).send();
  }

}

module.exports = BrandController;
