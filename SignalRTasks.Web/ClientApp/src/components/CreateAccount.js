import React from 'react'
import axios from 'axios'
import { produce } from 'immer'

class Signup extends React.Component {
    state = {
        email: '',
        name: '',
        password: ''

    }

    textChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value
        })

        this.setState(nextState)
    }

    onFormSubmit = async e => {
        e.preventDefault()
        await axios.post('api/user/adduser', this.state)
        this.props.history.push('/login')
    }

    render() {
        return (
                <div className="col-md-6 col-md-offset-3 well">
                <form onSubmit={this.onFormSubmit}>
                        <h4>Create Account</h4>
                        <div className="row">
                            <input type="text" placeholder="Name" name='name' className="form-control" onChange={this.textChange} />
                        </div>
                        <div className="row" style={{ marginTop: 15 }}>
                        <input type="email" placeholder="Email" name='email' className="form-control" onChange={this.textChange} />
                        </div>
                        <div className="row" style={{ marginTop: 15 }}>
                        <input type="password" placeholder="Password" name='password' className="form-control" onChange={this.textChange} />
                        </div>
                        <div className="row" style={{ marginTop: 15 }}>
                            <button className="btn btn-primary">Create Account</button>
                        </div>
                    </form>
            </div>
        )
    }
}

export default Signup