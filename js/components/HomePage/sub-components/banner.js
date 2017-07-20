import React, { Component } from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import CardView from 'react-native-cardview';
import styles from '../styles';

class Banner extends Component {
  constructor(props){
    super(props);
  }

  renderBanners(arrayOfBanners){
    return arrayOfBanners.map((item,index)=>
        <Image
          key={index}
          style={styles.offerImage}
          resizeMode={'cover'}
          source={{uri: `${item.avatar}`}}
          >
            <View style={[styles.slides,{backgroundColor:'rgba(0,0,0,0)'}]}/>
        </Image>
    )
  }

  render() {
    const banners = this.props.data;
    if (banners.isFetching || banners.banners.length === 0) {
      return null;
    }
    return(
      <View style={styles.offersCarousel}>
        <Swiper
          height={220}
          style={styles.wrapper}
          showsButtons={false}
          dot={this.props.dotStyle}
          activeDot={this.props.dotActiveStyle}
          autoplay
          autoplayTimeout = {5}
          >
            {
              this.renderBanners(banners.banners)
            }
        </Swiper>
      </View>
    );
  }
}

module.exports = Banner;
