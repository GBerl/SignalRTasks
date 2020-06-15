import React from 'react'
import axios from 'axios'

const UserContext = React.createContext()

class UserContextComponent extends React.Component {
    state = {
        user: ''
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/user/getuser');
        this.setUser(data);
    }

    setUser = e => {
        this.setState({ user: e })
    }


    render() {

        const value = {
            user: this.state.user,
            setUser: this.setUser,
        }
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export { UserContext, UserContextComponent }
