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
          -||- <a href="https://dragon.ninja" target="_blank"> dragon.ninja </a>
          <span className="pull-right"> track|>ragon </span>
        </h1>
        <ThreadSection />
        <MessageSection />
        <footer ref="footer">
      		<h2 ref="support"> -||- </h2>
      	</footer>
      </div>
    );
  }
});

// export module package
module.exports = ChatApp;