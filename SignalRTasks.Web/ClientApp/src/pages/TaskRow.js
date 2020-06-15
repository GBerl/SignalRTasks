import React from 'react'
import { UserContext } from '../UserContextComponent'


const TaskRow = (props) => {
    const { task, userName, id } = props.task
    const { onToDoTask, onDoneTask } = props
    const available = userName == null
    return (
            <UserContext.Consumer>
            {value => {
                const usersTask = value.user.name == userName
                    return (
                        <tr>
                            <td>{task}</td>
                            {!!available &&
                                <button className="btn btn-primary" onClick={() => onToDoTask(id)}>I am doing this one</button>
                            }
                            {!!(usersTask && !available) &&
                                <button className="btn btn-success" onClick={() => onDoneTask(id)}>I am Done!</button>
                            }
                            {!!(!usersTask && !available) &&
                                <button className="btn btn-info" disabled>{userName} is doing this task</button>
                            }
                        </tr>
                    )
                }}
            </UserContext.Consumer>
    )
}

export default TaskRow