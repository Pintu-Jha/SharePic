import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Providers from './context';
import Routes from './navigation/Routes';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Providers>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Routes />
        </SafeAreaView>
      </Providers>
    </NavigationContainer>
  );
}

export default App;
