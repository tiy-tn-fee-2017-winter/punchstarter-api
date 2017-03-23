'use strict';

const Contact = use('App/Model/Contact');
const attributes = ['first-name', 'last-name', 'street', 'phone'];

class ContactController {

  * index(request, response) {
    const contacts = yield Contact.with().fetch();

    response.jsonApi('Contact', contacts);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const contact = yield Contact.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Contact', contact);
  }

  * show(request, response) {
    const id = request.param('id');
    const contact = yield Contact.with().where({ id }).firstOrFail();

    response.jsonApi('Contact', contact);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const contact = yield Contact.with().where({ id }).firstOrFail();
    contact.fill(Object.assign({}, input, foreignKeys));
    yield contact.save();

    response.jsonApi('Contact', contact);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const contact = yield Contact.query().where({ id }).firstOrFail();
    yield contact.delete();

    response.status(204).send();
  }

}

module.exports = ContactController;
