const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Project extends JsonApiView {
  get attributes() {
    return ['name', 'country', 'description', 'campaign', 'video_url', 'start_time', 'end_time'];
  }

  pledgeLevels() {
    return this.hasMany('App/Http/JsonApiViews/PledgeLevel', {
      included: true,
      excludeRelation: 'project'
    });
  }

}

module.exports = Project;
