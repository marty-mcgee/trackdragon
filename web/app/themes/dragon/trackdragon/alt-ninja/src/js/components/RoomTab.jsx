// RoomTab.jsx

var React = require('react');
var AltManagerMixin = require('../mixins/AltManagerMixin');
var AppActions = require('../actions/AppActions');
var RoomActions = require('../actions/RoomActions');
var RoomStore = require('../stores/RoomStore');

module.exports = React.createClass({

  displayName: 'RoomTab',

  mixins: [AltManagerMixin],
  statics: { registerStore: RoomStore, registerAction: RoomActions },

  onNewAlt: function(state, newProps) {
    // load room if none exists
    if (!state.location && !state.loading) {
      this.action.loadRoom(newProps.location);
    }
  },

  _onClickShowRaw: function() {
    this.action.showRaw(!this.state.showRaw);
  },

  onClickDelete: function() {
    AppActions.deleteLocation(this.props.location);
  },

  getRoomContent: function() {
    if (this.state.loading) {
      return <div className="loading">loading room...</div>;
    }

    if (!this.state.room) {
      return <p>Error loading room data, check location</p>;
    }

    var room = this.state.room;
    var rawData = null;
    var showText = 'Show Raw JSON';
    if (this.state.showRaw) {
      rawData = <pre>{JSON.stringify(room, null, 4)}</pre>;
      showText = 'Hide Raw JSON';
    }

    return (
      <div className="room-data">
        <h4>Current Resonance: {room.main.temp}kHz, {room.weather[0].description}</h4>
        <button onClick={this._onClickShowRaw}>
          {showText}
        </button>
        {rawData}
      </div>
    );
  },

  render: function() {
    return (
      <div className="room-tab">
        <button className="pull-right" onClick={this.onClickDelete}>
          Close Room
        </button>
        <h3>Room Name: "{this.state.location}"</h3>
        {this.getRoomContent()}
      </div>
    );
  },
});
