import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkUpdateProduct} from '../store'

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
    // console.log(this.state)
    try {
      await this.props.update({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        categoryId: this.state.categoryId,
        id: this.state.id
      })
    } catch (ev) {
      console.log(ev)
    }
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
    console.log(this.state)

    if (this.state.isEditing) {
      return (
        <form id="updateForm" onSubmit={updateProd}>
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
            <option value="">{category.name}</option>
            {/* {categories.map(category => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })} */}
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
                // if (this.state.isEditing) {
                //   return (
                //     // <form>
                //     //   <input>{product.name}</input>
                //     //   <input>{product.description}</input>
                //     //   <input>${product.price}</input>
                //     //   <input>{product.category}</input>
                //     //   <button id='editBt' onClick={updateProd}>Save</button><button id='removeBt'>Remove</button>
                //     // </form>
                //     <tr key={product.id} id="editableRow">
                //       <td contentEditable="true">{product.name}</td>
                //       <td contentEditable="true">{product.description}</td>
                //       <td contentEditable="true">${product.price}</td>
                //       <td contentEditable="true">{product.category}</td>
                //       <td>
                //         <button id="editBt" onClick={updateProd}>
                //           Save
                //         </button>
                //         <button id="removeBt">Remove</button>
                //       </td>
                //     </tr>
                //   )
                // }
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{}</td>
                    <td>
                      <button
                        id="editBt"
                        value={product.id}
                        onClick={ev => this.toggleEdit(ev)}
                      >
                        Edit
                      </button>
                      <button id="removeBt">Remove</button>
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
//NOTE category name should be added!!

const mapDispatch = dispatch => {
  return {
    update: product => dispatch(thunkUpdateProduct(product))
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
