var Marty = require('marty');
var RoomsStore = require('../stores/roomsStore');
var ProjectsStore = require('../stores/projectsStore');
var MessagesStore = require('../stores/messagesStore');
var SocketStateSource = require('marty-socket.io-state-source');
var RoomActionCreators = require('../actions/roomActionCreators');
var ProjectActionCreators = require('../actions/projectActionCreators');
var MessageActionCreators = require('../actions/messageActionCreators');

var ServerUpdatesSocket = Marty.createStateSource({
  id: 'ServerUpdatesSocket',
  mixins: [SocketStateSource()],
  events: {
    'message': 'onMessage',
    'room:created': 'onRoomCreated',
    'project:created': 'onProjectCreated'
  },
  onMessage(message) {
    if (!this.app.messagesStore.getMessage(message.id, message.roomId)) {
      this.app.messageActionCreators.receiveMessages(message.roomId, [message]);
    }
  },
  onRoomCreated(room) {
    if (!this.app.roomsStore.roomExists(room.id)) {
      this.app.roomActionCreators.receiveRooms([room]);
    }
  },
  onProjectCreated(project) {
    if (!this.app.projectsStore.projectExists(project.id)) {
      this.app.projectActionCreators.receiveRooms([project]);
    }
  }
});

module.exports = ServerUpdatesSocket;