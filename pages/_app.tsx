import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useEffect } from 'react';
import { useApollo } from '../src/apolloClient';
import theme from '../src/theme';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles?.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}