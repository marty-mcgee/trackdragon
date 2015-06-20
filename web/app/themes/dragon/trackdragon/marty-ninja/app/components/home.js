var _ = require('lodash');
var React = require('react');
var Marty = require('marty');

var NewRoom = require('./newRoom');
var RoomsStore = require('../stores/roomsStore');

var NewProject = require('./newProject');
var ProjectsStore = require('../stores/projectsStore');

var NavigationActionCreators = require('../actions/navigationActionCreators');

// todoApp index.js
//var React = require('react');
var TodoApp = require('./todoApp.react');
/*React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);*/


class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.navigateToRoom = _.bind(this.navigateToRoom, this);
    this.navigateToProject = _.bind(this.navigateToProject, this);
  }
  render() {
    var mm_border_width = "2px";
    var mm_border_color = "#80bd01";
    var mm_padding = "10px";

    return (

      <div className="home" style={{border: mm_border_width + ' solid ' + mm_border_color, padding: mm_padding}}>

        <h1 ref="title">-||- Welcome Dragon Ninja %Marty% -||-</h1>

        <h2 ref="module-title">Rooms</h2>
        <NewRoom />
        <ul className="rooms">
          {_.map(this.props.rooms, (room) => {
            return (
              <li key={room.id} className='room'>
                <a href="javascript:void(0)"
                   onClick={_.partial(this.navigateToRoom, room.id)}>
                   {room.name}
                </a>
              </li>
            );
          })}
        </ul>

        <h2 ref="module-title">Projects</h2>
        <NewProject />
        <ul className="projects">
          {_.map(this.props.projects, (project) => {
            return (
              <li key={project.id} className='project'>
                <a href="javascript:void(0)"
                   onClick={_.partial(this.navigateToProject, project.id)}>
                   {project.name}
                </a>
              </li>
            );
          })}
        </ul>

      </div>

      /* todoApp 
      <TodoApp />*//* , document.getElementById('todoapp') */

    );
  }
  navigateToRoom(roomId) {
    this.app.navigationActionCreators.navigateToRoom(roomId);
  }
  navigateToProject(projectId) {
    this.app.navigationActionCreators.navigateToProject(projectId);
  }
}

module.exports = Marty.createContainer(
  Home,
  {
    listenTo: ['projectsStore', 'roomsStore'],
    fetch: {
      /*
      user() {
        return this.app.userStore.getUser(this.props.id);
      },
      friends() {
        return this.app.userStore.getFriends(this.props.id);
      }
      */
      projects() {
        return this.app.projectsStore.getAll();
      },
      rooms() {
        return this.app.roomsStore.getAll();
      }
    },
    //pending() {
    //  return <div className='pending'>Loading rooms and projects...</div>;
    pending(fetches) {
      return this.done(_.defaults(fetches, {
        //users: DEFAULT_USER,
        //friends: [],
        projects: [],
        rooms: []
      }));
    },
    failed(errors) {
      return <div className='error'>Failed to load rooms and/or projects. {errors}</div>;
    }
  }
);