import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
// Common Header Component
import Header from '../../components/header';
// Fonts
import { Fonts } from '../../constant/constant';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('data')
    }
  }
  render() {
    const { data } = this.state;
    return (
      <>
        <View styles={styles.container}>
          <Header isBackIcon={true} goBack={() => this.props.navigation.goBack()} />
          {/* Map View */}
          <MapView
            initialRegion={{
              latitude: data.coord.lat,
              longitude: data.coord.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={"google"}
            scrollEnabled={false}
            minZoomLevel={12}
            zoomEnabled={false}
            style={styles.mapView}
          >
            <Marker
              coordinate={{
                latitude: data.coord.lat,
                longitude: data.coord.lon
              }}
            />
          </MapView>
          <View style={styles.cityDetailBlock}>
            {/* Detail */}
            <View style={styles.cityDetailView}>
              {/* Left View */}
              <View style={styles.cityDetailLeft}>
                <Text style={styles.cityName}>{data.name}</Text>
                <Text style={styles.citySubDetail}>{data.weather[0].main}</Text>
                <Text style={styles.citySubDetail}>Humidity: {data.main.humidity}</Text>
                <Text style={styles.citySubDetail}>Wind Speed: {data.wind.speed}</Text>
                <Text style={styles.citySubDetail}>Max. Temp.: {data.main.temp_max} c</Text>
                <Text style={styles.citySubDetail}>Min. Temp.: {data.main.temp_min} c</Text>
              </View>
              {/* Right View */}
              <View style={[styles.center, styles.cityDetailLeft]}>
                <Text style={styles.tempText}>{data.main.temp} {"\u2103"}</Text>
                <Image
                  style={styles.weatherIcon}
                  source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#FFFFFF"
  },
  mapView: {
    height: SCREEN_HEIGHT / 1.8, backgroundColor: "#FFFFFF"
  },
  weatherIcon: {
    height: 70, width: 70
  },
  cityDetailBlock: {
    height: SCREEN_HEIGHT / 2.7, justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  cityDetailView: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginHorizontal: 10
  },
  cityDetailLeft: {
    flex: 1 / 2, marginHorizontal: 10
  },
  center: {
    alignSelf: 'center', alignItems: 'center'
  },
  tempText: {
    fontSize: 22, top: 10,
    fontFamily: Fonts.regular
  },
  citySubDetail: {
    fontSize: 16, marginBottom: 5,
    fontFamily: Fonts.regular
  },
  cityName: {
    fontSize: 18, marginVertical: 5,
    fontFamily: Fonts.bold
  }
})

export default connect(null, null)(DetailScreen);