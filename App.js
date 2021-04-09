import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet,
  StatusBar, Platform, AsyncStorage,
} from 'react-native';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/redux/store/store';

console.disableYellowBox = true
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
    };

    
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {Platform.OS == 'android' ? (
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar
                barStyle={"default"}
              />
              <Routes />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar
                barStyle={"default"}
                backgroundColor={
                  Platform.OS === 'ios' ? "#FFFF" : "#0000"
                }
              />
              <Routes />
            </SafeAreaView>
          )}
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default App;
