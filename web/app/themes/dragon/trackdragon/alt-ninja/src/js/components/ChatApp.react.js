// ChatApp.react.js

// chat app view component uses react
var React = require('react');

// instantiate chat app view components
var ThreadSection = require('./ThreadSection.react');
var MessageSection = require('./MessageSection.react');

// render chat app react view component
var ChatApp = React.createClass({
  render: function() {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }
});

// export module package
module.exports = ChatApp;