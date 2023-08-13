import { ReactNode } from "react";
import {
    Box,
    IconButton,
    Flex,
    Icon,
    CloseButton,
    useColorModeValue,
    Text,
    useDisclosure,
    FlexProps,
    BoxProps,
    Drawer,
    DrawerContent,
    Heading,
    Center

}from '@chakra-ui/react'
import {FaCashRegister} from 'react-icons/fa'
import {IconType} from 'react-icons'
import Link from "next/link";

export const Sidebar = ()=>{
    return (
        <Box minH='100vh' background='gray.200' >

        </Box>
    )
}

interface Links  {
    name: string
    route: string
    icon: IconType
}

interface SidebarProps extends BoxProps{
    onClose: ()=> void
    LinkItens: Array<Links>
}

const SidebarContent = ({onClose, LinkItens,...rest}: SidebarProps)=>{
 return (
    <Box
    bg='gray.200'
    w={{base: "full", md: 60}}
    position='fixed'
    h='full'
    {...rest}
    >
    <Flex alignItems='center' h='20' justifyContent='space-between' mx='8'>
       <Flex>
       <Link href='/dashboard'>
        <Center cursor='pointer' mb={4}>
            <Heading color='primary' size='3xl'>MercaPOP</Heading>
        </Center>
        <CloseButton display={{base: 'flex', md: 'none' }} onClick={onClose}/>
        </Link>
       </Flex>
   </Flex>    
    {LinkItens.map(l=>(
            <NavBarItem icon={l.icon} route={l.route} key={l.name}>{l.name}</NavBarItem>
    ))}

    </Box>
 )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: ReactNode
    route: string
}

const NavBarItem = ({icon, children, route}:NavItemProps)=>{
    return (
        <Link href={route} style={{textDecoration: 'none'}}>

        <Flex
        alignItems='center'
        p={4}
        mx={4}
        borderRadius='lg'
        role='group'
        cursor='poiner'
        >
         {icon && (
            <Icon
            mr={4}
            fontSize='16'
            as={icon}
            />
            
         )}   
         {children}
        </Flex>

        </Link>
    )
}