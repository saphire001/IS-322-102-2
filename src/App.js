import React from 'react';
import axios from 'axios';
import Add from './Templates/Add';
import Page from './Templates/Page';
import View from './Templates/View'; 

const mobileWidth = 768;

class App extends  React.Component {
  state = {
    view: 'grid',
    allTasks: [],
    sortedTasks: {
      todo: [],
      inProgress: [],
      review: [],
      done: []
    },
    errorText: ''
  }
  
  getTasks() {
    axios.get('https://my-json-server.typicode.com/saphire001/IS-322-102-2/posts')
        .then(response => {
          this.setState({ allTasks: response.data, sortedTasks: this.sortTasks(response.data) });
        }).catch (error => {
      this.setState({ errorMessage: error.message });
    });
  }

  sortTasks(tasks) {
    return {
      todo: tasks.filter(post => post.column === 'todo'),
      inProgress: tasks.filter(post => post.column === 'in-progress'),
      review: tasks.filter(post => post.column === 'review'),
      done: tasks.filter(post => post.column === 'done'),
    }
  } 

  componentDidMount() {
    this.getTasks();
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <Page currentView={view} onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  handleResize = () => {
    const browserWidth = window.innerWidth;
    let breakpoint = 'computer';
    if (browserWidth < mobileWidth) {
      breakpoint = 'mobile';
    }
    this.setState({ breakpoint, browserWidth });
  }

  onUpdateTask(_task){
    let allTasks = this.state.allTasks;
    const index = allTasks.findIndex(task => task.id === _task.id);
    allTasks[index] = _task;
    const sortedTasks = this.sortTasks(allTasks);
    this.setState({ allTasks, sortedTasks })
  }

  onViewChange(view) {
    this.setState({ view });
  }

  onAddTask(task) {
    let tasks = this.state.allTasks;
    task.column = 'todo';
    task.id = this.state.allTasks.length + 1;
    tasks.push(task);
    let sortedTasks = this.sortTasks(tasks);
    this.setState({ tasks, sortedTasks, view: 'grid' });
  }

  render(){
    if (this.state.view === 'grid'){
      return (this.wrapPage(<View tasks={this.state.sortedTasks} onUpdateTask={(task)=> this.onUpdateTask(task)} />));
    }
    else if (this.state.view === 'add') {
      return (this.wrapPage(<Add tasks={this.state.sortedTasks} onSubmit={this.onAddTask.bind(this)} />));
    }
    else {
      return (this.wrapPage(<h2>Invalid Tab, choose another</h2>));
    }
  }
}

export default App;