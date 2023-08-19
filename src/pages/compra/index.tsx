import * as S from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupApiClient } from '../../services/api'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { api } from '../../services/apiClient'
import { useDispatch } from 'react-redux'
import {  fornecedorADD } from '../../store/reducers/compra'
import Router from 'next/router'
interface CompraProps{

fornecedores: [
    {
        cod: string,
        nome: string,
        email:string,
        fone: string
      }
]
}

interface Compra{
    cod: string,
    vl_total: number,
    fornecedor: {
            nome: string,
            cod: string
    }
}

export default function Compra({ fornecedores}:CompraProps){
    const [fornecedor, setFornecedor] = useState(fornecedores[0].cod)
    const [compra, setCompra] = useState<Compra>()
    const dispatch = useDispatch()
    return (
        <>
        <S.Flex mt={4} h='100vh' alignItems='center' justifyContent='center'>
            <form action="">
                
            
            <S.Center flexDirection='column'  >
                <S.FormLabel w='100%'>
                <S.Text textAlign='center' fontSize='3xl' mb={8}> Selecione o Fornecedor:</S.Text>
                <S.Select value={fornecedor} onChange={e=> setFornecedor(e.target.value)} size='lg'>
                    {fornecedores?.map(f=>(
                        <option key={f?.cod} value={f?.cod}>{f?.nome}</option>
                    ))}
                </S.Select>
                </S.FormLabel>

                <S.Box color='white' fontSize='2xl' p={3} textDecoration='none'outline='none' display='flex' w='100%' justifyContent='center' mt={6} borderRadius={8} bg='blue.400'>
                <S.Button onSubmit={(r)=>{
                    r.preventDefault()
                   
                }} >
                    <Link href={`/newCompra`}></Link>
                    Prosseguir</S.Button >  
                </S.Box>
                      
            </S.Center> 
            </form>
        
        </S.Flex>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const api = setupApiClient(ctx)
    const produtosCadastrados = await api.get("/estoque")
    const fornecedores = await api.get("/fornecedor")
    console.log(fornecedores?.data)
    return{
        props:{
          
            fornecedores: fornecedores?.data
        }
    }
})