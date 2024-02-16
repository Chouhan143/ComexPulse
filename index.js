/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.onForegroundEvent(({type, detail}) => {
  console.log('Foreground event:', type, detail);
});

AppRegistry.registerComponent(appName, () => App);

// // Import the Flipper reporter module
// import { setupDefaultFlipperReporter } from 'react-native-performance-flipper-reporter';

// // Set up the Flipper reporter in the development environment
// if (__DEV__) {
//   setupDefaultFlipperReporter();
// }

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
