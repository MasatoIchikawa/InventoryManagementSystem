import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './AccountSlice.js';

const AccountStore = configureStore({
    reducer: {
        account: accountSlice,
    },
});

export default AccountStore