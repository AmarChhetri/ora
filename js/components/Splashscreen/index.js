import React, { Component } from 'react';;
import {connect} from 'react-redux';
import { Text, Image, View, NetInfo } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { setLocation } from '../../actions/location';
import { connectionState } from '../../actions/netInfoActions';
import styles from './styles';

Geocoder.setApiKey('AIzaSyCCkO21iNrheBtAxknhfo_eErL73QZQFic');

class Splashscreen extends Component {
  constructor(props) {NetInfo
    super(props);
  }
  //
  // Detects location
  //
  detectLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latlng = {

          lat:position.coords.latitude,
          lng:position.coords.longitude
        }
        this.getPositionName(latlng.lat, latlng.lng);
      },err=>{
        console.log(err)
      })
  }
  //
  // Geocode name from lat-long
  //
  getPositionName(lat, lng){
    Geocoder.getFromLatLng(lat, lng).
      then(res=>
        {
          const formatted_address = res.results[0].formatted_address;
          const position = {
            lat:lat,
            lng:lng
          };

          this.setLocation(formatted_address, position);
        },
        err=>
        {
          return;
        }
      )
  }
  setLocation(formatted_address, position){
    const locationObject = {
      name: formatted_address,
      latlng: position
    }
    this.props.setLocation(locationObject);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.connectionState({ status: isConnected });
    });

    setTimeout(() => {
      this.detectLocation();
    }, 2000);

    setTimeout(() => {
      if (this.props.appactivestate) {
        const nextGo = this.props.activeLocation !== null
          ? 'tabs'
          : 'select-location-2';
        this.props.navigator.replace({ id: nextGo });
        return;
      }
      this.props.navigator.replace({ id: 'show-tutorials' });
    }, 4000);
  }

  render() {
    return (
      <Image
        style={styles.container}
        resizeMode={'cover'}
        source={require('../../../assets/_splash.jpg')}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    appactivestate: state.appactivestate.isActive,
    activeLocation: state.location.activeLocation,
    connectionStatus: state.isConnected.isConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLocation: loc => dispatch(setLocation(loc)),
    connectionState: status => dispatch(connectionState(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splashscreen);
