import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth/AuthNavigator';
import { useFlipper } from '@react-navigation/devtools';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer ref={navigationRef}>
          <AuthNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}