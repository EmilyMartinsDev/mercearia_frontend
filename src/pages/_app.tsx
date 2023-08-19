
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { Provider } from 'react-redux'
import { store } from '../store'
const colors = {
  primary: "#00b894",
  background: "#dfe6e9"
}

const theme = extendTheme({colors})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
