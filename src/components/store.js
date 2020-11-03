import { configureStore } from '@reduxjs/toolkit';
import constantsReducer from './constants/constantsSlice';
import predicatesReducer from './predicates/predicatesSlice';
import formulasReducer from './formulas/formulasSlice';

export default configureStore({
  reducer: {
    constants: constantsReducer,
    predicates: predicatesReducer,
    formulas: formulasReducer
  }
});
