import Head from "next/head";
import { 
Card,
CardHeader, 
CardBody, 
Flex,
Heading,
Grid,
GridItem,
 Box,
 } from '@chakra-ui/react'
import { useContext } from "react"; 
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";
 import {FaDonate , FaCartPlus, FaUsers, FaTruckMoving, FaUserAlt, FaRegFileAlt} from 'react-icons/fa'
 import {FiPackage} from 'react-icons/fi'
import { canSSRAuth } from "../../utils/canSSRAuth";
export default function Dashboard(){
    
    const {user} = useContext(AuthContext)
    console.log(user?.cargo)
    return (
        <>
        <Head>
            <title>Dashboard - mercatop</title>
        </Head>
        <Flex justifyContent='center' alignItems='center' h='100vh'> 
        <Grid gridTemplateColumns='repeat(4, 1fr)' gap={8}>
            <GridItem >
              <Link href='/venda'>
              <Card bg='gray.200'>
                    <CardHeader>
                        <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                            <FaDonate size={100}></FaDonate>
                        </Flex>
                    </CardHeader>
                    <CardBody display='flex' justifyContent='center'>
                        <Heading size='md'>Venda</Heading>
                    </CardBody>
                </Card>             
              </Link>
            </GridItem>
            {user.cargo === 'admin' && (
                  <GridItem >
                  <Link href='/compra'>
                  <Card bg='gray.200'>
                        <CardHeader>
                            <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                                <FaCartPlus size={100}></FaCartPlus>
                            </Flex>
                        </CardHeader>
                        <CardBody display='flex' justifyContent='center'>
                            <Heading size='md'>Compra</Heading>
                        </CardBody>
                    </Card>             
                  </Link>
                </GridItem>
            )}
            {user?.cargo === 'admin' && (
                    <GridItem >
                    <Link href='/produtos'>
                    <Card bg='gray.200'>
                          <CardHeader>
                              <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                                  <FiPackage size={100}></FiPackage>
                              </Flex>
                          </CardHeader>
                          <CardBody display='flex' justifyContent='center'>
                              <Heading size='md'>Produtos</Heading>
                          </CardBody>
                      </Card>             
                    </Link>
                  </GridItem>
            )}
            <GridItem >
              <Link href='/clientes'>
              <Card bg='gray.200'>
                    <CardHeader>
                        <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                            <FaUsers size={100}></FaUsers>
                        </Flex>
                    </CardHeader>
                    <CardBody display='flex' justifyContent='center'>
                        <Heading size='md'>Clientes</Heading>
                    </CardBody>
                </Card>             
              </Link>
            </GridItem>
            {user?.cargo === 'admin' && (
                       <GridItem >
                       <Link href='/fornecedores'>
                       <Card bg='gray.200'>
                        <CardHeader>
                        <   Flex h={100} w={200} justifyContent='center' alignItems='center'>
                                <FaTruckMoving size={100}></FaTruckMoving>
                            </Flex>
                        </CardHeader>
                        <CardBody display='flex' justifyContent='center'>
                            <Heading size='md'>Fornecedores</Heading>
                        </CardBody>
                    </Card>             
                </Link>
            </GridItem>
            )}
        {user?.cargo === 'admin' && (
                   <GridItem >
                   <Link href='/funcionarios'>
                   <Card bg='gray.200'>
                         <CardHeader>
                             <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                                 <FaUserAlt size={100}></FaUserAlt>
                             </Flex>
                         </CardHeader>
                         <CardBody display='flex' justifyContent='center'>
                             <Heading size='md'>funcionarios</Heading>
                         </CardBody>
                     </Card>             
                   </Link>
                 </GridItem>
        )}
            <GridItem >
              <Link href='/relatorio'>
              <Card bg='gray.200'>
                    <CardHeader>
                        <Flex h={100} w={200} justifyContent='center' alignItems='center'>
                            <FaRegFileAlt size={100}></FaRegFileAlt>
                        </Flex>
                    </CardHeader>
                    <CardBody display='flex' justifyContent='center'>
                        <Heading size='md'>Relatorio</Heading>
                    </CardBody>
                </Card>             
              </Link>
            </GridItem>
        </Grid>
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