import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TouchableOpacity, View, Image , Linking, Dimensions } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { closeDrawer } from '../../actions/sidebar';
import { setActiveHomepage } from '../../actions/tab';
import { logout } from '../../actions/login';
import styles from './styles';

class ControlPanel extends Component {
  constructor(props){
    super(props);
    this.state={
      active:"",
      user: null,
    }
  }

  gotoEcommerce(){
    this.props.setActiveHomepage("shop");
    this.props.closeDrawer();
  }
  gotoFoodOrdering(){
    this.props.setActiveHomepage("food");
    this.props.closeDrawer();
  }
  gotoTableBooking(){
    this.props.setActiveHomepage("table-reservation");
    this.props.closeDrawer();
  }
  signOut(){
    this.props.logout();
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.user.user) {
      this.setState({user:nextProps.user.user})
    }else {
      this.setState({user:null})
    }
  }
  handleClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Image
            style={styles.userPicStyle}
            source={require('../../../assets/header_bg_mobile.jpg')}
          />
          <Image
            style={styles.stars}
            source={require('../../../assets/stars.png')}
          />
          <Image
            style={styles.logoWhite}
            source={require('../../../assets/logo-white-mob.png')}
          />
          <Image
            style={styles.cityscape}
            source={require('../../../assets/cityscape_small.png')}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>this.props.closeDrawer()}>
            <MaterialIcon name="arrow-back" style={styles.backicon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollbar}>
          <TouchableOpacity
            onPress={()=>this.gotoFoodOrdering()}
            style={styles.listitems}>
            <Image
              style={{width:30, height: 30}}
              source={require('../../../assets/icons/knife-and-fork-outline.png')}
              />
            <Text style={styles.itemsText}>FOOD ORDERING</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.gotoEcommerce()}
            style={styles.listitems}>
            <Image
              style={{width:30, height: 30}}
              source={require('../../../assets/icons/shopping-bag.png')}
              />
            <Text style={styles.itemsText}>SHOPPING</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.gotoTableBooking()}
            style={styles.listitems}>
          <Image
            style={{width:27, height: 27}}
            source={require('../../../assets/icons/monthly-calendar.png')}
            />
            <Text style={styles.itemsText}>TABLE RESERVATION </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signOutBlock}>
          {
            this.state.user !== null
            &&
            <TouchableOpacity
              style={styles.signOutBlock}
              onPress={()=>this.signOut()}
              >
              <Text style={styles.signOutText}>SIGN OUT</Text>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.divider} ></View>
        <View style={styles.contactUs}>
          <View style={styles.contactUsBlock}>
            <Text style={styles.contactUsHeader}>Contact us</Text>
            <View style={styles.contactUsNumbers}>
              <TouchableOpacity
                onPress={()=>this.handleClick('tel:9127018661')}
              >
                  <Text>9127018661</Text>
              </TouchableOpacity>
              <View style={styles.numberdivider}></View>
              <TouchableOpacity
                onPress={()=>this.handleClick('tel:9127018662')}
              >
                  <Text>9127018662</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={()=>this.handleClick('mailto:contact@cityora.com')}
            >
              <Text >contact@cityora.com</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottombar}>
          <View style={[styles.cityoralogo,{width:35, height: 35, borderRadius:18}]}>
            <Image
              style={{width:35, height: 35}}
              source={require('../../../assets/image/cityora-app-logo.jpg')}
              />
          </View>
          <View style={styles.poweredBy}>
            <Text style={styles.logoText}>Cityora &#xA9; 2016</Text>
          </View>
        </View>
    </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}


const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  logout: () => dispatch(logout()),
  setActiveHomepage: (homepage)=> dispatch(setActiveHomepage(homepage)),
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
