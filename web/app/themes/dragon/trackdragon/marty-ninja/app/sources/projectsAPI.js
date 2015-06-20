var _ = require('lodash');
var Marty = require('marty');

class ProjectHttpAPI extends Marty.HttpStateSource {
  getAllProjects() {
    return this.get('/api/projects').then(function (res) {
      return res.json();
    });
  }
  getProject(id) {
    return this.get('/api/projects/' + id).then(function (res) {
      return res.json();
    });
  }
  createProject(project) {
    return this.post({
      url: '/api/projects',
      body: _.omit(project, 'cid')
    });
  }
}

module.exports = ProjectHttpAPI;