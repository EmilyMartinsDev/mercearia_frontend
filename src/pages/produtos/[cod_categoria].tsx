import {
Flex,
Heading,

}from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import {useRouter} from 'next/router'
export default function CreateProduct (){
    const {query} = useRouter()

    console.log(query)
    return (
        <>
        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{

    return {
        props:{
         
        }
    }

})
