import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkLoadUsers, thunkRemoveUser} from '../store'

class AdminUsers extends Component {
    render() {
      const {destroy, allUsers} = this.props
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
                            <button id='userRmvBt' onClick={() => destroy(user.id)}>Remove</button>
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
  return {
    allUsers
  } 
}

const mapDispatch = dispatch => {
    return {
      // loadInitialData() {
      //   dispatch(thunkLoadUsers())
      // },
      destroy: id => dispatch(thunkRemoveUser(id))
    }
  }

export default connect(mapState, mapDispatch)(AdminUsers)
