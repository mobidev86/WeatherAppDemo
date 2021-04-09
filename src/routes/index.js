import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import HomeScreen from '../views/HomeScreen';
import DetailScreen from '../views/DetailScreen';

const AppStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    DetailScreen: DetailScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const RouteContainer = createAppContainer(AppStack);

export default connect(null, null)(RouteContainer);
