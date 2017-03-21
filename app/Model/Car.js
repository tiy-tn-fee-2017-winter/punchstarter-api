'use strict'

const Lucid = use('Lucid')

class Car extends Lucid {


  brand() {
    return this.belongsTo('App/Model/Brand', 'id', 'brand_id');
  }
}

module.exports = Car
