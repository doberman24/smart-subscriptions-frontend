import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { store } from '@/redux/store';
import { HelmetProvider } from "@vuer-ai/react-helmet-async";
import { StaticRouter } from "react-router-dom";
import App from "@/App/App";

export const prerender = async ({ url }) => {
    const helmetContext = {};

    const html = renderToString(
        <Provider store={store}>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </Provider>
    );

    const helmet = helmetContext.helmet;

    let pageTitle = 'Smart Subscriptions';
    if (helmet?.title) {
    const match = helmet.title.toString().match(/>(.*?)</);
    if (match && match[1]) pageTitle = match[1];
    }


    return {
        html,
        head: {
            title: pageTitle,
            elements: new Set([
            { type: 'meta', props: { name: 'description', content: 'Управление подписками и аналитика' } }
            ])
        }
    }

} 