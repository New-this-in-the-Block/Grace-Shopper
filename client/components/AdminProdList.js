import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkUpdateProduct, thunkRemoveProduct} from '../store'

class AdminProdList extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      categoryId: '',
      id: ''
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateProd = this.updateProd.bind(this)
  }
  toggleEdit(ev) {
    const {products, categories} = this.props
    const currProd = products.find(product => product.id === ev.target.value)
    const currCategory = categories.find(
      category => category.id === currProd.categoryId
    )
    this.setState({
      isEditing: !this.state.isEditing,
      name: currProd.name,
      description: currProd.description,
      price: currProd.price,
      quantity: currProd.quantity,
      categoryId: currProd.categoryId,
      category: currCategory.name,
      id: currProd.id
    })
  }
  async updateProd(ev) {
    ev.preventDefault()
    try {
      await this.props.update({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        quantity: this.state.quantity,
        category: this.state.category,
        categoryId: this.state.categoryId,
        id: this.state.id
      })
    } catch (ev) {
      console.log(ev)
    }
    this.setState({isEditing: !this.state.isEditing})
  }
  render() {
    const {products, categories, destroy} = this.props
    console.log(products)
    const {updateProd} = this
    const {
      name,
      description,
      price,
      quantity,
      category,
      categoryId
    } = this.state
    console.log(products)
    if (this.state.isEditing) {
      return (
        <form id="updateForm" onSubmit={updateProd}>
          Name<input
            className="editInput"
            value={name}
            onChange={ev => this.setState({name: ev.target.value})}
          />
          Description<input
            className="editInput"
            value={description}
            onChange={ev => this.setState({description: ev.target.value})}
          />
          Price<input
            className="editInput"
            value={price}
            onChange={ev => this.setState({price: ev.target.value})}
          />
          Quantity<input
            className="editInput"
            value={quantity}
            onChange={ev => this.setState({quantity: ev.target.value})}
          />
          Category
          <select
            value={categoryId}
            onChange={ev => this.setState({categoryId: ev.target.value})}
          >
            <option value="">Current Category: {category}</option>
            {categories.map(_category => {
              if (_category.name !== category) {
                return (
                  <option key={_category.id} value={_category.id}>
                    {_category.name}
                  </option>
                )
              }
            })}
          </select>
          <button id="submitbt">Update</button>
        </form>
      )
    }

    return (
      <div id="prodListWrapper">
        <table>
          <thead id="header">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(product => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <button
                        id="editBt"
                        value={product.id}
                        onClick={ev => this.toggleEdit(ev)}
                      >
                        Edit
                      </button>
                      <button id="removeBt" onClick={() => destroy(product.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    update: product => dispatch(thunkUpdateProduct(product)),
    destroy: id => dispatch(thunkRemoveProduct(id))
  }
}
const mapState = ({products, categories}, ownprops) => {
  const processedProds = products.map(product => {
    return {
      ...product,
      category:
        categories &&
        categories.find(category => category.id === product.categoryId)
    }
  })
  return {
    products: products,
    categories,
    ownprops
  }
}
export default connect(mapState, mapDispatch)(AdminProdList)
