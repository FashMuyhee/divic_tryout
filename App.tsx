import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from 'contexts';
import React from 'react';
import {AppRouter} from 'routes';

type Props = {};

const queryClient = new QueryClient();

const App = (props: Props) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
