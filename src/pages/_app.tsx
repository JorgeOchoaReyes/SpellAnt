import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import "../../styles.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider resetCSS theme={theme}>
              <Box bg='#cbcdd4'>
                <Component {...pageProps} />
              </Box>
      </ChakraProvider>
  )
}

export default MyApp
