import Amplify from "aws-amplify";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../feature/user-profiles/styles/user-profiles.scss";
import "../index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  Amplify.configure({
    aws_appsync_region: "us-west-2",
    aws_appsync_graphqlEndpoint:
      "https://rujtyvr2tvhkbbcibtfozaijyu.appsync-api.us-west-2.amazonaws.com/graphql",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-6bdqwskg35dlbagvx3h2y3vihm",
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>React App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
