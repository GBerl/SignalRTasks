import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import axios from 'axios'
import  TaskRow from '../pages/TaskRow'

export class Home extends Component {
    displayName = Home.name

    state = {
        connection: null,
        userTask: '',
        tasks: []
    }

    componentDidMount = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("/taskHub").build();

        await connection.start();

        connection.on("allTasks", obj => {
            this.setState({ tasks: obj })
        });

        this.setState({ connection });
        await this.state.connection.invoke("alltasks");
    }

    addTaskClick = async () => {
        await axios.post('/api/task/addtask', { task: this.state.userTask })
        this.setState({ userTask: '' });
        await this.state.connection.invoke("alltasks");
    }

    onToDoTask = async id => {
        await axios.post('/api/task/dotask', { id })
        await this.state.connection.invoke("alltasks");
    }

    onDoneTask = async id => {
        await axios.post('/api/task/donetask', { id })
        await this.state.connection.invoke("alltasks");
    }
    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>

                <input type="text" placeholder="New Task" className="form-control"
                    onChange={e => this.setState({ userTask: e.target.value })}
                    value={this.state.userTask} />

                <button className="btn btn-primary btn-block" onClick={this.addTaskClick}>Add Task</button>

                <table className="table table-bordered table-striped table-hover" style={{ marginTop: 15 }}>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map((task) => <TaskRow key={task.id}
                            task={task}
                            onToDoTask={this.onToDoTask}
                            onDoneTask={this.onDoneTask}
                        />)}
                    </tbody>
                </table>
            </div>
        );
    }
}
