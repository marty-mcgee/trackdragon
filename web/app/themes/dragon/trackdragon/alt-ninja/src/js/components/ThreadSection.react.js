// ThreadSection.react.js

var ThreadStore = require('../stores/ThreadStore');
var ThreadListItem = require('../components/ThreadListItem.react');
//var MessageStore = require('../stores/MessageStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');
var ListenerMixin = require('../mixins/ListenerMixin');

var React = require('react');

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

var ThreadSection = React.createClass({
  // use State Mixins
  mixins: [ListenerMixin],

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this.listenTo(ThreadStore, this._onChange);
    this.listenTo(UnreadThreadStore, this._onChange);
  },

  render: function() {
    
    var threadListItems = this.state.threads.map(function(thread) {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID} />
      );
    }, this);

    var unread =
      //this.state.unreadCount === 0 ?
      //null :
      <span>Unread threads: {this.state.unreadCount}</span>;
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
        </ul>
      </div>
    );

  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;
