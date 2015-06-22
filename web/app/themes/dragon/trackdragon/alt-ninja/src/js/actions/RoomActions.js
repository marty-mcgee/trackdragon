// RoomActions.js

var $ = require('jquery');

class RoomActions {
  constructor() {
    this.generateActions(
      'setLoading',
      'setRoom',
      'showRaw'
    );
  }

  loadRoom(location) {
    this.dispatch(location);
    $.ajax('http://api.openweathermap.org/data/2.5/weather', {
      crossDomain: true,
      data: { q: location },
      success: (data) => {
        // we put in a fake delay here to show the loading icon
        setTimeout(() => {
          if (data.weather) {
            this.actions.setRoom(data);
          }
          this.actions.setLoading(false);
        }, 500);
      },
      error: () => {
        this.actions.setLoading(false);
      }
    });
  }
}

module.exports = RoomActions;
