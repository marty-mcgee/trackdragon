var db = require('./db');
var _ = require('lodash');
var util = require('util');
var uuid = require('uuid').v1;
var EventEmitter2 = require('eventemitter2').EventEmitter2;

function Projects() {
  this.getProject = getProject;
  this.addMessage = addMessage;
  this.createProject = createProject;
  this.getAllProjects = getAllProjects;
  this.getProjectMessages = getProjectMessages;
  this.state = {};

  EventEmitter2.call(this, {
    wildcard: true
  });

  var emit = _.bind(this.emit, this);
  
  // Project

  function createProject(project) {
    _.defaults(project, {
      id: uuid(),
      messages: []
    });

    db.set(project.id, project);
    emit('project:created', project);

    return project;
  }

  function getProject(projectId) {
    var project = db.get(projectId);

    if (project) {
      return project;
    }
  }

  function getAllProjects() {
    return _.values(db.get());
  }

  // Project . Messages

  function getProjectMessages(projectId) {
    var project = db.get(projectId);

    if (project) {
      return project.messages;
    }

    return [];
  }

  function addMessage(projectId, message) {
    var project = db.get(projectId);

    if (project) {
      _.defaults(message, {
        id: uuid()
      });

      project.messages.push(message);

      db.set(projectId, project);

      emit('message', message);

      return message;
    }
  }

}

util.inherits(Projects, EventEmitter2);

module.exports = new Projects();