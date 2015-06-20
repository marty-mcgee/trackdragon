var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var ProjectActionCreators = require('../actions/projectActionCreators');

class NewProject extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onKeyDown = _.bind(this.onKeyDown, this);
    this.createProject = _.bind(this.createProject, this);
    this.updateProjectName = _.bind(this.updateProjectName, this);
    this.state = {
      name: ''
    };
  }
  render() {
    var name = this.state.name;

    return (
      <form className='new-project form-inline'>
        <div className='form-group'>
          <input
               ref='name'
               name='name'
               type='text'
               value={name}
               placeholder='Project name'
               className='form-control'
               onKeyDown={this.onKeyDown}
               onChange={this.updateProjectName} />
        </div>
        <button className='btn btn-default' ref='createProject' onClick={this.createProject}>
          Create project
        </button>
      </form>
    );
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.createProject(e);
    }
  }
  updateProjectName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }
  createProject(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.state.name.trim() !== "") {
      this.app.projectActionCreators.createProject(this.state.name);
      this.setState({
        name: ''
      });
    }
  }
}

module.exports = Marty.createContainer(NewProject);