import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkLoadAllOrders} from '../store'

class AdminOrders extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
      const {orders} = this.props
        return ( 
          <div>
            <div id="orderListWrapper">
              <table>
                <thead id="orderHeader">
                  <tr>
                    <th>Date Created</th>
                    <th>User ID</th>
                    <th> Current Status</th>
                    <th>Items?</th>
                    <th>Order ID</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map(order => {
                      return (
                        <tr key={order.id}>
                          <td>{order.createdAt.slice(0, 10)}</td>
                          <td>{order.userId}</td>
                          <td>{order.status}</td>
                          <td>line items could go here?</td>
                          <td>{order.id}</td>
                          <td>
                            <select>
                              <option>Pending</option>
                              <option>Complete</option>
                              <option>Cancel</option>
                            </select>
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
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
    return {
      loadInitialData() {
        dispatch(thunkLoadAllOrders())
      }
    }
  }

export default connect(mapState, mapDispatch)(AdminOrders)