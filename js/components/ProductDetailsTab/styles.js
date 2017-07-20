import { StyleSheet, Platform, Dimensions } from 'react-native';
const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    marginTop:extraTopMargin,
    flex: 1,
    backgroundColor:'#F8F8F8',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  tabview:{
    flex:0.9,
    backgroundColor: '#F8F8F8',
  }
});
