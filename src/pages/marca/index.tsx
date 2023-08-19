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
import { setupApiClient } from "../../services/api"


interface categorias {
    categorias: [
        {cod: string,
            nome: string}
    ]
}


export default function Marcas({categorias} :categorias){
    const {signUp, user} = useContext(AuthContext)

    const [name, setName] = useState("")
    const[category, setCategory] = useState("")

    async function handleRegister(e: FormEvent){
        e.preventDefault()

        try{
            if(name== ''){
                return
            }
            const response = await api.post("/marca", {
                nome: name
            })
            await api.post(`/marca/categoria`, {
                cod_marca: response?.data?.cod,
                cod_categoria: category
            })
            alert("cadastrado com sucesso")
            setName("")
            setCategory('')
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
      
            <Heading color='primary' size='2xl' mb={4}>Cadastro de Marca</Heading>
        </Center>
        <Flex direction='column' w={640} >
        <form onSubmit={handleRegister} action="">
        <Input
                mt={4}
                size='md'
                background='gray.100'
                placeholder="Digite o nome da marca:"
                type='text'
                variant='filled'
                value={name}
                onChange={e=> setName(e.target.value)}

                />


                <Select size='md' variant='filled' value={category} onChange={e=> setCategory(e.target.value)}>
                  {categorias?.map((c)=>(
                    <option value={c?.cod} key={c?.cod}>{c?.nome}</option>
                  ))}
                </Select>       
                <Button w='100%' mt={4} type="submit" _hover={{background: "#55efc4"}} fontSize={20} background='primary' color='white' >Cadastrar</Button>
        </form>
        </Flex>
      
        </Flex>
        </Sidebar>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const api = setupApiClient(ctx)

try{
    const categories = await api.get("/categoria")
    return{
        props:{
            categorias : categories?.data
        }
    }
}catch(err){
    console.log(err)

    return{
        redirect:{
            destination: "/dashboard",
            permanent: false
        }
    }
}
})