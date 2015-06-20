var uuid = require('uuid').v1;
var _ = require('lodash');

module.exports = {
  createMessage(text, roomId, projectId) {
    return {
      text: text,
      id: uuid(),
      roomId: roomId,
      projectId: projectId,
      cid: this.cid(),
      timestamp: new Date().toJSON()
    };
  },
  cid() {
    return _.uniqueId('message');
  }
};