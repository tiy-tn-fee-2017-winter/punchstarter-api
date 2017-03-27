const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'first_name', 'last_name', 'username'];
  }

}

module.exports = User;
