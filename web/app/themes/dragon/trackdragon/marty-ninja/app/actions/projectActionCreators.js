var Marty = require('marty');
var ProjectUtils = require('../utils/projectUtils');
var ProjectConstants = require('../constants/projectConstants');
var NavigationActionCreators = require('./navigationActionCreators');

class ProjectActionCreators extends Marty.ActionCreators {
  createProject(name) {
    var project = ProjectUtils.createProject(name);

    this.dispatch(ProjectConstants.RECEIVE_PROJECTS, project);

    this.app.projectsAPI.createProject(project).then(res => {
      this.dispatch(ProjectConstants.UPDATE_PROJECT, project.cid, res.body);
    });
  }
  receiveProjects(projects) {
    this.dispatch(ProjectConstants.RECEIVE_PROJECTS, projects);
  }
}

module.exports = ProjectActionCreators;