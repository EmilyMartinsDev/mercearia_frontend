import { FormEvent, useState } from "react"
import { setupApiClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"
import * as S from '@chakra-ui/react'
import { api } from "../../services/apiClient"

type Item ={
       item: [{
        cod: string,
        qt_produto: string,
        cod_compra: string,
        cod_produto: string,
        vl_total_item: string
        produto:{
        nome: string
}}]
}


type Produto = {
    cod: string,
    nome: string,
    qt_estoque: number,
    categoria: {
      cod: string,
      nome: string,
      data_criacao: string,
      data_uptade: string
    }
}

type InstanciaProps = {
    produtos: Produto[]
  fornecedor: string
}

export default function InstanciaCompra({produtos, fornecedor}: InstanciaProps){
    const [produto, setProduto] = useState(produtos[0].cod)
    const [vl_compra, setVl_compra] = useState('')
    const [vl_venda, setVl_venda] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const[item, setItem] = useState<Item>()
  
    async function handleItem(e: FormEvent) {
            e.preventDefault()
          
    }

    return (
        <>
        <S.Grid gridTemplateColumns='3fr 9fr' p={4} mt={4} h='100vh' alignItems='center' gap={ 12} justifyContent='space betwwen'>
        
            
    <S.GridItem>
    <S.Center flexDirection='column'>
        <form action="" onSubmit={handleItem}>
        <S.FormLabel w='100%'>
            <S.Text textAlign='center' fontSize='lg'> Selecione o produto:</S.Text>
            <S.Select value={produto} onChange={e=> setProduto(e.target.value)} size='lg'>
                {produtos?.map(f=>(
                    <option key={f?.cod} value={f?.cod}>{f?.nome}</option>
                ))}
            </S.Select>
            </S.FormLabel>

            <S.FormLabel w='100%'  my={8}>
            <S.Text textAlign='center' fontSize='lg' > Selecione a quantidade:</S.Text>
                <S.Input type='number ' value={quantidade} onChange={e=> setQuantidade(e.target.value)}/>
            </S.FormLabel>        
           
                <S.FormLabel w='100%'>
            <S.Text textAlign='center' fontSize='lg'> digite o preço unitário:</S.Text>
                <S.Input type='number'  value={vl_compra} onChange={e=> setVl_compra(e.target.value)}/>
            </S.FormLabel> 
            <S.FormLabel w='100%'>
            <S.Text textAlign='center' fontSize='lg' mt={8}> digite o preço de venda do produto:</S.Text>
                <S.Input type='number'  value={vl_venda} onChange={e=> setVl_venda(e.target.value)}/>
            </S.FormLabel> 
            <S.Button bg='blue.400' _hover={{background: "blue.200", color: "blue.900"}}  color='white' type="submit">Adicionar produto ao espaço compra</S.Button>    
        </form>        
        </S.Center> 
    </S.GridItem>
    <S.GridItem>
             
    <S.Center flexDirection='column' bg='background' height='100vh'>
          {item?.item?.map(i=>(
            <S.Flex maxH={64} key={i.cod}>
                <S.Box>{i?.produto?.nome}</S.Box>
                <S.Box>{i?.vl_total_item}</S.Box>
                <S.Box>{i?.qt_produto}</S.Box>
            </S.Flex>
          ))}    
    </S.Center>
    </S.GridItem>
    </S.Grid>
        
        
        </>
    )
}
export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const {params} = ctx
    const cod_fornecedor = params.cod_fornecedor
    
    const api = setupApiClient(ctx)

    try{
        const produtos =  await api.get("/estoque")
        console.log(produtos?.data)  
        return{
            props:{
            
                produtos: produtos?.data,
                fornecedor: cod_fornecedor 
            }
        }
    }catch{
        return{
            redirect:{
                destination: "/",
                permanent: false
    
            }
        }
    }

  
})
