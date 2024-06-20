import {useMutation, useQueryClient} from '@tanstack/react-query';
import {LoginForm, LoginResponse} from './type';
import axios, {AxiosError, AxiosResponse} from 'axios';
import Snackbar from 'react-native-snackbar';
import {COLORS} from 'utils';
import {useAuth} from 'contexts';

export function useLogin() {
  const queryClient = useQueryClient();
  const {login} = useAuth();
  return useMutation<AxiosResponse<LoginResponse>, AxiosError<any>, LoginForm>({
    mutationFn: payload => {
      return axios.post('/login', payload);
    },
    onSuccess: ({data}, v) => {
      const {token, user} = data.data;
      queryClient.invalidateQueries({queryKey: ['USER']});
      Snackbar.show({
        text: `Welcome ${user.username}`,
        duration: Snackbar.LENGTH_SHORT,
      });
      login(user, token);
    },
    onError: e => {
      Snackbar.show({
        text: e.response?.data?.message || 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
        textColor: COLORS.RED,
      });
    },
  });
}
