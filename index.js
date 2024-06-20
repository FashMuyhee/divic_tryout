/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { API_BASE_URL } from 'utils';
import axios from 'axios'

axios.defaults.baseURL = API_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json';

AppRegistry.registerComponent(appName, () => App);
