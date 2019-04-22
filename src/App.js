import React from 'react';
import Nav from './Nav'
import './App.css';
import ItemPage from './ItemPage'
import CartPage from './CartPage'
import {items} from './static-data'

export default class App extends React.Component {
  state = {
    activeTab: 0,
    cart: [],
    cartQuantity: 0,
    cartTotal: 0
  }

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    })
  }

  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id]
    }, this.calculateCartTotals)
    console.log('added')
  }

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id)
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    }, this.calculateCartTotals)
    console.log('removed')
  }

  calculateCartTotals = () => {
    console.log('calculated')
    this.setState({      
      cartQuantity: this.cartItemDetail().reduce((total, item) => {
        return total += item.count
      }, 0),
      cartTotal: this.cartItemDetail().reduce((total, item) => {
        return total += parseFloat((item.count * item.price).toFixed(2))
      }, 0)
    })
  }

  cartItemDetail = () => {
    let itemCounts = this.state.cart.reduce((itemCounts, id) => {
      itemCounts[id] = itemCounts[id] || 0
      itemCounts[id]++
      return itemCounts
    }, {})

    return Object.keys(itemCounts).map(id => {
      var item = items.find(item => item.id === parseInt(id, 10))
      return {
        ...item,
        count: itemCounts[id]
      }
    })
  }

  renderContent() {
    switch(this.state.activeTab) {
      default:
      case 0: 
        return <ItemPage 
          items={items} 
          onAddToCart={this.handleAddToCart} />
      case 1:
        return <CartPage 
            items={this.cartItemDetail()}
            orderTotal={this.state.cartTotal}
            onAddOne={this.handleAddToCart}
            onRemoveOne={this.handleRemoveOne} />
    }
  }

  render() {
    return (
      <div className="App">
        <Nav 
          activeTab={this.state.activeTab} 
          onTabChange={this.handleTabChange}
          cartQuantity={this.state.cartQuantity}
          cartTotal={this.state.cartTotal} />
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    )
  }
}