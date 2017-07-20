import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop:extraTopMargin,
    // alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabPages: {
    flex: 0.9,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  tabBar: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopColor: '#e3e3e3',
    borderTopWidth: .5,
  },
  tabView:{
    padding:Platform.OS === "ios" ? 10 : 5,
    flex: 0.25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabIcon:{
    fontSize: 24,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#757575'
  },
  activeTabIcon:{
    fontSize:24,
    alignSelf: 'center',
    textAlign: 'center',
    color:'rgba(0,120,60,0.7)',
  },
  tabText:{
    fontSize:10,
    color: '#757575',
  },
  activeTabText:{
    fontSize:10,
    color: 'rgba(0,120,60,0.7)',
  },
});
