import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    height:height,
    marginTop:extraTopMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#000',
  },
  imageView:{
    flex:0.5,
    paddingTop:100,
  },
  imageStyle:{
    alignSelf:'center',
    width:200,
    height:200,
  },
  headerView:{
    alignItems:'center',
    marginTop:20,
  },
  headerText:{
    color:'#fff',
    backgroundColor:"rgba(0,0,0,0)",
    fontSize: 20,
    fontWeight: '600',
    alignSelf:'center',
  }
});
