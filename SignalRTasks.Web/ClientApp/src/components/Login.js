import React from 'react'
import axios from 'axios'
import { UserContext } from '../UserContextComponent'
import { produce } from 'immer'

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    textChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value
        })

        this.setState(nextState)
    }

    onSubmit = async value => {
        const { data } = await axios.post('api/user/login', this.state)
        value.setUser(data)

        this.props.history.push('/')
    }

    render() {
        return (

            <div>
                <UserContext.Consumer>
                    {value => {
                        return (
                            <div className="col-md-6 col-md-offset-3 well">
                                    <h4>Login to your account</h4>
                                    <div className="row" style={{ marginTop: 15 }}>
                                        <input type="email" placeholder="Email" name='email' className="form-control" onChange={this.textChange} />
                                    </div>
                                    <div className="row" style={{ marginTop: 15 }}>
                                        <input type="password" placeholder="Password" name='password' className="form-control" onChange={this.textChange} />
                                    </div>
                                    <div className="row" style={{ marginTop: 15 }}>
                                    <button className="btn btn-primary" onClick={()=>this.onSubmit(value)}>Login</button>
                                    </div>
                            </div>
                            )
                    }}
                </UserContext.Consumer>
            </div>

        )
    }
}

export default Login