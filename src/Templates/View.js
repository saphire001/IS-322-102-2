import React from 'react';
import Card from './Templates/Card'

const COLUMN_NAMES = ['todo', 'in-progress', 'review', 'done'];
const DESKTOP_BREAKPOINT = 768;

class View extends React.Component {
    state = {
        breakpoint: 'computer',
        browserWidth: 0,
        option: 'todo'
    }

    find_Task(taskId, columnName){
        const columnTasks = (columnName === 'in-progress') ? this.props.tasks.inProgress : this.props.tasks[columnName];
        return columnTasks.find(task => task.id === taskId);
    }

    onPrevClick(taskId, columnName){
        let task = this.find_Task(taskId, columnName);
        let columnIndex = COLUMN_NAMES.findIndex(name => task.column === name);

        if (columnIndex > 0) {
            columnIndex--
            task.column = COLUMN_NAMES[columnIndex];
            this.props.onUpdateTask(task);
        }
    }

    onNextClick(taskId, columnName){
        let task = this.find_Task(taskId, columnName);
        let columnIndex = COLUMN_NAMES.findIndex(name => task.column === name);

        if (columnIndex < COLUMN_NAMES.length) {
            columnIndex++
            task.column = COLUMN_NAMES[columnIndex];
            this.props.onUpdateTask(task);
        }
    }

    constructor(props) {
        super(props);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    resize_Screen = () => {
        const browserWidth = window.innerWidth;
        let breakpoint = 'computer';
        if (browserWidth <= DESKTOP_BREAKPOINT) {
          breakpoint = 'mobile';
        }
       this.setState({ breakpoint, browserWidth });
    }

    change_Column = () => {
        let option = document.getElementById("columns").value;
        console.log(option);
        this.setState({ option });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize_Screen);
        this.resize_Screen();
        window.addEventListener('change', this.change_Column);
    }

    renderCardColumn(post, prevTxt, nextTxt){
        return(
            <Card id={post.id}
            key={post.id}
            title={post.title}
            type={post.type}
            column={post.column}
            prevTxt={prevTxt}
            onPrevClick={this.onPrevClick}
            nextTxt={nextTxt}
            onNextClick={this.onNextClick} />
        );
    }

    render () {
        const todoCards = this.props.tasks.todo
            .map(post => this.renderCardColumn(post, null, 'Start Work >'));
        const inProgressCards = this.props.tasks.inProgress
            .map(post => this.renderCardColumn(post, '< Send Back', 'Request Review >'));
        const reviewCards = this.props.tasks.review
            .map(post => this.renderCardColumn(post, '< More Work Required', 'Mark Done >'));
        const doneCards = this.props.tasks.done
            .map(post => this.renderCardColumn(post, '< Request Re-Review'));
        if (his.state.breakpoint === 'computer'){
            return(
                <div className="container">
                    <div className="mobile-nav">
                        <h3>Select a column to view:</h3>
                        <select id="columns">
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="col to-do">
                            <h2>
                                To Do
                            </h2>
                            <div className="">
                                { todoCards }
                            </div>
                        </div>

                        <div className="col review">
                            <h2>
                                Review
                            </h2>
                            <div className="">
                                { reviewCards }
                            </div>
                        </div>

                        <div className="col done">
                            <h2>
                                Done
                            </h2>
                            <div className="">
                                { doneCards }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else if (this.state.breakpoint === 'mobile'){
            if (this.state.option === 'todo') {
                return (
                    <div className="container">
                        <div className="mobile-nav">
                            <h3>Select a column to view:</h3>
                            <select id="columns">
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="col to-do">
                                <h2>
                                    To Do
                                </h2>
                                <div className="">
                                    { todoCards }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            else if (this.state.option === 'in-progress'){
                return(
                    <div className="container">
                        <div className="mobile-nav">
                            <h3>Select a column to view:</h3>
                            <select id="columns">
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="col in-progress">
                                <h2>
                                    To Do
                                </h2>
                                <div className="">
                                    { inProgressCards }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            else if (this.state.option === 'review'){
                return (
                    <div className="container">
                        <div className="mobile-nav">
                            <h3>Select a column to view:</h3>
                            <select id="columns">
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className="col review">
                            <h2>
                                Review
                            </h2>
                            <div className="">
                                { reviewCards }
                            </div>
                        </div>
                    </div>
                );
            }

            else if (this.state.option === 'done'){
                return(
                    <div className="container">
                        <div className="mobile-nav">
                        <h3>Select a column to view:</h3>
                        <select id="columns">
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                        </div>

                        <div className="col done">
                            <h2>
                                Done
                            </h2>

                            <div className="">
                                { doneCards }
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default View;