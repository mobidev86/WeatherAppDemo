import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Fonts, Icons } from '../../constant/constant';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const {
      isBackIcon
    } = this.props;
    return (
      <>
        <View style={styles.container}>
          {isBackIcon &&
            <TouchableOpacity
              onPress={() => this.props.goBack()}
              style={styles.backButtonView}>
              <Image source={Icons.icon_back} style={styles.backButtonIcon} />
            </TouchableOpacity>
          }
          <Text style={[styles.headerTitle, { marginEnd: isBackIcon ? 72 : 0 }]}>WeatherApp</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00804A",
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    textAlign: 'center', fontSize: 22,
    color: "white", flex: 1, fontFamily: Fonts.bold,
    alignSelf: 'center'
  },
  backButtonView: {
    flex: 1 / 4, marginHorizontal: 10, alignSelf: 'center'
  },
  backButtonIcon: {
    width: 30, height: 30
  }
})
export default Header;