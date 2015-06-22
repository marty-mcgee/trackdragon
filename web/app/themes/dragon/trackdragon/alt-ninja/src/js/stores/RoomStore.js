// RoomStore.js

class RoomStore {
  constructor(alt) {
    this.bindActions(alt.getActions('RoomActions'));
    this.loading = false;
    this.room = null;
    this.showRaw = false;
    this.location = null;
  }

  loadRoom(location) {
    this.location = location;
    this.loading = true;
  }

  setLoading(isLoading) {
    this.loading = isLoading;
  }

  setRoom(room) {
    this.room = room;
  }

  showRaw(showRaw) {
    this.showRaw = showRaw;
  }
}

module.exports = RoomStore;
