import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './styles';
import { setActive } from '../../actions/appactivestate';
const { width, height } = Dimensions.get("window");
class ShowTutorials extends Component {
  constructor(props){
    super(props);
    this.state={
      nextGo:null
    }
  }

  componentWillMount(){
    if (this.props.location !== null) {
        this.setState({ nextGo: 'tabs' });
    }
  }

  componentWillUnmount(){
    this.props.setActive();
  }
  goToNext(){
    if (this.props.location !== null) {
      this.props.navigator.replace({id:'tabs'})
      return ;
    }
    this.props.navigator.replace({id:'select-location-2'})
  }

  render() {
    const dotStyle = <View style={styles.dotStyle} />
    const dotActiveStyle = <View style={styles.dotActiveStyle} />
    return(
      <View style={styles.container}>
        <Swiper
          height={height}
          style={styles.wrapper}
          loop={false}
          showsButtons={false}
          dot={dotStyle}
          activeDot={dotActiveStyle}
          >
            <Image
              style={styles.offerImage}
              resizeMode={'cover'}
              source={require('../../../assets/slider/1.jpg')}
              >
                <TouchableOpacity
                  style={styles.skip}
                  onPress={()=>this.goToNext()}
                  >
                    <Text style={styles.skipText}>SKIP</Text>
                    <Icon style={styles.checkoutIcon} name="chevron-right" />
                </TouchableOpacity>
                <View style={[styles.slides,{backgroundColor:'rgba(0,0,0,0.3)'}]}/>
            </Image>
            <Image
              style={styles.offerImage}
              resizeMode={'cover'}
              source={require('../../../assets/slider/2.jpg')}
              >
                <TouchableOpacity
                  style={styles.skip}
                  onPress={()=>this.goToNext()}
                  >
                    <Text style={styles.skipText}>SKIP</Text>
                    <Icon style={styles.checkoutIcon} name="chevron-right" />
                </TouchableOpacity>
                <View style={[styles.slides,{backgroundColor:'rgba(0,0,0,0.3)'}]}/>
            </Image>
            <Image
              style={styles.offerImage}
              resizeMode={'cover'}
              source={require('../../../assets/slider/3.jpg')}
              >
                <TouchableOpacity
                  style={styles.skip}
                  onPress={()=>this.goToNext()}
                  >
                    <Text style={styles.skipText}>SKIP</Text>
                    <Icon style={styles.checkoutIcon} name="chevron-right" />
                </TouchableOpacity>
                <View style={[styles.slides,{backgroundColor:'rgba(0,0,0,0.3)'}]}/>
            </Image>
            <Image
              style={styles.offerImage}
              resizeMode={'cover'}
              source={require('../../../assets/slider/4.jpg')}
              >
                <TouchableOpacity
                  style={styles.skip}
                  onPress={()=>this.goToNext()}
                  >
                    <Text style={styles.skipText}>CONTINUE</Text>
                    <Icon style={styles.checkoutIcon} name="chevron-right" />
                </TouchableOpacity>
            </Image>
        </Swiper>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    location: state.location.activeLocation,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActive:()=>dispatch(setActive()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTutorials)
