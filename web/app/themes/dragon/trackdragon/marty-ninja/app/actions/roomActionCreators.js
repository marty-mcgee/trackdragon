var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomConstants = require('../constants/roomConstants');
var NavigationActionCreators = require('./navigationActionCreators');

class RoomActionCreators extends Marty.ActionCreators {
  createRoom(name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(RoomConstants.RECEIVE_ROOMS, room);

    this.app.roomsAPI.createRoom(room).then(res => {
      this.dispatch(RoomConstants.UPDATE_ROOM, room.cid, res.body);
    });
  }
  receiveRooms(rooms) {
    this.dispatch(RoomConstants.RECEIVE_ROOMS, rooms);
  }
}

module.exports = RoomActionCreators;