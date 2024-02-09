import * as React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth/AuthNavigator';
import {useFlipper} from '@react-navigation/devtools';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
export default function App() {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  return (
    <Provider store={store}>
      <PaperProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef}>
              <AuthNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PaperProvider>
      <Toast />
    </Provider>
  );
}
