var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var ProjectsAPI = require('../sources/projectsAPI');
var ProjectConstants = require('../constants/projectConstants');

class ProjectQueries extends Marty.Queries {

  getAllProjects() {
    return this.app.projectsAPI.getAllProjects().then(projects => {
      return this.dispatch(ProjectConstants.RECEIVE_PROJECTS, projects);
    });
  }

  getProject(id) {
    return this.app.projectsAPI.getProject(id).then(project => {
      this.dispatch(ProjectConstants.RECEIVE_PROJECTS, project);
    });
  }
  
}

module.exports = ProjectQueries;