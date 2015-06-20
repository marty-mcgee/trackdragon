// app.js -||- alt

// This file bootstraps the entire application.

// 1 view
var ChatApp = require('./components/ChatApp.react');

// 2 data
var ChatExampleData = require('./ChatExampleData');

// 3 utils
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

// 4 react lib
var React = require('react');


// load example data into localstorage
ChatExampleData.init();

// load all messages via web api
ChatWebAPIUtils.getAllMessages();


// render view
React.render(
    <ChatApp />,
    document.getElementById('react')
);
