import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkLoadUsers, thunkRemoveUser} from '../store/thunks'
import {ToastContainer, toast} from 'react-toastify'

class AdminUsers extends Component {
  constructor() {
    super()
    this.Notify = this.Notify.bind(this)
  }
  Notify() {
    toast('User Removed!', {
      autoClose: 30,
      hideProgressBar: false,
      closeOnClick: true,
    })
  }
  render() {
    const {destroy, allUsers} = this.props
    return ( 
      <div>
        <div id='usersToast'> 
          <ToastContainer closeButton={false} />
        </div>
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
                        <button id='userRmvBt' onClick={this.Notify} onClick={() => destroy(user.id)}>Remove</button>
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

const mapState = (state) => {
  return {
    allUsers: state.allUsers
  } 
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(thunkLoadUsers())
    },
    destroy: id => dispatch(thunkRemoveUser(id))
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
