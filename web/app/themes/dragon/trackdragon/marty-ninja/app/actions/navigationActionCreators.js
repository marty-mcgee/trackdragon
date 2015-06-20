var Marty = require('marty');
var Router = require('../router');

class NavigationActionCreators extends Marty.ActionCreators {
  navigateHome() {
    navigateTo('home');
  }
  navigateToRoom(id) {
    navigateTo('room', { id: id });
  }
  navigateToProject(id) {
    navigateTo('project', { id: id });
  }/*
  navigateToTrack(id) {
    navigateTo('track', { id: id });
  }
  navigateToClip(id) {
    navigateTo('clip', { id: id });
  }
  navigateToMedium(id) {
    navigateTo('medium', { id: id });
  }*/
}

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

module.exports = NavigationActionCreators;