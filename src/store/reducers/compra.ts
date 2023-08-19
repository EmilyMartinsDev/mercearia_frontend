import {PayloadAction, createSlice} from '@reduxjs/toolkit'

type Items = {
cod_produto: string
qt_produto : string
vl_venda?: number
vl_compra?: number
}

type Compra = {
    items: Items[]
    fornecedor?: string
}

const initialState: Compra = {
    items: [],
    fornecedor: ''
}
const compra = createSlice({
    name: 'compra',
    initialState,
    reducers: {
        add: (state, action:PayloadAction<Items>)=>{
            if (state.items.find((p) => p.cod_produto === action.payload.cod_produto)) {
                return
              }
              state.items.push(action.payload)
        },
        fornecedorADD:(state,action:PayloadAction<string> )=>{
            if(state.fornecedor === action.payload){
                return
            }
            state.fornecedor = action.payload

        }
    }
})
export default compra.reducer
export const {add, fornecedorADD} = compra.actions