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

import {FiMenu} from 'react-icons/fi'
import {IconType} from 'react-icons'
import Link from "next/link";
export const Sidebar = ({children, LinkItens}: {children: ReactNode, LinkItens?: Array<Links>})=>{
    const {isOpen, onClose, onOpen} = useDisclosure()

    return (
        <Box minH='100vh' background='gray.200' >
            <SidebarContent
            LinkItens={LinkItens}
            onClose={()=>onClose}
            display={{ base: 'none', md: 'block'}}
           p={4}
            />
            <Drawer
             onClose={()=> onClose}
            autoFocus={false}
            isOpen={isOpen}
            placement="right"
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size='full'

            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} LinkItens={LinkItens}/>
                </DrawerContent>
            </Drawer>

            <MobileNav display={{base: 'flex' , md: 'none'}} onOpen={onOpen}/>
            <Box
            ml={{base: 0, md: 60}}
            >
                {children}
            </Box>
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
    LinkItens?: Array<Links>
}

const SidebarContent = ({onClose,LinkItens,...rest}: SidebarProps)=>{
 return (
    <Box
    bg='gray.300'
    w={{base: "full", md: 60}}
    position='fixed'
    h='full'
    {...rest}
    >
    <Flex alignItems='center' h='20' justifyContent='space-between' mx='8'>
       <Flex >
       <Link href='/dashboard'>
        <Center cursor='pointer' mb={4}>
            <Heading color='primary' size='lg'>MercaPOP</Heading>
        </Center>
       
        </Link>
         <CloseButton mr='auto' display={{base: 'flex', md: 'none' }} onClick={onClose}/>
       </Flex>
   </Flex>   
    {LinkItens?.map(l=>(
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
        fontWeight='bold'
        borderRadius='lg'
        role='group'
        cursor='poiner'
        >
         {icon && (
            <Icon
            mr={4}
            fontSize='18'
            as={icon}
            />
            
         )}   
         {children}
        </Flex>

        </Link>
    )
}

interface MobileProps extends FlexProps{
    onOpen: ()=> void
}

const MobileNav = ({onOpen, ...rest}: MobileProps)=>{
    return (
        <Flex
        ml={{base: 0, md:60 }}
        px={{base: 4 , md: 24}}
        height='20'
        alignItems='center'
        bg='gray.400'
        borderBottomWidth='1px'
        justifyContent='flex-start'
        {...rest}
        >
        <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu/>}
        />
        </Flex>
    )
}