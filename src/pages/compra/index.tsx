import * as S from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupApiClient } from '../../services/api'
import { FormEvent, useState } from 'react'
import Link from 'next/link'


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

export default function Compra({ fornecedores}:CompraProps){
    const [fornecedor, setFornecedor] = useState(fornecedores[0].cod)
    return (
        <>
        <S.Flex mt={4} h='100vh' alignItems='center' justifyContent='center'>
        
            
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
                <Link href={`/compra/${fornecedor}`}>Prosseguir</Link>  
                </S.Box>
                      
            </S.Center> 
        
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