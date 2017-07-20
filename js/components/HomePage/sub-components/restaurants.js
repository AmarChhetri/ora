import React, { Component } from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardView from 'react-native-cardview';
import { sortDistance } from '../../../utility/sort';
import styles from '../styles';

var moment = require('moment');
class Restaurants extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }

  render() {
    const restaurants = this.props.restaurant.restaurants.sort( sortDistance );
    if (this.props.restaurant.isFetching) {
      return(
        <View
          style={{flexDirection: 'row'}}
        >
          <View style={[styles.cards,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <ActivityIndicator
              animating={true}
              color="#00E676"
              size="large"/>
          </View>
          <View style={[styles.cards,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <ActivityIndicator
              animating={true}
              color="#00E676"
              size="large"/>
          </View>
        </View>
      )
    }
    return(
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.sectionScrollView}
        >
          {
            restaurants.map((item, index)=>{
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
                <View key={index}>
                  <CardView
                    style={styles.CardView}
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={0}
                    >
                <TouchableOpacity
                  onPress={()=>this.props.gotoRestroHome(item.id,item.menu,url,status)}
                >
                  <Image
                    source={{uri: `${url}`}}
                    resizeMode={'stretch'}
                    style={styles.cards2}
                    >
                    <View style={[styles.cards2, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                      <Text style={[styles.restaurantName,styles.italicText]}>{item.name}</Text>
                      <View style={styles.restaurantBrief}>
                        <View style={styles.restaurantDistance}>
                          <Text style={[{fontStyle :'italic'},{color:'#fff', fontSize: 12}]}>{distance} kms</Text>
                        </View>
                        {
                          item.rating !== null
                          &&
                          <View style={styles.restaurantRating}>
                            <Text style={{color:'#fff', fontWeight: '600', fontSize: 13}}>{item.rating.avg_rating}</Text>
                          </View>
                        }
                      </View>
                    </View>
                  </Image>
                </TouchableOpacity>
              </CardView>
            </View>
              )
            })
          }
          <View>
            <CardView
              style={styles.CardView}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={0}
              >
          <TouchableOpacity
            style={{backgroundColor:'#fff'}}
            onPress={()=>this.props.gotoRestroList()}
          >
            <Image
              source={require('../../../../assets/image/collage.jpg')}
              resizeMode={'stretch'}
              style={styles.cards2}
            >
              <View style={[styles.cards2, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                <View style={styles.restnameBlock}>
                  <Text style={[styles.restName,styles.italicText]}>More</Text>
                  <Icon 
                    style={{color: '#fff', flex: .5, textAlign: 'left', paddingTop: 10,}}  
                    name="more-horiz" 
                    size={24}
                  />
                </View>
                <View style={styles.restaurantBrief}>
                  <View style={styles.restaurantDistance}>
                </View>
                </View>
              </View>
                        
            </Image>
            {/*<View style={[styles.cards2, {backgroundColor:'#757575'}]}>
              <Text style={[styles.restaurantName,styles.italicText]}><Icon  name="plus" size={15} /> More</Text>
              <View style={styles.restaurantBrief}>
                <View style={styles.restaurantDistance}>
                </View>
              </View>
            </View>*/}
          </TouchableOpacity>
        </CardView>
      </View>
        </ScrollView>
    );
  }
}

module.exports = Restaurants;
