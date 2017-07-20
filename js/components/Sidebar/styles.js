import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:extraTopMargin,
    backgroundColor:'#fff',
    paddingBottom: 20
  },
  topbar:{
    position: 'relative',
    flex:0.3,
  },
  backButton: {
    position: 'absolute',
    //zIndex: 2,
    top: 5,
    right: 10,
    backgroundColor: 'transparent',
  },
  userPicStyle:{
    height: height * .25,
    width: width * .8,
  },
  stars: {
    position: 'absolute',
    height: height * .25,
    width: width * .8,
    // zIndex: 2,
    bottom: 0,
    left: 0,
  },
  logoWhite: {
    position: 'absolute',
    top:height*.04,
    left: (width * .6) / 2,
    height: 70,
    width: 70,
  },
  cityscape:{
    position: 'absolute',
    bottom: 0,
    width: width * .8,
    left: 0,
  },
  backicon:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 26,
  },
  topbarbottom:{
    flex: 0.9,
    paddingLeft:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider:{
    // flex:0.1,
    alignSelf: 'center',
    width:225,
    height: 1,
    backgroundColor: 'silver',
  },
  userNameText:{
    fontSize:14,
    letterSpacing:2,
    marginTop:5,
    fontFamily: 'Helvetica',
  },
  scrollbar:{
    flex:0.35,
    padding:10,
    paddingLeft:15,
  },
  listitems:{
    flexDirection: 'row',
    margin:15,
    alignItems: 'center',
  },
  itemLogo:{
    width:45,
    height:45,
  },
  itemsText:{
    fontFamily: 'Gill Sans',
    color: '#000',
    paddingLeft: 10,
    fontSize: 18,
  },
  contactUs:{
    flex:0.18,
  },
  contactUsBlock:{
    padding:10,
    alignItems:"center",
  },
  contactUsNumbers:{
    flexDirection: "row",
    margin:5,
  },
  numberdivider:{
    marginLeft:10,
    marginRight:10,
    width:1,
    height:20,
    backgroundColor:"silver",
  },
  bottombar:{
    flex:0.13,
    alignItems: 'center',
    flexDirection: 'column',
  },
  signOutBlock:{
    flex:0.05,
    alignSelf:"center",
  },
  signOutText:{
    textAlign:"center",
    fontFamily: 'Helvetica',
  },
  cityoralogo:{
    margin:5,
    justifyContent: 'flex-end',
    backgroundColor:"#000",
    alignItems: 'center'
  },
  poweredBy:{
    justifyContent: 'center',
    alignItems: 'center',
   // marginBottom: 20
  },
  logoText:{
    fontSize:12,
    color: '#757575',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
   // paddingBottom: 20
     marginBottom:18
  },

});
