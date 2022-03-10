import { ApolloProvider } from '@apollo/client';
import { CssBaseline, LinearProgress, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { DefaultSeo } from "next-seo";
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SEO from "../next-seo.config";
import { useApollo } from '../src/apolloClient';
import theme from '../src/theme';
import '../styles/globals.css';


export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // https://stackoverflow.com/a/59117532
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    // useEffect(() => {
    //     // Remove the server-side injected CSS.
    //     const jssStyles = document.querySelector('#jss-server-side');
    //     if (jssStyles?.parentElement) {
    //         jssStyles.parentElement.removeChild(jssStyles);
    //     }
    // }, []);

    if (loading) {
        return (
            <LinearProgress />
        );
    }

    return (
        <ApolloProvider client={apolloClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <DefaultSeo {...SEO} />
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </StyledEngineProvider>
        </ApolloProvider>
    );
}
