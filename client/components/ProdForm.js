import React, {Component, useCallback} from 'react'
import {connect} from 'react-redux'
import {thunkCreateProduct} from '../store'
import {ToastContainer, toast} from 'react-toastify'

class ProdForm extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      categoryId: '',
      imageURL: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.reset = this.reset.bind(this)
    this.notify = this.notify.bind(this)

  }
  notify() {
    toast('Product Added!', {
      autoClose: 30,
      hideProgressBar: false,
      closeOnClick: true,
      })
  }
  async onSubmit(ev) {
    ev.preventDefault()
    try {
      await this.props.create({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        quantity: this.state.quantity,
        categoryId: this.state.categoryId,
        imageURL: this.state.imageURL
      })
    } catch (ev) {
      console.log(ev)
    }
    this.reset()
  }

  reset() {
    this.setState({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      categoryId: '',
      imageURL: ''
    })
  }

  render() {
    const {onSubmit, notify} = this
    const {categories} = this.props
    const {name, description, price, quantity, categoryId, imageURL} = this.state
    return (
      <div>
        <div id='formToast'>
          <ToastContainer closeButton={false} />
        </div>
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
          Image URL<input value={imageURL} onChange={ev => this.setState({imageURL: ev.target.value})}></input>
          <button id="submitbt" onClick={this.notify}>Add</button>
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