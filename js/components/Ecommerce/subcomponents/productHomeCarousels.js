import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import CardView from 'react-native-cardview';
import styles from './styles';
const { width, height } = Dimensions.get("window");

const ProductHomeCarousels = ({arrayOfImages}) => {
  const dotStyle = <View style={styles.dotStyle} />
  const dotActiveStyle = <View style={styles.dotActiveStyle} />
  const conditionForShowButton = arrayOfImages.length > 1;
  return (
      <Swiper
        style={styles.wrapper}
        // showsButtons={conditionForShowButton}
        width={width}
        height={220}
        dot={dotStyle}
        activeDot={dotActiveStyle}
        autoplayTimeout = {5}
        >

        {
          arrayOfImages.map((avatar, index)=>{
            return (
                <Image
                  key={index}
                  style={styles.carouselImage}
                  resizeMode={'cover'}
                  source={{uri: avatar}}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.3)'}}/>
                </Image>
            );
          })
        }

      </Swiper>
  );
};


export default ProductHomeCarousels;
