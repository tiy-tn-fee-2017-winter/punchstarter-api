const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Car extends JsonApiView {
  get attributes() {
    return ['name', 'year', 'hp', 'price'];
  }

  brand() {
    return this.belongsTo('App/Http/JsonApiViews/Brand', {
      included: true,
      excludeRelation: 'cars'
    });
  }

}

module.exports = Car;
