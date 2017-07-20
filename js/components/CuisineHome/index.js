import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardView from 'react-native-cardview';
import { Text, Image, View, TouchableOpacity, ScrollView, ActivityIndicator, InteractionManager } from 'react-native';
import Header from '../Header/'
import { fetchRestaurant, clearCuisine } from '../../actions/cuisine';
import { sortDistance } from '../../utility/sort';
import { Spinner } from '../common';
import styles from './styles';

var moment = require('moment');
class CuisineHome extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const cuisineId = this.props.cuisineId;
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchRestaurant(cuisineId);
    });
  }
  componentWillReceiveProps(nextProps){
    // console.log("next props", nextProps.restaurantList);
  }

  componentWillUnmount(){
    this.props.clearCuisine();
  }

  componentWi
  render() {
    const restaurantList = this.props.restaurantList;
    return(
      <View style={styles.container}>
        <Header
          onBack={()=>this.props.navigator.pop()}
          style={styles.topbar}
          showCart={true}
          title={this.props.cuisine}
          navigator={this.props.navigator}
          />
        {
          this.renderList(restaurantList)
        }

      </View>
    );
  }

  //
  // Got to restro Home
  //
  gotoRestroHome(id,menu,img,status){
    this.props.navigator.push({
      id:'restro-home',
      restroId:id,
      menuId:menu,
      img:img,
      status:status
    })
  }
  //
  // Render the list of restaurants
  //
  renderList(restaurantList){
    if (restaurantList.isInit || restaurantList.isFetching) {
      return(
        <Spinner size="large" />
      );
    }
    return (
     <ScrollView style={styles.listviewContainer}>
        {
          restaurantList.restaurants.sort(sortDistance).map((item, index)=>{
            let http = item.avatar.split(":");
            const imgUrl = http.map((item,index)=>{
              if (item == 'http' && index === 0) {
                return 'https:'
              }else if (item == 'https' && index === 0) {
                return 'https:'
              }
              return item
            })
            const openTime = moment(item.open.date);
            const closeTime = moment(item.close.date);
            var currentTime = moment();
            let status = moment(currentTime).isBetween(openTime,closeTime)? '':'CLOSED';
            if (item.is_closed) {
              status = 'CLOSED'
            }
            const url = imgUrl[0].concat(imgUrl[1]);
            const distance = Math.round(item.distance * 100) / 100;
            return (
              <View style={{marginBottom: 5,}} key={index}>
                <CardView
                  cardElevation={3}
                  cardMaxElevation={3}
                  cornerRadius={5}
                >
                  <TouchableOpacity
                    style={styles.resultObjectView}
                    onPress={()=>this.gotoRestroHome(item.id,item.menu,url,status)}
                  >
                    <Image
                      source={{uri: `${url}`}}
                      style={styles.left}
                      />
                    <View style={styles.right}>
                      <View style={styles.rightTop}>
                          <View><Text style={styles.restroName}>{item.name}</Text></View>
                          <View style={styles.divider}></View>

                          <View style = {{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems:'flex-end'}}>
                            <Text style={[styles.restroDistance, {fontStyle :'italic'}]}>{distance} kms away</Text>
                            <Text style= {{textAlign: 'center', color:'red', fontSize: 12, flex: .3}}>
                              {status}
                            </Text>
                          </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardView>
              </View>

            )
          })
        }
    </ScrollView>
      );
    }
}
function mapStateToProps (state) {
  return {
    restaurantList:state.cuisine,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchRestaurant:(id)=>dispatch(fetchRestaurant(id)),
    clearCuisine:()=>dispatch(clearCuisine()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(CuisineHome);
