import React, { Component } from 'react';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { Text, Image, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../../actions/login';
import Header from '../Header/';
import LoginView from './LoginView';
import EditDetails from './EditDetails';
import { setActiveTab } from '../../actions';
import { fetchUserSavedAddresses, deleteAddress } from '../../actions/user';
import styles from './styles';

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      showLoginView:false,
      editableUserDetails:false,
      showUpdateButton:false,
      // addr = [],
      // showSignUpView:false
    }
  }

  //
  // Relating to components update and rendering
  //
  componentWillMount(){
    const userobj = this.props.user
    if (userobj.user !== undefined ) {
      this.props.fetchUserSavedAddresses();
      this.setState({
        username:userobj.user.username,
        email: userobj.user.email,
        phone:userobj.user.phn,
        // addr: [...userobj.user.saved_address],
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.user.user) {
      this.props.user.saved_address = nextProps.user.saved_address;
      this.setState({
        showLoginView:false,
        username:nextProps.user.user.username,
        email: nextProps.user.user.email,
        phone: nextProps.user.user.phn,
        // addr: [...nextProps.user.user.saved_address],
      })
    }
  }

  showPrompt(id){
      Alert.alert(
          "Are you sure?",
          "Click cancel to return",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () =>  this.props.deleteAddress(id) },
          ])
    }

    capitalizeFirstLetter(string) {
    return string.substring(0,1).toUpperCase() + string.slice(1);
  }
  //
  // Go to login View
  //

  hideLoginView(){
    this.setState({
      showLoginView:false
    })
  }

  editAddress(address){
    this.props.navigator.push({
      id:'edit-address',
      address: address
    })
  }

  render(){
    if (this.state.showLoginView) {
      return <LoginView hideLoginView={()=>this.setState({showLoginView:false})}/>
    }
    return(
      <View style={styles.container}>
        <Header
          onBack={()=>this.props.setActiveTab('homepage')}
          style={styles.topbar}
          title={"Profile"}
          />
        <ScrollView style={styles.mainBlock}>
          {this.renderProfile()}
        </ScrollView>
        <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }
  

  renderSavedAddress(address) {
    if(address === undefined || address.length === 0) {
      return (
        <CardView
        style={{marginTop: 10,}}
         cardElevation={3}
         cardMaxElevation={3}
         cornerRadius={5}
         >
          <View style={styles.noAddress}>
            <SimpleLineIcons name="info" size={20}/>
            <Text style={styles.noAddressText}>No Saved Address Found</Text>
          </View>
        </CardView>
      )
    }
    return(
      <View style={{marginTop: 20,}}>
        <View style={styles.headingBlock}>
          <Text style={styles.headingText}>SAVED ADDRESSESS</Text>
        </View>
        {this.renderAddressBlock(address)}
      </View>
    )
  }

  renderAddressBlock(address) {
    return address.map((addr, index) => {
      return(
        <CardView
        key={index}
         cardElevation={3}
         cardMaxElevation={3}
         cornerRadius={5}
         >
        <View  style={styles.inputBlock}>
          <SimpleLineIcons style={styles.Icon} name="location-pin" />
          <View style={styles.addressBlock}>
            <Text style={styles.heading}>{this.capitalizeFirstLetter(addr.address_type)}</Text>
            <Text style={styles.address}>{this.capitalizeFirstLetter(addr.address_line_1)}</Text>
            <Text style={styles.address}>{this.capitalizeFirstLetter(addr.address_line_2)}</Text>
            <Text style={styles.address}>{this.capitalizeFirstLetter(addr.city)}, {this.capitalizeFirstLetter(addr.state)}, {addr.zip}</Text>
          </View>
          <View style={styles.actionIcon}>
            <TouchableOpacity
              style={styles.iconClick}
              onPress={() => this.editAddress(addr)}
            >
              <SimpleLineIcons style={styles.editAddrIcon} name="pencil"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconClick}
              onPress={() => this.showPrompt(addr.id)}
            >
              <SimpleLineIcons style={styles.deleteIcon} name="trash" />
            </TouchableOpacity>
          </View>
        </View>
        </CardView>
      );
    });
  }
  

  //
  // Render Profile
  //
  renderProfile(){
    const user = this.props.user.user;
    const address = this.props.user.saved_address;
    if ( !user || user === undefined) {
      //
      // Guest Profile View
      //
      return(
        <View style={styles.profile}>
          <View style={[styles.topGuest, {paddingTop:50}]}>
            <Image
              style={{width:200, height: 200}}
              source={require('../../../assets/not-logged-in.png')}
              />
            <Text style={styles.guestOopsText}>Oops! You are not logged in</Text>
          </View>
          <View style={styles.middleGuest}>
            <Text style={styles.guestAdviceText}>TO ORDER YOU MUST HAVE AN ACCOUNT</Text>
          </View>
          <View style={styles.bottomGuest}>
             <TouchableOpacity
              onPress={()=>this.setState({showLoginView:true})}
              style={[styles.guestButton,{marginRight:15,}]}>
              <Text style={[styles.guestButtonText,{color: 'rgba(0,120,60,0.7)', fontFamily: 'Helvetica', fontWeight: 'bold' }]}>SIGN IN</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={()=>this.setState({showLoginView:true})}
              style={[styles.guestButton,{marginLeft:15,}]}>
              <Text style={[styles.guestButtonText,{fontFamily: 'Helvetica', color: "rgba(0,120,60,0.7)", fontWeight: 'bold'},]}>SIGN UP</Text>
              
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    //
    // Host Profile View
    //
    return(
     <View style={styles.profileView}>
       <CardView
         cardElevation={3}
         cardMaxElevation={3}
         cornerRadius={5}
         >
           <EditDetails alertMessage={this.dropdown} username={this.state.username} phone={this.state.phone} email={this.state.email}/>
        </CardView>
          {
            this.renderSavedAddress(address)
          }
        <TouchableOpacity
            style={styles.signOutBlock}
            onPress={()=>this.props.logout()}
            >
            <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>

      </View>
    );
  }

}
function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
    logout: () => dispatch(logout()),
    deleteAddress: (id) => dispatch(deleteAddress(id)),
    fetchUserSavedAddresses: () => dispatch(fetchUserSavedAddresses())
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
