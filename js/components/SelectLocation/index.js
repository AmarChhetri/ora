import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Header from '../Header/'
import { setLocation } from '../../actions/location';
import styles from './styles';

Geocoder.setApiKey('AIzaSyAMXQAZBTiVgLSCXatLeuHny-pwZqOlwG0');

class SelectLocation extends Component {
  constructor(props){
    super(props);
    this.state={
        text:"",
        location:null
    }
  }

  //
  // Sets Location
  //

  setLocation(data, details){
    const locationObject = {
      name:data.description,
      latlng:details.geometry.location
    }
    this.props.setLocation(locationObject);
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
        onBack={()=>this.props.navigator.pop()}
        style={styles.topbar}
        title={"Select delivery location"}/>
        <GooglePlacesAutocomplete
          placeholder='Search your location'
          textInputProps={{underlineColorAndroid:'rgba(0,0,0,0)'}}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          keyboardShouldPersistTaps={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.setLocation(data, details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          styles={{
            container:styles.geoContainer,
            description:styles.description,
            textInputContainer:styles.textInputContainer,
            textInput:styles.autocompleteTextInput,
            poweredContainer:styles.poweredContainer,
            listView:styles.listView,
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCCkO21iNrheBtAxknhfo_eErL73QZQFic',
            language: 'en', // language of the results
            types : [ "locality", "cities", "geocode", "administrative_area_level_3" ]
          }}
          // predefinedPlaces={[homePlace, workPlace]}
        />
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    restaurants: state.homepage,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocation:(loc)=>dispatch(setLocation(loc)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation)
