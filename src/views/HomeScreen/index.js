import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, FlatList, PermissionsAndroid,
  Alert, Dimensions, Platform,
} from 'react-native';
import Geolocation from "react-native-geolocation-service";
import PushNotification from "react-native-push-notification";
import { connect } from 'react-redux';
// Common Header Component
import Header from '../../components/header';
import { Fonts } from '../../constant/constant';
// Reducer Methods
import { weatherByCities, getCurrentTemp } from '../../redux/reducer/weather';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      loading: false,
      startInterval: true,
      latitude: "",
      longitude: "",
    }
  }

  componentDidMount() {
    Platform.OS == 'ios' ? this.requestIOSPermission() : this.requestAndroidPermission();
  }

  /**
   * Request Location Permission 
   * For iOS Devices
   */
  requestIOSPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization('always');
      if (granted === "granted") {
        Geolocation.getCurrentPosition((position) => {
          this.setState({
            startInterval: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }, () => this.getCurrentTemp())
          this.getWeatherData();
        }, (err) => {
          console.log("PERMISSION ERROR IOS", err.message);
        }, { enableHighAccuracy: true, timeout: 50000 })
      } else {
        Alert.alert("Location Permission Denied", "Please Enable Permission From App Settings")
      }
    } catch (err) {
    }
  }

  /**
   * Request Location Permission 
   * For Android Device
   */
  requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((position) => {
          this.setState({
            startInterval: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }, () => this.getCurrentTemp())
          this.getWeatherData();
        }, (err) => {
          console.log("PERMISSION ERROR ANDROID", err);
        }, { enableHighAccuracy: true, timeout: 50000 })
      } else {
        Alert.alert("Location Permission Denied", "Please Enable Permission From App Settings")
      }
    } catch (err) {
    }
  }

  getCurrentTemp = () => {
    const { startInterval, latitude, longitude } = this.state;
    PushNotification.createChannel({
      channelId: "Test", // (required)
      channelName: "YOUR NOTIFICATION CHANNEL NAME", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: false,
    }, (created) => { console.log("Channel Created", created); })
    if (startInterval) {
      setInterval(() => {
        this.props.getCurrentTemp(latitude, longitude)
          .then(res => {
            PushNotification.removeAllDeliveredNotifications();
            PushNotification.localNotification({
              channelId: "Test",
              title: "WeatherApp",
              allowWhileIdle: true,
              priority: "high",
              ignoreInForeground: false,
              invokeApp: true,
              message: `Current Temparature: ${res.main.temp} \u2103`,
              largeIconUrl: `http://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`,
              smallIcon: `http://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`,
              bigLargeIconUrl: `http://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`
            })
          })
          .catch(err => {
            console.log("CURRENT WEATHER ERROR", err);
          })
      }, 10000)
    }
  }

  /**
   * Get Waeather Data
   */
  getWeatherData = () => {
    const { latitude, longitude } = this.state;
    this.setState({ loading: true })
    this.props.weatherByCities(latitude, longitude)
      .then(res => {
        this.setState({ weatherData: res.list, loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log("WEATHER DATA ERROR", err)
      })
  }

  /**
   * List Item View
   * @param item 
   * @param index 
   * @returns 
   */
  renderItem = (item, index) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => this.navigateToDetailScreen(item)}
          style={styles.touchView}>
          <View>
            <Text style={styles.city}>{item.name}</Text>
            <Text style={styles.weather}>{item.weather[0].main}</Text>
          </View>
          <View>
            <Text style={styles.temp}>{item.main.temp} {"\u2103"}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  /**
   * Navigate To Detail Screen
   * @param item 
   */
  navigateToDetailScreen = (item) => {
    this.props.navigation.navigate("DetailScreen", {
      data: item // Selected City Data Passed As Parameter
    })
  }

  render() {
    const { weatherData, loading } = this.state;
    return (
      <>
        <View style={styles.container}>
          <Header isBackIcon={false} />
          {loading ?
            <ActivityIndicator
              color={"#00804A"} size={"large"} style={styles.loader}
            /> :
            <FlatList
              data={weatherData}
              extraData={this.state}
              initialNumToRender={50}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              ItemSeparatorComponent={() => <>
                <View style={{ borderWidth: 0.9, borderColor: 'lightgrey', marginVertical: 3 }} />
              </>}
            />
          }
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    bottom: SCREEN_HEIGHT / 2,
    alignSelf: 'center'
  },
  touchView: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginHorizontal: 10, alignItems: 'center'
  },
  city: {
    fontSize: 22, color: 'black', fontFamily: Fonts.regular
  },
  weather: {
    fontSize: 16, color: 'grey', fontFamily: Fonts.regular
  },
  temp: {
    fontSize: 28, color: 'black', fontFamily: Fonts.regular
  }
})

const mapDispatchToProps = {
  weatherByCities,
  getCurrentTemp
}
export default connect(null, mapDispatchToProps)(HomeScreen);