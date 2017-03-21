'use strict';

const Lucid = use('Lucid');

class Brand extends Lucid {


  cars() {
    return this.hasMany('App/Model/Car', 'id', 'brand_id');
  }
}

module.exports = Brand;
