import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from '@navigation/Routes';

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Routes />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
