/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Constants from './utils/constants';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';

 import SplashScreen from './pages/splash';
import ListView from './pages/notelist';
import NoteEditor from './pages/noteEditor';
import NoteDetail from './pages/deleteView';
// import ListDetail from './pages/detail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // get current theme scheme of device
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);

  /* handle switch theme action */
  const themeToggler = () => {
    theme === Constants.THEME_LIGHT ? setTheme(Constants.THEME_DARK) : setTheme(Constants.THEME_LIGHT)
}
  return (
    <ThemeProvider theme={theme === Constants.THEME_DARK ? darkTheme : lightTheme}>
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={'#ffffff'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Constants.NAV_KEY_SPLASH}>
        <Stack.Screen name={Constants.NAV_KEY_SPLASH} component={SplashScreen}
         options={{
          headerShown: false
        }}
        />
        <Stack.Screen name={Constants.NAV_KEY_LIST} component={ListView} options={{headerShown: false}}/>
        <Stack.Screen name={Constants.NAV_KEY_EDITOR} component={NoteEditor} options={{headerShown: false}} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </ThemeProvider>
  );
}


export default App;
