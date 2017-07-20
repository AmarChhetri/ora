import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card, CardSection, Button } from '../common';
import Header from '../Header/';
import NowOrderedList from './NowOrderedList';
import PastOrderedList from './PastOrderedList';
import FavouriteOrderedList from './FavouriteOrderedList';
import { setActiveTab, setActiveOrderTab, nowOrderedListFetch, pastOrderedListFetch, favouriteOrderedListFetch } from '../../actions';

const NOW_ORDERED_LIST = 'nowOrderedList';
const PAST_ORDERED_LIST = 'pastOrderedList';
const FAVOURITE_ORDERED_LIST = 'favouriteOrderedList';

class OrdersPage extends Component {

  componentDidMount() {
    this.props.nowOrderedListFetch();
  }

  changetab(event){
    switch (event.i) {
      case 0:
        this.props.nowOrderedListFetch();
        break;
      case 1:
        this.props.pastOrderedListFetch();
        break;
      case 2:
        this.props.favouriteOrderedListFetch();
        break;
      default:
        break;
    }
    this.props.setActiveOrderTab(event.i);
  }

  renderOrdersMain(){
    if (this.props.user === undefined) {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'space-around'}}>
        <View style={styles.profile}>
          <View style={[styles.topGuest, {paddingTop:100}]}>
            <Image
              style={{width:200, height: 200}}
              source={require('../../../assets/not-logged-in.png')}
              />
            <Text style={styles.guestOopsText}>Oops! You are not logged in</Text>
          </View>
          <View style={styles.middleGuest}>
            <Text style={styles.guestAdviceText}>TO ORDER YOU MUST LOG IN</Text>
          </View>
        </View>
        </View>
      )
    }
    return(
      <ScrollableTabView
          style={{marginTop: 0, }}
          initialPage={0}
          locked={false}
          tabBarTextStyle={{color:'#757575', fontFamily: 'Gill Sans'}}
          tabBarUnderlineStyle={{backgroundColor:'#00E676', height:1.5}}
          renderTabBar={() => <ScrollableTabBar />}
          onChangeTab={(event)=>this.changetab(event)}
        >
          <NowOrderedList tabLabel="NOW" navigator={this.props.navigator} />
          <PastOrderedList tabLabel="PAST" navigator={this.props.navigator} />
          <FavouriteOrderedList tabLabel="FAVOURITE" navigator={this.props.navigator}/>
      </ScrollableTabView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.topbar} title={"Orders"} onBack={()=>this.props.setActiveTab('homepage')}/>
        {
          this.renderOrdersMain()
        }
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    user:state.user.user,
  }
}


function mapDispatchToProps (dispatch) {
  return {
      setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
      setActiveOrderTab:(id)=>dispatch(setActiveOrderTab(id)),
      nowOrderedListFetch: () => dispatch(nowOrderedListFetch()),
      pastOrderedListFetch: () => dispatch(pastOrderedListFetch()),
      favouriteOrderedListFetch: () => dispatch(favouriteOrderedListFetch()),
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
