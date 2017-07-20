import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import CardView from 'react-native-cardview';
import { updateUserAddress } from '../../actions/user';
import DropdownAlert from 'react-native-dropdownalert';
import { Spinner } from '../common/';
import Header from '../Header/';
import styles from './styles';

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zip: '',
    };
  }

  componentDidMount() {
    address = this.props.address;
    this.setState({
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  }

  componentWillReceiveProps(nextProps) {
    const addressObj = nextProps.addressObject;
    if (addressObj.userAddressUpdating) {
      this.setState({
        showSpinner: true,
      });
    } else if (addressObj.userAddressUpdated) {
      this.setState({
        showSpinner: false,
      });
      this.props.navigator.pop();
    } else if (addressObj.userAddressUpdateerror) {
      this.setState({
        showSpinner: false,
        error: true,
        errorMessage: 'Pin unavailable',
      });
      this.dropdown.alertWithType('error', 'Error', "Pin unavailable");
    }
  }
  update() {
    if (this.state.address_line_1 === '') {
      this.setState({
        error: true,
        errorMessage: 'Address line 1 cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', "Address line 1 cannot be blank")
      return;
    } else if (this.state.city === '') {
      this.setState({
        error: true,
        errorMessage: 'City cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', "City cannot be blank")
      return;
    } else if (this.state.state === '') {
      this.setState({
        error: true,
        errorMessage: 'State cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', "State cannot be blank")
      return;
    } else if (this.state.zip === '') {
      this.setState({
        error: true,
        errorMessage: 'Zip cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', "Zip cannot be blank")
      return;
    } else if (!this.state.zip.match(/^[1-9][0-9]{5}$/)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid zip',
      });
      this.dropdown.alertWithType('error', 'Error', "Invalid zip")
      return;
    }
    this.props.updateUserAddress(
      this.props.address,
      this.state.address_line_1,
      this.state.address_line_2,
      this.state.city,
      this.state.state,
      this.state.zip,
    );
  }

  renderButtonIcon() {<DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
    if (this.state.showSpinner) {
      return <Spinner size="large" />;
    }
    return <Text style={[styles.buttonText]}>UPDATE</Text>;
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.props.navigator.pop()}
          style={styles.topbar}
          title={'Edit address'}
        />
        <View style={styles.mainContainer}>

          <CardView
            style={{ marginTop:0 }}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={5}
          >
          <View style={styles.addnewAddress}>
            <View style={styles.headingBlock}>
              <Text style={styles.headingText}>Saved Addresses</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Address line 1"
              maxLength={35}
              placeholderTextColor={'silver'}
              value={this.state.address_line_1}
              onChangeText={text => this.setState({ address_line_1: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={styles.divider2} />
            <TextInput
              style={styles.textInput}
              placeholder={
                this.state.address_line_2 === '' ? 'Address line 2' : null
              }
              maxLength={35}
              placeholderTextColor={'silver'}
              value={this.state.address_line_2}
              onChangeText={text => this.setState({ address_line_2: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={styles.divider2} />
            <TextInput
              style={styles.textInput}
              placeholder="City"
              maxLength={35}
              placeholderTextColor={'silver'}
              value={this.state.city}
              onChangeText={text => this.setState({ city: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={styles.divider2} />
            <TextInput
              style={styles.textInput}
              placeholder="State"
              maxLength={35}
              placeholderTextColor={'silver'}
              value={this.state.state}
              onChangeText={text => this.setState({ state: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={styles.divider2} />
            <TextInput
              style={styles.textInput}
              keyboardType={"numeric"}
              placeholder="Zip"
              placeholderTextColor={'silver'}
              value={this.state.zip}
              onChangeText={text => this.setState({ zip: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={styles.divider2} />
          </View>
          </CardView>

          <View style={styles.addAddressButtons}>
            <TouchableOpacity
              style={styles.addAddressLeftButton}
              onPress={() => this.update()}
            >
              {this.renderButtonIcon()} 
            </TouchableOpacity>
          </View>

          
        </View>
        <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    addressObject: state.user.userAddressObj,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserAddress: (
      addressObject,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
    ) =>
      dispatch(
        updateUserAddress(
          addressObject,
          address_line_1,
          address_line_2,
          city,
          state,
          zip,
        ),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
