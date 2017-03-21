'use strict'

const Lucid = use('Lucid')

class PledgeLevel extends Lucid {


  project() {
    return this.belongsTo('App/Model/Project', 'id', 'project_id');
  }
}

module.exports = PledgeLevel
