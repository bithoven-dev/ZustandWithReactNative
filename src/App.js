import React from 'react';
import {StatusBar} from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {lightTheme} from './themes/light';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {SplashScreen} from './screens/SplashScreen';
import {darkTheme} from './themes/dark';
import {ThemeContext} from './contexts/ThemeContext';
import {sleep} from './utils/sleep';
import {useUserStore} from './stores/userStore';

const RootStack = createStackNavigator();

export default function() {
  const {setUser, setLoading, loading, user} = useUserStore(
    ({setUser, setLoading, loading, user}) => ({
      setUser,
      setLoading,
      loading,
      user,
    }),
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then(user => {
        if (user) {
          setUser(JSON.parse(user));
        }
        setLoading(false);
      });
    });
  }, [setLoading, setUser]);

  // const isDarkMode = useDarkMode();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const switchTheme = React.useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return user ? (
      <RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
