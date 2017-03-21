'use strict'

const Lucid = use('Lucid')

class Project extends Lucid {


  pledgeLevels() {
    return this.hasMany('App/Model/PledgeLevel', 'id', 'project_id');
  }
}

module.exports = Project
