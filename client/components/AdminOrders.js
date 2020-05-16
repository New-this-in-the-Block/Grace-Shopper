import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkLoadAllOrders, thunkUpdateOrder} from '../store'
import {ToastContainer, toast} from 'react-toastify'


class AdminOrders extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      status: ''
    }

    this.updateOrder = this.updateOrder.bind(this)
    this.Notify = this.Notify.bind(this)
  }

  Notify() {
    toast('Order Updated!', {
      autoClose: 30,
      hideProgressBar: false,
      closeOnClick: true,
      })
  }
  componentDidMount() {
      this.props.loadInitialData()
  }

  async updateOrder(ev) {
    ev.preventDefault()
    try {
      await this.props.update({
        id: this.state.id,
        status: this.state.status
      })
    } catch (error) {
      
    }
  }
  render() {
    const {orders} = this.props
    return ( 
      <div>
        <div id='toast'> 
          <ToastContainer closeButton={false} />
        </div>
        <div id="orderListWrapper">
        <table>
            <thead id="orderHeader">
              <tr>
                <th>Date Created</th>
                <th>User ID</th>
                <th> Current Status</th>
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
                      <td>{order.id}</td>
                      <td >
                        <form id='orderUpdateForm' onSubmit={this.updateOrder}>
                          <select 
                          onChange={ev => this.setState({id: order.id, status: ev.target.value})} 
                          >
                            {/* <option value='' >{order.status}</option>
                            <option value={order.status === 'Invoice' ? 'Cancelled' : 'Invoice'} >{order.status === 'Invoice' ? 'Cancel' : 'Invoice'}</option> */}
                            <option value=''>--change status--</option>
                            <option value='Invoice'>Invoice</option>
                            <option value='Processing'>Processing</option>
                            <option value='Shipped'>Shipped</option>
                            <option value='Complete'>Complete</option>
                            <option value='Cancel'>Cancel</option>
                          </select>
                          <button onClick={this.Notify}>Update</button>
                        </form>
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
      },
      update: order => dispatch(thunkUpdateOrder(order)) 
    }
  }

export default connect(mapState, mapDispatch)(AdminOrders)
