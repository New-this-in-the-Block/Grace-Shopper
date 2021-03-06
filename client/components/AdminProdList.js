import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkUpdateProduct, thunkRemoveProduct} from '../store/thunks'
import {ToastContainer, toast} from 'react-toastify'


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
    this.Notify = this.Notify.bind(this)
    this.RemoveItem = this.RemoveItem.bind(this)

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
      await this.setState({isEditing: !this.state.isEditing})
    } catch (error) {
      console.log(error)
    }
  }
  Notify() {
    toast('Product Updated!', {
      autoClose: 30,
      hideProgressBar: false,
      closeOnClick: true,
      })
  }
  RemoveItem(ev) {
    this.props.destroy(ev.target.value)
    toast('Product Removed!', {
      autoClose: 30,
      hideProgressBar: false,
      closeOnClick: true,
      })
  }
  render() {
    const {products, categories} = this.props
    const {updateProd} = this
    const {
      name,
      description,
      price,
      quantity,
      category,
      categoryId
    } = this.state
    
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
          <button type='button' onClick={this.Notify} id="submitbt">Update</button>
        </form>
      )
    }

    return (
      <div>
        <div id='prodToast'>
          <ToastContainer closeButton={false} />
        </div>
        <div id="prodListWrapper">
          <table>
            <thead id="header">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                {/* <th>Category</th> */}
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
                      {/* <td>{product.category.name}</td> */}
                      <td>
                        <button
                          type='button'
                          id="editBt"
                          value={product.id}
                          onClick={ev => this.toggleEdit(ev)}
                        >
                          Edit
                        </button>
                        <button type='button' id="removeBt" value={product.id} onClick={this.RemoveItem}>
                          Remove
                        </button>
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
const mapDispatch = dispatch => {
  return {
    update: product => dispatch(thunkUpdateProduct(product)),
    destroy: id => dispatch(thunkRemoveProduct(id))
  }
}
const mapState = ({products, categories}, ownprops) => {
  return {
    products,
    categories,
    ownprops
  }
}
export default connect(mapState, mapDispatch)(AdminProdList)
