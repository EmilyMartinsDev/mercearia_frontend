
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'

const colors = {
  primary: "#00b894",
  background: "#dfe6e9"
}

const theme = extendTheme({colors})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
