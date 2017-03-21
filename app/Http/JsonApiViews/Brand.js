const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Brand extends JsonApiView {
  get attributes() {
    return ['name', 'country'];
  }

  cars() {
    return this.hasMany('App/Http/JsonApiViews/Car', {
      included: true,
      excludeRelation: 'brand'
    });
  }

}

module.exports = Brand;
