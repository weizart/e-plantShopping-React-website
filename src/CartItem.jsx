import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 计算购物车中所有商品的总金额
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  // 继续购物
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // 结账功能
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 增加商品数量
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // 减少商品数量
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      // 如果数量为1，则移除商品
      dispatch(removeItem(item.name));
    } else {
      // 否则减少数量
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    }
  };

  // 移除商品
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 计算单个商品的总成本
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  // 计算购物车中的总商品数量
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>购物车总金额: ${calculateTotalAmount()}</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">单价: {item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">小计: ${calculateTotalCost(item)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total-items">商品总数: {calculateTotalItems()}</div>
        <div className="cart-total-amount">总金额: ${calculateTotalAmount()}</div>
      </div>
      <div className="cart-actions">
        <button 
          className="continue-shopping-button" 
          onClick={handleContinueShopping}
        >
          继续购物
        </button>
        <button 
          className="checkout-button" 
          onClick={handleCheckoutShopping}
        >
          结账
        </button>
      </div>
    </div>
  );
};

export default CartItem;


