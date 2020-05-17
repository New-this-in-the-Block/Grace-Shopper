import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'

export const UserHome = props => {
  const {email, user} = props
  user.id ? history.push('/profile') : history.push('/products/page/1')

  return (
    <div>
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
