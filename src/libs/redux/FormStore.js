import { configureStore } from '@reduxjs/toolkit';
import formSlice from './FormSlice.js';

const FormStore = configureStore({
    reducer: {
        select: formSlice,
    },
});

export default FormStore