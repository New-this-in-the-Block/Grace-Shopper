import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkCreateProduct} from '../store'

class ProdForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      //need a dropdown for category
      category: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(ev) {
    ev.preventDefault()
    try {
      await this.props.create({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        quantity: this.state.quantity,
        category: this.state.category
      })
    } catch (ev) {
      console.log(ev)
    }
  }
  render() {
    const {onSubmit} = this
    const {name, description, price, quantity, category} = this.state
    return (
      <form id="prodform" onSubmit={onSubmit}>
        Name<input
          value={name}
          onChange={ev => this.setState({name: ev.target.value})}
        />
        Description<input
          value={description}
          onChange={ev => this.setState({description: ev.target.value})}
        />
        Price<input
          value={price}
          onChange={ev => this.setState({price: ev.target.value})}
        />
        Quantity<input
          value={quantity}
          onChange={ev => this.setState({quantity: ev.target.value})}
        />
        <select>
          <option>choose a category</option>
          {
            //dropdown for category here, need to bring in categories from db
          }
          <option>category2</option>
        </select>
        <button id="submitbt">Add</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    create: product => dispatch(thunkCreateProduct(product))
  }
}
const mapState = (props, ownprops) => {
  return {
    props,
    ownprops
  }
}
export default connect(mapState, mapDispatch)(ProdForm)
