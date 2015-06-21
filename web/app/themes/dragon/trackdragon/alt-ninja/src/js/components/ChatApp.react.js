// ChatApp.react.js

// main app view (currently)

var React = require('react');
// <ThreadSection />
var ThreadSection = require('./ThreadSection.react');
// <MessageSection />
var MessageSection = require('./MessageSection.react');

// react component
var ChatApp = React.createClass({
  render: function() {
    return (
      <div className="chatapp">
      	<h1 ref="title"> track|>ragon </h1>
        
        <ThreadSection />
        <MessageSection />
        
        <footer ref="footer">
      		<h2 ref="brand"><a href="https://dragon.ninja" target="_blank"> -||- dragon.ninja </a></h2>
      	</footer>
      </div>
    );
  }
});

module.exports = ChatApp;
