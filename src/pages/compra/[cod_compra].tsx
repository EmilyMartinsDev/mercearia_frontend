import * as S from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupApiClient } from '../../services/api'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { api } from '../../services/apiClient'
import Router, {useRouter} from 'next/router'

interface CompraProps{

fornecedores: [
    {
        cod: string,
        nome: string,
        email:string,
        fone: string
      }
],

produtos: Produto[],

}

type Produto = {
    cod: string,
    nome: string,
    qt_estoque: number, 
    categoria: string 
}

type item = {
   cod: string,
   produto: {
    nome: string,
   },
   qt_produto: number,
   vl_total_item: number
}
export default function Compra({ fornecedores, produtos}:CompraProps){
    const [fornecedor, setFornecedor] = useState(fornecedores[0]?.cod)
    const [produto, setProduto] = useState<string>(produtos[0]?.cod)
    const [item, setItem] = useState<item[]>([])
    const [quantidade, setquantidade] = useState("")
    const [valorCompra, setvalorCompra] = useState("")
    const [valorVenda, setvalorVenda] = useState("")

    const {query} = useRouter()
    const cod_compra = query.cod_compra

    const handleItemCompra = async(e:FormEvent)=>{
        e.preventDefault()
        try{
            const itemResposne = await api.post(`/compra/add`, {
             cod_compra: cod_compra,   cod_produto : produto, qt_produto: Number(quantidade), vl_produto_compra: Number(valorCompra),
            })
            console.log(itemResposne?.data)
            setItem([...item, itemResposne?.data])
        }catch(err){
            console.log(err)
        }

    }
    return (
        <>
        <S.Flex mt={4} h='100vh' alignItems='center' justifyContent='center'>
            <form action="" onSubmit={handleItemCompra}>
                
            <S.Grid gridTemplateColumns='1fr 2fr' gap={10} w='100%' maxW='1024px'>
                <S.GridItem>
                <S.FormLabel w='100%'  mt={6} mb={4}>
                <S.Text textAlign='center' fontSize='lg'> Selecione o Fornecedor:</S.Text>
                <S.Select value={fornecedor} disabled={item[0] !== undefined} onChange={e=> setFornecedor(e.target.value)} size='lg'>
                    {fornecedores?.map(f=>(
                        <option key={f?.cod} value={f?.cod}>{f?.nome}</option>
                    ))}
                </S.Select>

                </S.FormLabel>
                <S.FormLabel w='100%' mt={6} mb={4}>
                <S.Text textAlign='center' fontSize='lg'> Selecione o produto:</S.Text>
                <S.Select value={produto} onChange={e=> setProduto(e.target.value)} size='lg'>
                    {produtos?.map(f=>(
                        <option key={f?.cod} value={f?.cod}>{f?.nome}</option>
                    ))}
                </S.Select>                   
             </S.FormLabel>

            <S.Input 
            mt={6} mb={4}
            placeholder='digite a quantidade'
            type='text'
            value={quantidade}
            onChange={(e)=> setquantidade(e.target.value)}
            />
            <S.Input 
            mt={6} mb={4}
            placeholder='digite o valor de compra (unitário)'
            type='text'
            value={valorCompra}
            onChange={(e)=> setvalorCompra(e.target.value)}
            />

            <S.Input 
           mt={6} mb={4}
            placeholder='digite o valor que será vendido (unitário)'
            type='text'
            value={valorVenda}
            onChange={(e)=> setvalorVenda(e.target.value)}
            />
              <S.Button type='submit'justifyContent='center' alignItems='center' display='flex' bg='blue.400' color='white'>Adicionar produto</S.Button>
                </S.GridItem>
                <S.GridItem>
                    <S.Flex height='100%' bg='gray.300' flexDirection='column' whiteSpace='nowrap' p={8} rounded={10} >
                    {item?.map(i=>(
                        <S.Flex p={5} rounded={8} key={i?.cod} bg='white' gap='10'  w='100%' maxH='50px' mt={4}>
                          <S.Box display='flex' alignItems='center' justifyContent='space-between'><S.Text fontWeight='semibold' mr={4}>Produto: </S.Text> {i?.produto?.nome}</S.Box>    
                          <S.Box display='flex' alignItems='center' justifyContent='space-between'><S.Text fontWeight='semibold' mr={4}>Valor total: </S.Text> {i?.vl_total_item}</S.Box>      
                          <S.Box display='flex' alignItems='center' justifyContent='space-between'> <S.Text fontWeight='semibold' mr={4}>quantidade: </S.Text> {i?.qt_produto}</S.Box>    
                        </S.Flex>
                    ))

                    }
                    </S.Flex>
                </S.GridItem>
            </S.Grid>

          
            </form>
        
        </S.Flex>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const api = setupApiClient(ctx)
 
   try{

    const produtosCadastrados = await api.get("/estoque")
    const fornecedores = await api.get("/fornecedor")
    console.log(produtosCadastrados?.data)
    return{
        props:{
            produtos: produtosCadastrados?.data,
            fornecedores: fornecedores?.data
        }
    }
   }catch(err){
    return {
        redirect:{
            destination: "/dashboard",
            permanent: false
        }
    }
   }
})