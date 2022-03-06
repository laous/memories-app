import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import { store } from '../store'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (

    <SessionProvider session={session}>
      <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Provider>

    </SessionProvider>
  )
}