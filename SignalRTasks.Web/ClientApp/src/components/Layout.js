import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { UserContext} from '../UserContextComponent'

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
        <div>
            <UserContext.Consumer>
                {value => {
                    const loggedIn=value.user
                    return (
                        <nav className="navbar navbar-inverse navbar-fixed-top">
                            <div className="container">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                </div>

                                <div className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">
                                        {!loggedIn &&< li > <Link to={`/login`}>Login</Link></li>}
                                        {!loggedIn &&< li > <Link to={`/createaccount`}>Create Account</Link></li>}
                                        {!!loggedIn && < li > <Link to={`/`}>Tasks</Link></li>}
                                        {!!loggedIn && < li > <Link to={`/logout`}>Logout</Link></li>}
                                        
                                    </ul>
                                </div>

                            </div>
                        </nav>
                    )
                }}
            </UserContext.Consumer>
            <div className="container" style={{ marginTop: 55 }}>
                {this.props.children}
            </div>

        </div>

    );
  }
}
