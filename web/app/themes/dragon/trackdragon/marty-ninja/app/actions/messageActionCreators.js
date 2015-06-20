var Marty = require('marty');
var MessageUtils = require('../utils/messageUtils');
var MessageConstants = require('../constants/messageConstants');

class MessageActionCreators extends Marty.ActionCreators {
  sendMessage(text, roomId) {
    var message = MessageUtils.createMessage(text, roomId);

    this.dispatch(MessageConstants.RECEIVE_MESSAGES, roomId, message);

    this.app.messagesAPI.createMessage(message).then(res => {
      this.dispatch(MessageConstants.UPDATE_MESSAGE, message.cid, res.body);
    });
  }
  receiveMessages(roomId, messages) {
    this.dispatch(MessageConstants.RECEIVE_MESSAGES, roomId, messages);
  }
}

module.exports = MessageActionCreators;
