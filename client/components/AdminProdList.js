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
      category: '',
      id: ''
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateProd = this.updateProd.bind(this)
  }
  toggleEdit(ev) {
    const {products} = this.props
    const currProd = products.find(product => product.id === ev.target.value)
    this.setState({
      isEditing: !this.state.isEditing,
      name: currProd.name,
      description: currProd.description,
      price: currProd.price,
      category: currProd.category,
      id: currProd.id
    })
  }
  async updateProd() {
    try {
      await this.props.update({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        category: this.state.category,
        id: this.state.id
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {products} = this.props
    const {updateProd} = this
    console.log(this.state)
    return (
      <div id="prodListWrapper">
        <table>
          <thead id="header">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(product => {
                if (this.state.isEditing) {
                  return (
                    // <form>
                    //   <input>{product.name}</input>
                    //   <input>{product.description}</input>
                    //   <input>${product.price}</input>
                    //   <input>{product.category}</input>
                    //   <button id='editBt' onClick={updateProd}>Save</button><button id='removeBt'>Remove</button>
                    // </form>
                    <tr key={product.id} id="editableRow">
                      <td contentEditable="true">{product.name}</td>
                      <td contentEditable="true">{product.description}</td>
                      <td contentEditable="true">${product.price}</td>
                      <td contentEditable="true">{product.category}</td>
                      <td>
                        <button id="editBt" onClick={updateProd}>
                          Save
                        </button>
                        <button id="removeBt">Remove</button>
                      </td>
                    </tr>
                  )
                }
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
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
const mapState = ({products}, ownprops) => {
  return {
    products,
    ownprops
  }
}
export default connect(mapState, mapDispatch)(AdminProdList)
