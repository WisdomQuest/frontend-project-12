import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import App from './App.jsx';
import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  server: {
    root: 'localhost:5002',
    branch: 'main',
  },
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  try {
    await filter.loadDictionary('ru');
  } catch (err) {
    console.error('Failed to load profanity dictionary', err);
  }

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
