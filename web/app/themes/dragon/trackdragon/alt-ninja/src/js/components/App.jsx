// App.jsx

/**
 * This is an example React/Flux/Alt app that shows the use of AltManager, a
 * utility class for Alt.js. AltManager allows for multiple alt instances which is
 * necessary to build apps that encapsulates a mini app inside of a large app. In
 * this example we have a simple weather searcher. Each search you make will
 * create a new tab which itself is a new Alt instance and has its own internal
 * store & actions. Whatever you do in the alt instance is persisted even after
 * you move to another tab. You can delete tabs which will delete that alt instance
 */

// this is a react view component
var React = require('react');
var ReactStateMagicMixin = require('../mixins/ReactStateMagicMixin');

// use AltManager to manage multiple alt instances in single component "App"

var Alt = require('alt');
var AltManager = require('alt/utils/AltManager');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var RoomTab = require('./RoomTab.jsx');

var manager = new AltManager(Alt);
AppActions.setManager(manager);

module.exports = React.createClass({

  displayName: 'App',
  mixins: [ReactStateMagicMixin],
  statics: { registerStore: AppStore },

  render: function() {
    var locationLinks = [];
    var roomApp = null;

    if (this.state.location) {
      roomApp = (
        <RoomTab
          alt={manager.getOrCreate(this.state.location)}
          location={this.state.location} />
      );
    }

    for (var location in manager.all()) {
      locationLinks.push(
        <li
          key={location}
          className={location === this.state.location ? 'selected' : null}>
          <a href="javascript:void(0);" onClick={this._onClickLocation.bind(this, location)}>
            {location}
          </a>
        </li>
      );
    }

    return (
      <div>
        <h1 ref="title">
          <span className="pull-right">
            <!-- --||-- -->
            <a href="#track">track</a>|><a href="#dragon">ragon</a>
          </span>
          -||- <a href="https://dragon.ninja" target="_blank">dragon.ninja</a>
        </h1>
        <div className="content">
          <form className="search-box" onSubmit={this._onClickSubmit}>
            <input
              type="text"
              className="search-location"
              placeholder="Room Name"/>
            <button>Create Room</button>
          </form>
          <ul className="nav">{locationLinks}</ul>
          {roomApp}
        </div>
        <footer ref="footer">
          <span ref="support">
            <!-- --||-- -->
          </span>
        </footer>
      </div>
    );
  },

  componentDidMount: function() {
    // ex: add Dragon Studio on page load
    AppActions.addLocation('Dragon Studio, CA');
    // ex: add Fort Bragg, CA, USA on page load
    AppActions.addLocation('Fort Bragg, CA');
  },

  _onClickSubmit: function(e) {
    e.preventDefault();
    AppActions.addLocation(e.target.children[0].value.trim());
  },

  _onClickLocation: function(location) {
    AppActions.setLocation(location);
  }
});
