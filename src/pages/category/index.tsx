import Head from "next/head"
import {
Flex,
Center,
Heading,
Input,
Button,
Select,
}from '@chakra-ui/react'

import { AuthContext } from "../../context/AuthContext"
import { useContext, useState, useEffect, FormEvent } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"

import { Sidebar } from "../../components/Sidebar"
import { api } from "../../services/apiClient"
import Router  from "next/router"


export default function Fornecedores(){
    const {signUp, user} = useContext(AuthContext)

    const [name, setName] = useState("")


    async function handleRegister(e: FormEvent){
        e.preventDefault()

        try{
            if(name== ''){
                return
            }
            await api.post("/categoria", {
                nome: name
            })

            alert("cadastrado com sucesso")
            setName("")
        }catch(err){
            console.log(err)
        }
    }



    useEffect(()=>{

        if(user?.cargo !== 'admin'){
            return;
        }
    }, [user])
      
    return (
        
        <>
        <Head>
        <title>Tipo Produto - mercaPop</title>
        </Head>
        <Sidebar>
        <Flex justifyContent='center' alignItems='center' direction='column' bg='background' height='100vh'>
        <Center>
      
            <Heading color='primary' size='2xl' mb={4}>Cadastro de Tipos</Heading>
        </Center>
        <Flex direction='column' w={640} >
        <form onSubmit={handleRegister} action="">
        <Input
                mt={4}
                size='md'
                background='gray.100'
                placeholder="Digite o nome do tipo de produto:"
                type='text'
                variant='filled'
                value={name}
                onChange={e=> setName(e.target.value)}

                />
                <Button w='100%' mt={4} type="submit" _hover={{background: "#55efc4"}} fontSize={20} background='primary' color='white' >Cadastrar</Button>
        </form>
        </Flex>
      
        </Flex>
        </Sidebar>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async(ctx)=>{
    return{
        props:{

        }
    }
})