import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { getActiveHomepage, setActiveTab } from '../../actions/tab';
import HomePage from '../HomePage/';
import Ecommerce from '../Ecommerce/';
import TableReservation from '../TableOrdering/';
import Profile from '../Profile/';
import Notifications from '../Notifications/';
import OrdersPage from '../OrdersPage';
import styles from './styles';

class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:'homepage',
      activeHomepage:'food',
    };
  }
componentDidMount(){
 // InteractionManager.runAfterInteractions(() => {
    this.props.getActiveHomepage();
  //});
  this.setState({
    page: this.props.tab.activeTab
  })
}
componentWillReceiveProps(nextProps){
  this.setState({
    page: nextProps.tab.activeTab
  })
}
gotoCart(){
  this.props.navigator.push({
    id:'cart'
  })
}
  render() {
    return (
      <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.5)'}]}>
        <View style={styles.tabPages}>
          {this.renderTabs()}
        </View>
        <View style={styles.tabBar}>
            <TouchableOpacity
              style={ styles.tabView }
              onPress={()=>this.props.setActiveTab('homepage')}>
              <Icon name="home" style={this.state.page === "homepage" ? styles.activeTabIcon :styles.tabIcon}/>
              <Text style={this.state.page === "homepage" ? styles.activeTabText :styles.tabText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ styles.tabView }
              onPress={()=>this.props.setActiveTab('orders')}>
              {
                this.props.tab.activeHomepage === 'shop'
                && <Icon name="shopping-cart" style={this.state.page === "orders" ? styles.activeTabIcon :styles.tabIcon}/>
              }
              {
                (this.props.tab.activeHomepage === 'food' || this.props.tab.activeHomepage === 'table-reservation')
                && <Icon name="shopping-cart" style={this.state.page === "orders" ? styles.activeTabIcon :styles.tabIcon}/>
              }
              <Text style={this.state.page === "orders" ? styles.activeTabText : styles.tabText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ styles.tabView }
              onPress={()=>this.props.setActiveTab('profile')}>
              <Icon name="person" style={this.state.page === "profile" ? styles.activeTabIcon :styles.tabIcon}/>
              <Text style={this.state.page === "profile" ? styles.activeTabText :styles.tabText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabView}
              onPress={()=>this.props.setActiveTab('notifications')}>
              <Icon name="notifications" style={this.state.page === "notifications" ? styles.activeTabIcon :styles.tabIcon}/>
              <Text style={this.state.page === "notifications" ? styles.activeTabText : styles.tabText}>Notification</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  onClickView(){
    //console.log("hello");
  }
  renderTabs() {
    switch (this.state.page) {
      case 'homepage':
        if (this.props.tab.activeHomepage === 'shop') {
          return <Ecommerce navigator={this.props.navigator} tab={this.props.tab.activeHomepage} />
        }else if (this.props.tab.activeHomepage === 'table-reservation') {
          return <TableReservation />
        }
        return  <HomePage navigator={this.props.navigator} tab={this.props.tab.activeHomepage} />;
      case 'profile':
        return  <Profile navigator={this.props.navigator} tab={this.props.tab.activeHomepage} />;
      case 'notifications':
          return  <Notifications navigator={this.props.navigator} tab={this.props.tab.activeHomepage} />;
      case 'orders':
        return  <OrdersPage navigator={this.props.navigator} tab={this.props.tab.activeHomepage} />;
      default:
        return null;

    }
  }
}
function mapStateToProps (state) {
  return {
    tab: state.tab,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getActiveHomepage:()=>dispatch(getActiveHomepage()),
    setActiveTab:(tab)=>dispatch(setActiveTab(tab))
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TabBar);
