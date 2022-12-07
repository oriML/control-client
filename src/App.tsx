import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './routes';
import PageWrapper from './components/layout/pageLayout/PageWrapper';

import './translations/i18n'

function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <PageWrapper>
        <Router />
      </PageWrapper>
    </QueryClientProvider>
  );
}

export default App;
