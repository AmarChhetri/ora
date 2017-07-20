import React from 'react';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("window");
const localStyles ={
  container:{
    //margin:3,
    width:width/2-2,
    height:180,
    justifyContent:'center',
    flexDirection: "column",
  },
  productImage:{
    flex:0.8,
  },
  productDetail:{
    backgroundColor: "#E0F2F1",
    flex:0.2,
    padding:5,
  },
  productNameView:{
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(102, 102, 102, .8)',
    width:width/2-2,
    paddingBottom: 15,
  },
  productName:{
    paddingTop: 5,
    marginRight: 10,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    fontWeight: '600',
    color:"#fff"
  },
  priceView:{
    flex: 0.5,
  },
  productPrice:{
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Roboto',
  }
}

const Productcard = ({ product, viewProduct}) => {
  const { name, description, price, avatar } = product;
  return(
        <TouchableOpacity
          onPress={viewProduct}
          style={localStyles.container}
        >
          <Image
            source={{uri: avatar}}
            resizeMode='stretch'
            style={localStyles.productImage}
          >
            <View style={localStyles.productNameView}>
              <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={localStyles.productName}>
                {name}
              </Text>
              <View style={localStyles.priceView}>
                <Text style={localStyles.productPrice}>₹ {price}</Text>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
  );
};

export default Productcard;
