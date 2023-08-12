import Head from "next/head";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
Flex,
Center,
Input,
Heading,
Button
} from '@chakra-ui/react'


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const {signIn} = useContext(AuthContext)

    async function handleLogin(){
        try{

            await signIn({email, password})

        }catch(err){
            console.log(err.response.data)
        }
    }


    return (
        <>
        <Head>
            <title>Registre - se</title>
        </Head>

        <Flex background='background' height='100vh' alignItems='center' justifyContent='center'>
            <Flex width={640} direction='column' p={14} rounded={8}>
                <Center mb={4}>
                    <Heading color='primary' size='3xl'>MercaPOP</Heading>
                </Center>
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
                <Button onClick={handleLogin} _hover={{background: "#55efc4"}} fontSize={20} background='primary' color='white' mt={2}>Acessar</Button>
            </Flex>
        </Flex>
        </>
    )
}