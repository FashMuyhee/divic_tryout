import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {AppRouter} from 'routes';

type Props = {};

const queryClient = new QueryClient();

const App = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
