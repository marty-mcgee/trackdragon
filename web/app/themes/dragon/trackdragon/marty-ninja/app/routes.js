var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = [
  /*<Route name="medium" path="/mediums/:id" handler={require('../views/medium')} />,
  <Route name="clip" path="/clips/:id" handler={require('../views/clip')} />,
  <Route name="track" path="/tracks/:id" handler={require('../views/track')} />,*/
  <Route name="project" path="/projects/:id" handler={require('./components/project')} />,
  <Route name="room" path="/rooms/:id" handler={require('./components/room')} />,
  <Route name="home" path="/" handler={require('./components/home')} />
];