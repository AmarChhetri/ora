import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  InteractionManager,
} from 'react-native';
import Header from '../Header/';
import CardView from 'react-native-cardview';
import { Spinner } from '../common/';
import { placeOrder } from '../../actions/placeorder';
import { fetchUserSavedAddresses } from '../../actions/user';
import DropdownAlert from 'react-native-dropdownalert';

import styles from './styles';

class SelectAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: null,
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zip: '',
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchUserSavedAddresses();
    });
  }

  componentWillReceiveProps(nextProps) {
    const placeorder = nextProps.placeorder;
    if (placeorder.error && !placeorder.isFetching) {
      this.setState({
        showSpinner: false,
        activeButton: null,
        error: true,
        errorMessage: placeorder.errorMessage,
      });
      this.dropdown.alertWithType('error', 'Error', placeorder.errorMessage);
      placeorder.error = false;
    } else if (placeorder.order_id !== null && !placeorder.isFetching) {
      this.setState({
        error: false,
        showSpinner: false,
      });
      this.gotoPay();
    } else if (placeorder.isFetching) {
      this.setState({
        showSpinner: true,
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.substring(0,1).toUpperCase() + string.slice(1);
  }
  saveAndDeliver() {
    if (this.state.address_line_1 === '') {
      this.setState({
        error: true,
        errorMessage: 'Address line 1 cannot be blank',
      });
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Address line 1 cannot be blank',
      );
      return;
    } else if (this.state.city === '') {
      this.setState({
        error: true,
        errorMessage: 'City cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', 'City cannot be blank');
      return;
    } else if (this.state.state === '') {
      this.setState({
        error: true,
        errorMessage: 'State cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', 'State cannot be blank');
      return;
    } else if (this.state.zip === '') {
      this.setState({
        error: true,
        errorMessage: 'Zip cannot be blank',
      });
      this.dropdown.alertWithType('error', 'Error', 'Zip cannot be blank');
      return;
    } else if (!this.state.zip.match(/^[1-9][0-9]{5}$/)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid zip',
      });
      this.dropdown.alertWithType('error', 'Error', 'Invalid zip');
      return;
    }

    let addressObject = {
      id: '',
      address_line_1: this.state.address_line_1,
      address_line_2: this.state.address_line_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      address_type: 'others',
    };
    this.placeOrder(addressObject);
  }
  placeOrder(address, index) {
    const { from } = this.props;
    this.setState({
      activeButton: index,
    });
    this.props.placeOrder(address, from);
  }
  gotoPay() {
    const { from } = this.props;
    this.props.navigator.push({
      id: 'pay',
      from: from,
    });
  }
  renderButtonIcon() {
    if (this.state.showSpinner && this.state.activeButton === undefined) {
      return <Spinner size="large" color="#fff" />;
    }
    return <Text style={styles.buttonText}>SAVE & DELIVER</Text>;
  }

  renderSavedAddressButton(index) {
    return <Text style={styles.deliverButtonText}>DELIVER</Text>;
  }

  renderSavaedAddressList(address) {
    return address.map((addrs, index) => {
      return (
        <View style={styles.savedaddress} key={index}>
          <View style={styles.leftSavedAddress}>
            <Text style={styles.addressHeader}>{this.capitalizeFirstLetter(addrs.address_type)}</Text>
            <View style={styles.addressBody}>
              <Text style={styles.addressTex}>{this.capitalizeFirstLetter(addrs.address_line_1)}</Text>
              <Text style={styles.addressTex}>{this.capitalizeFirstLetter(addrs.address_line_2)}</Text>
              <Text style={styles.addressTex}>{this.capitalizeFirstLetter(addrs.city)}, {this.capitalizeFirstLetter(addrs.state)}, {addrs.zip}</Text>
            </View>
          </View>
          <View style={styles.rightSavedAddress}>
            <TouchableOpacity
              style={styles.deliverButton}
              onPress={() => this.placeOrder(addrs, index)}
            >
              {this.renderSavedAddressButton(index)}
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }
  renderSavedAddress(address) {
    if (address === undefined || address.length === 0) {
      return null;
    }
    return (
      <View style={{marginTop: 20,}}>
        <CardView cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
          <View>
          <View style={styles.headingBlock}>
            <Text style={styles.headingText}>SAVED ADDRESS</Text>    
          </View>
          {this.renderSavaedAddressList(address)}
          </View>
        </CardView>
      </View>
    );
  }
  render() {
    const userAddress = this.props.userAddress;
    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.props.navigator.pop()}
          style={styles.topbar}
          title={'Address'}
        />
        <ScrollView style={styles.mainContainer}>
          <View style={{marginTop: 15}}>
          <CardView
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={5}
          >
            <View style={styles.addnewAddress}>
              <Text style={styles.headers}>ADD ADDRESS</Text>
              <View style={{ alignItems: 'center', paddingRight: 8 }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Address line 1"
                  maxLength={35}
                  autoCapitalize={'none'}
                  placeholderTextColor={'gray'}
                  value={this.state.address_line_1}
                  onChangeText={text => this.setState({ address_line_1: text })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
                <View style={styles.divider2} />
                <TextInput
                  maxLength={35}
                  style={styles.textInput}
                  placeholder={'Address line 2'}
                  placeholderTextColor={'gray'}
                  autoCapitalize={'none'}
                  value={this.state.address_line_2}
                  onChangeText={text => this.setState({ address_line_2: text })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
                <View style={styles.divider2} />
                <TextInput
                  style={styles.textInput}
                  maxLength={35}
                  placeholder="City"
                  placeholderTextColor={'gray'}
                  autoCapitalize={'none'}
                  value={this.state.city}
                  onChangeText={text => this.setState({ city: text })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
                <View style={styles.divider2} />

                <TextInput
                  maxLength={35}
                  style={styles.textInput}
                  placeholder={'State'}
                  placeholderTextColor={'gray'}
                  autoCapitalize={'none'}
                  value={this.state.state}
                  onChangeText={text => this.setState({ state: text })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
                <View style={styles.divider2} />

                <TextInput
                  style={styles.textInput}
                  placeholder="Zip"
                  placeholderTextColor={'gray'}
                  keyboadType={'numeric'}
                  value={this.state.zip}
                  onChangeText={text => this.setState({ zip: text })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
              </View>

              {/*<View style={styles.divider2}/>*/}
            </View>

          </CardView>
          </View>
          <View style={styles.addAddressButtons}>
            <TouchableOpacity
              style={styles.addAddressLeftButton}
              onPress={() => this.saveAndDeliver()}
            >
              {this.renderButtonIcon()}
            </TouchableOpacity>
          </View>
          {this.renderSavedAddress(userAddress)}
        </ScrollView>
        <DropdownAlert ref={ref => this.dropdown = ref} />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userAddress: state.user.saved_address,
    requestAddress: state.user.requestAddress,
    placeorder: state.placeorder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    placeOrder: (address, from) => dispatch(placeOrder(address, from)),
    fetchUserSavedAddresses: () => dispatch(fetchUserSavedAddresses()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);
