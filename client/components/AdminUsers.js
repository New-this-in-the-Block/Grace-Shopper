import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkLoadUsers} from '../store'

class AdminUsers extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
      const {allUsers} = this.props
        return ( 
          <div>
              <h3>Users</h3>
            <div id="userListWrapper">
              <table id='usersTable'>
                <thead id="usersHeader">
                  <tr>
                    <th>User</th>
                    <th>User ID</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers &&
                    allUsers.map(user => {
                      return (
                        <tr key={user.id}>
                          <td>{user.email}</td>
                          <td>{user.id}</td>
                          <td>
                            <button id='userRmvBt'>Remove</button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )
    }
}

const mapState = ({allUsers}) => {
    // console.log('adminusers state here', state)
  return {
    allUsers
  } 
}

const mapDispatch = dispatch => {
    return {
      loadInitialData() {
        dispatch(thunkLoadUsers())
      }
    }
  }

export default connect(mapState, mapDispatch)(AdminUsers)