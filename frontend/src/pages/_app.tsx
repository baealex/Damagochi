import App, { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import '../styles/main.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import SEO from '@components/seo';
import LibHead from '@components/common/LibHead';
import TopNavagation from '@components/common/TopNavigation';

class Main extends App<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <>
                <Head>
                    <title>BLOG EXPRESS ME</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="apple-touch-icon" sizes="57x57" href="/logo57.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/logo72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/logo76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/logo114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/logo120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/logo144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/logo152.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/logo16.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/logo32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/logo96.png"/>
                    <link rel="icon" type="image/png" sizes="192x192" href="/logo192.png"/>
                    <meta name="theme-color" content="#000"/>
                    <meta name="application-name" content="BLEX"/>
                    <meta name="msapplication-TileImage" content="/logo144.png"/>
                    <meta name="msapplication-TileColor" content="#000"/>
                </Head>
                
                <SEO
                    title={'BLOG EXPRESS ME'}
                    description={'온라인 창작자를 위한 블로그'}
                    image={'https://static.blex.me/assets/images/default-post.png'}
                />
                <LibHead/>

                <TopNavagation/>

                <ToastContainer/>

                <div className="content">
                    <Component {...pageProps}/>
                </div>
            </>
        )
    }
}

export default Main;