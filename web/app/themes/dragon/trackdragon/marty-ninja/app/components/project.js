var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewMessage = require('./newMessage');
var ProjectsStore = require('../stores/projectsStore');
var MessagesStore = require('../stores/messagesStore');

class Project extends React.Component {
  render() {
    var project = this.props.project;
    var messages = _.sortBy(this.props.messages, message => new Date(message.timestamp));

    return (
      <div className='project'>
        <div className='project-body'>
          <h1 className='project-name'>{project.name}</h1>
          <ul className='messages'>
            {_.map(messages, (message) => {
              return (
                <li className='message'>
                  <div className='message-text'>
                    {message.text}
                  </div>
                </li>
              );
            })}
          </ul>
          <NewMessage projectId={project.id} />
        </div>
      </div>
    );
  }
}

module.exports = Marty.createContainer(Project, {
  listenTo: ['projectsStore', 'messagesStore'],
  fetch: {
    project() {
      return this.app.projectsStore.getProject(this.props.id)
    },
    messages() {
      return this.app.messagesStore.getMessagesForProject(this.props.id)
    }
  },
  pending() {
    return <div className='loading'>Loading...</div>;
  },
  failed(errors) {
    return <div className='error'>Failed to load project. {errors}</div>;
  }
});