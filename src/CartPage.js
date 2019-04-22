import React from 'react'
import PropTypes from 'prop-types'
import './CartPage.css'

import Item from './Item'

function CartPage({ items, onAddOne, onRemoveOne, orderTotal }) {
    return items.length ? (
        <ul className="CartPage-items">
            {items.map(item => (
                <li key={item.id} className="CartPage-item">
                    <Item item={item}>
                        <div className="CartItem-controls">
                            <button
                                className="CartItem-removeOne"
                                onClick={() => onRemoveOne(item)}>&ndash;</button>
                            <span className="CartItem-count">{item.count}</span>
                            <button 
                            className="CartItem-addOne"
                            onClick={() => onAddOne(item)}>+</button>
                        </div>
                    </Item>
                </li>
            ))}
            <li className="CartPage-total">
                Total: ${orderTotal}
            </li>
        </ul>
    ) : (
        <div className="CartPage-empty-cart">
            <span>Your cart is empty.</span>
            <span>Why not add some expensive products?</span>
        </div>
    )
}

CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    orderTotal: PropTypes.number.isRequired,
    onAddOne: PropTypes.func.isRequired,
    onRemoveOne: PropTypes.func.isRequired
}

export default CartPage