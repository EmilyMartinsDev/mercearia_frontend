import  {configureStore} from '@reduxjs/toolkit'
import compraReducer from './reducers/compra'
export const store = configureStore({
    reducer:{
        compra: compraReducer
    }
})

export type RootRedux = ReturnType<typeof store.getState>