import Head from "next/head"
import {
Flex,
Center,
Heading,
Input,
Button,
Select

}from '@chakra-ui/react'

import { AuthContext } from "../../context/AuthContext"
import { useContext, useState, useEffect, FormEvent } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"




export default function Funcionarios(){
    const {signUp, user} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [cargo, setCargo] = useState("")

    async function handleRegister(e: FormEvent){
        e.preventDefault()

        try{
            if(name== '' &&  email=='' &&  password=='' && cargo==''){
                return
            }
            await signUp({cargo : cargo, email: email, name: name,  password : password})


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
        <title>Funcionarios - mercaPop</title>
        </Head>
        <Flex justifyContent='center' alignItems='center' direction='column' bg='background' height='100vh'>
        <Center>
      
            <Heading color='primary' size='2xl' mb={4}>Cadastro de Funcionários</Heading>
        </Center>
        <Flex direction='column' w={640} >
        <form onSubmit={handleRegister} action="">
        <Input
                mt={4}
                size='md'
                background='gray.100'
                placeholder="Digite seu nome"
                type='text'
                variant='filled'
                value={name}
                onChange={e=> setName(e.target.value)}

                />

            <Input
                mt={4}
                size='md'
                background='gray.100'
                placeholder="Digite seu email"
                type='email'
                variant='filled'
                value={email}
                onChange={e=> setEmail(e.target.value)}

                />
                <Input
                size='md'
                mt={4}
                mb={4}
                type="password"
                background='gray.100'
                placeholder="Digite sua senha"
                variant='filled'
                value={password}
                onChange={e=> setPassword(e.target.value)}
                />
                <Select size='md' variant='filled' value={cargo} onChange={e=> setCargo(e.target.value)}>
                    <option value="admin">Administrador</option>
                    <option value="caixa">Caixa (funcionario) </option>
                </Select>

                <Button w='100%' mt={4} type="submit" _hover={{background: "#55efc4"}} fontSize={20} background='primary' color='white' >Cadastrar</Button>
        </form>
        </Flex>
      
        </Flex>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async(ctx)=>{
    return{
        props:{

        }
    }
})