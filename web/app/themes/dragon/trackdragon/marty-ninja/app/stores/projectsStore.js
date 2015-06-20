var _ = require('lodash');
var Marty = require('marty');
var ProjectUtils = require('../utils/projectUtils');
var ProjectQueries = require('../queries/projectQueries');
var ProjectConstants = require('../constants/projectConstants');

class ProjectStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state = {};
    this.handlers = {
      updateProject: ProjectConstants.UPDATE_PROJECT,
      addProjects: ProjectConstants.RECEIVE_PROJECTS
    };
  }
  getAll() {
    return this.fetch({
      id: 'all-projects',
      locally() {
        if (this.hasAlreadyFetched('all-projects')) {
          return _.values(this.state);
        }
      },
      remotely() {


        return this.app.projectQueries.getAllProjects();

        
      }
    });
  }
  getProject(id) {
    return this.fetch({
      id: id,
      dependsOn: this.getAll(),
      locally() {
        return _.findWhere(_.values(this.state), {
          id: id
        }) || null;
      }
    });
  }
  projectExists(id) {
    return _.findWhere(_.values(this.state), {
      id: id
    });
  }
  updateProject(cid, project) {
    this.state[cid] = _.extend(project, this.state[cid]);
    this.hasChanged();
  }
  addProject(project) {
    this.addProjects([project]);
  }
  addProjects(projects) {
    if (!_.isArray(projects)) {
      projects = [projects];
    }

    _.each(projects, (project) => {
      if (!project.cid) {
        project.cid = ProjectUtils.cid();
      }

      this.state[project.cid] = project;
    });

    this.hasChanged();
  }
}

module.exports = ProjectStore;