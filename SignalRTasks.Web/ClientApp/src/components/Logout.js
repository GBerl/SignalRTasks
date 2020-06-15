import React from 'react'
import axios from 'axios'
import {UserContext } from '../UserContextComponent'

class Logout extends React.Component {

    componentDidMount = async () => {
        axios.post('api/user/logout')

    }
    render() {
        return (
            <UserContext.Consumer>
                {value => {

                    value.setUser('')
                    this.props.history.push('/login')

                }}
            </UserContext.Consumer>
        )
    }
}
export default Logout