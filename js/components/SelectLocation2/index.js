import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  NetInfo, 
  Alert, 
  Linking, 
  NativeModules, 
  Platform 
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Header from '../Header/'
import { setLocation } from '../../actions/location';
import { connectionState } from '../../actions/netInfoActions';
import styles from './styles';

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      location: null,
    };
  }

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectionChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectionChange,
    );
  }

  _openSettings() {
    if(Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:').then(supported => {
        //console.log(`Settings url works`)
        Linking.openURL('Settings:')
      }).catch(error => {
        //console.log(`An error has occured: ${error}`)
      })
    }else{
      NativeModules.OpenSettings.openNetworkSettings(data => {
        //console.log('call back data', data);
      });
    }
    
  }

  setLocation(data, details) {
    const locationObject = {
      name: data.description,
      latlng: details.geometry.location,
    };
    this.props.setLocation(locationObject);
    this.props.navigator.push({ id: 'tabs' });
  }
  render() {
    if (!this.props.connectionStatus) {
      Alert.alert(
        'No Data Connection',
        'Please turn on your data connection',
        [
          { text: 'Settings', onPress: () => this._openSettings() },
        ],
        {
          cancelable: false
        }
      );
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.props.navigator.pop()}
          hideBack={true}
          style={styles.topbar}
          title={'Select your location'}
        />
        <GooglePlacesAutocomplete
          placeholder="Search your location"
          keyboardShouldPersistTaps={true}
          textInputProps={{ underlineColorAndroid: 'rgba(0,0,0,0)' }}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setLocation(data, details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          styles={{
            container: styles.geoContainer,
            description: styles.description,
            textInputContainer: styles.textInputContainer,
            textInput: styles.autocompleteTextInput,
            poweredContainer: styles.poweredContainer,
            listView: styles.listView,
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: 'AIzaSyCCkO21iNrheBtAxknhfo_eErL73QZQFic',
            language: 'en', // language of the results
            types: [
              'locality',
              'cities',
              'geocode',
              'administrative_area_level_3',
            ],
          }}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    connectionStatus: state.isConnected.isConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLocation: loc => dispatch(setLocation(loc)),
    connectionState: status => dispatch(connectionState(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);
