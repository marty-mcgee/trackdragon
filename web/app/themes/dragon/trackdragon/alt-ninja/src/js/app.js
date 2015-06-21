// app.js -||- alt-ninja

// this file bootstraps the entire application

// react : view component lib
var React = require('react');

// main view : react view component 
var App = require('./components/App.jsx');

// chat view : react view component
var ChatApp = require('./components/ChatApp.react');

// data <-> store
var ChatExampleData = require('./ChatExampleData');

// utils : apis
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

// load example data into localstorage
ChatExampleData.init();

// load all messages via web api
ChatWebAPIUtils.getAllMessages();

// render main view
React.render(
  React.createElement(App),
  document.getElementById('ninja')
);

// render chat view
React.render(
    <ChatApp />,
    document.getElementById('react')
);