import {
Flex,
Heading,
Center,
Button,
Select,
Text,
Input,
FormLabel,
Grid, 
GridItem,
Link
}from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { useState, useEffect, FormEvent } from 'react'
import {useRouter} from 'next/router'
import { api } from '../../services/apiClient'
import { setupApiClient } from '../../services/api'
import Router from 'next/router'
type Marcas = {
  marca: {
    cod: string
    nome: string
  }
}



interface CreateProductProps{
    marca:Marcas[]
    cod_categoria: string
}


export default function CreateProduct ({marca, cod_categoria}: CreateProductProps){


    const [name, setName] = useState("")
    const [marcas, setMarcas] = useState(marca[0].marca.cod)
    async function handleProduct(e: FormEvent){
        e.preventDefault()
        try{

            await api.post("/produto", {
                cod_categoria: cod_categoria,
                nome: name,
                cod_marca: marcas
            })
            Router.push("/dashboard")

        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
          <Flex justifyContent='center' alignItems='center' direction='column' bg='background' height='100vh'>
        <Center>
      
            <Heading color='primary' size='2xl' mb={4}>Cadastro de Produto</Heading>
        </Center>
        <Flex direction='column' w={640} >
        <form onSubmit={handleProduct} action="">
        <Input
                mt={4}
                size='md'
                background='gray.100'
                placeholder="Digite o nome do produto"
                type='text'
                variant='filled'
                value={name}
                onChange={e=> setName(e.target.value)}

                />

               <Flex alignItems='baseline'>
               <Select mt={4}  mb={2}  size='md' variant='filled' value={marcas} onChange={e=> setMarcas(e.target.value)}>
                    {marca?.map(m=>(
                        <option key={m?.marca?.cod} value={m?.marca?.cod}>{m?.marca?.nome}</option>
                    ))}
                    
                </Select>
                <Center>  <Link textDecoration='none' whiteSpace='nowrap' ml={2} justifyContent='center' p={2} bg='blue.400'  borderRadius={8} href='/marca'>Nova marca</Link></Center>   
               </Flex>
           
                   
                
              
                        
           
             <Text fontWeight='bold' color='primary' display='flex' justifyContent='center'>Selecione a Marca do produto</Text>
                <Button w='100%' mt={4} type="submit" _hover={{background: "#55efc4"}} fontSize={20} background='primary' color='white' >Cadastrar</Button>
        </form>
        </Flex>
      
        </Flex>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const {params} = ctx
    const cod_categoria = params.cod_categoria

    const api = setupApiClient(ctx)
    try{
        
        const response =await api.get(`/marca/${cod_categoria}`)
        const marcas = response?.data

        console.log(marcas)
        return { 
            props:{
                marca: marcas,
                cod_categoria: cod_categoria
            }
        }
    }catch(err){
        return{
            redirect:{
                destination: "/",
                permanent: false
            }
        }
    }
   

})
