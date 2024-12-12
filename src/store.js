import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// 配置 Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer, // cart 切片的 reducer
    },
});

// 导出配置好的 store
export default store;
