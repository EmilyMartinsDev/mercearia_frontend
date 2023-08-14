import Head from "next/head"
import {
Flex,
Center,
Heading,
Text,
Link,
Input
}from '@chakra-ui/react'

import { AuthContext } from "../../context/AuthContext"
import { useContext, useState, useEffect, FormEvent } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"

import { Sidebar } from "../../components/Sidebar"
import { setupApiClient } from "../../services/api"



interface CategoryProps{
    cod: string
    nome: string
}

interface Category{
    category: CategoryProps[]
}


export default function Produtos({category}: Category){
    const {signUp, user} = useContext(AuthContext)
    const [find, setFind] = useState("")

    function pesquisaContatos() {
        let filtrados = category
         if(find != undefined){
          filtrados = filtrados.filter(
            (c) => c.nome.toLowerCase().search(find.toLowerCase() || '') >= 0
          )
          return filtrados
        } else {
          return category
        }
      }

    useEffect(()=>{

        if(user?.cargo !== 'admin'){
            return;
        }
    }, [user])
      console.log()
    return (
        
        <>
        <Head>
        <title>Produtos - mercaPop</title>
        </Head>
        <Flex justifyContent='center' alignItems='center' direction='column' bg='background' height='100vh'>
        <Flex mb={10} justifyContent='center' alignItems='center' direction='column'>
      
            <Heading color='blue.400' size='xl' >Selecione o tipo de produto</Heading>
            <Input
            value={find}
            onChange={e=> setFind(e.target.value)}
            mt={4} type="text" bg='gray.300' w='100%' maxW={640}  placeholder="O que deseja procurar?"/>
        </Flex>
        <Flex direction='column' w='100%' maxW={640} maxH={400} overflowY='scroll' >
        {pesquisaContatos()?.map(c=> (
          
           <Flex key={c?.cod} mb={4 }   bg='primary' p={4} color='white' cursor='pointer'>
             <Link 
              textTransform='uppercase'
               href={`/produtos/${c?.cod}`}>
                <Text>{c?.nome}</Text>
            </Link>
           </Flex>
            
        ))}
         </Flex>
        <Flex alignItems='center' mt={8} justifyContent='center'>
        <Link bg='blue.400' size='lg' p={4} fontSize={18} style={{textDecoration: 'none'}} fontWeight='bold' textAlign='center'  borderRadius={4} width='100%' href='/category'>Cadastrar novo Tipo</Link>
        </Flex>
       
        
    </Flex>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async(ctx)=>{
    try{
        const api = setupApiClient(ctx)
        const response = await api.get("/categoria")
        

    return{
        props:{
            category: response?.data
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