import React from 'react'
import PropTypes from 'prop-types'

const Nav = ({ activeTab, onTabChange, cartQuantity, cartTotal }) => (
    <nav className="App-nav">
        <ul>
            <li className={`App-nav-item ${activeTab === 0 && 'selected'}`}>
                <NavLink index={0} onClick={onTabChange}>Items</NavLink>
            </li>
            <li className={`App-nav-item ${activeTab === 1 && 'selected'}`}>
                <NavLink index={1} onClick={onTabChange}>Cart</NavLink>
            </li>

            { cartQuantity !== 0 && 
            <li className='App-nav-item cart'>
                <NavLink index={1} onClick={onTabChange}>
                    <i className="fas fa-shopping-cart"></i>&nbsp;
                    { cartQuantity } items
                    (${ cartTotal })
                </NavLink>
            </li> }

        </ul>
    </nav>
)

Nav.propTypes = {
    activeTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
    cartQuantity: PropTypes.number.isRequired,
    cartTotal: PropTypes.number.isRequired
}

class NavLink extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.index)
    }

    render() {
        return (
            <a onClick={this.handleClick}>
                { this.props.children }
            </a>
        )
    }
}

export default Nav