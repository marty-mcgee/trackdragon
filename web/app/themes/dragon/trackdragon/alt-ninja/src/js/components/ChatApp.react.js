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
      	<h1 ref="title">
          track|>ragon
          <span className="pull-right">
            -||- <a href="https://dragon.ninja" target="_blank">dragon.ninja</a>
          </span>
        </h1>
        <ThreadSection />
        <MessageSection />
        <footer ref="footer">
      		<span ref="support">
            <!-- --||-- -->
          </span>
      	</footer>
      </div>
    );
  }
});

// export module package
module.exports = ChatApp;