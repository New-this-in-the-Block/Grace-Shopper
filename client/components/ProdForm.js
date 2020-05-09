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
      categoryId: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(ev) {
    ev.preventDefault()
    console.log(this.state)
    try {
      await this.props.create({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        quantity: this.state.quantity,
        categoryId: this.state.categoryId
      })
    } catch (ev) {
      console.log(ev)
    }
  }
  render() {
    const {onSubmit} = this
    const {categories} = this.props
    const {name, description, price, quantity, categoryId} = this.state
    return (
      <div>
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
          Category
          <select
            value={categoryId}
            onChange={ev => this.setState({categoryId: ev.target.value})}
          >
            {/* <select value={ category } onChange={ ev => console.log('ev target here',ev.target.value)} > */}
            <option value="">choose a category</option>
            {categories.map(category => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <button id="submitbt">Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    create: product => dispatch(thunkCreateProduct(product))
  }
}
const mapState = ({categories}, ownprops) => {
  return {
    categories,
    ownprops
  }
}
export default connect(mapState, mapDispatch)(ProdForm)
