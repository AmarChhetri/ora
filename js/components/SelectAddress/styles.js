import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:extraTopMargin,
    backgroundColor:'#FCFCFC',
    paddingBottom: 20,
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainContainer:{
    flex:0.9,
    padding:5,
  },
  headers:{
    fontFamily: 'Roboto-Regular',
    color: '#393939',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  savedaddress:{
    backgroundColor: "#fff",
    padding:10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottomColor: '#757575',
    borderBottomWidth: .5,
  },
  leftSavedAddress:{
    flex:0.7,
  },
  addressHeader:{
    fontSize:16,
    color:'#393939',
    fontFamily: 'Roboto-Regular',
  },
  addressBody:{
    marginTop:10,
  },
  addressText:{
    color:'grey',
    paddingTop: 0,
  },
  rightSavedAddress:{
    flex:0.3,
    alignSelf: "center",
    
  },
  deliverButton:{
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth:1,
    borderColor:'rgba(0,120,60,0.7)',
  },
  deliverButtonText:{
    fontSize:12,
    color:"rgba(0,120,60,0.7)",
    fontFamily: 'Helvetica',
    padding:10,
  },
  divider:{
    width:width-30,
    height:1,
    backgroundColor:"rgba(211,211,211,1)",
    marginTop:35,
    marginBottom:30,
  },
  addnewAddress:{
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 5,
    overflow: 'hidden',
    paddingBottom: 15,
  },
  textInput: {
    height: 40,
    backgroundColor: 'transparent',
    width:width-40,
    color:'#757575',
    fontSize: 16,
    paddingLeft: 5,
    marginLeft:0,
    fontFamily : 'Roboto-Light'
  },
  divider2:{
    alignSelf: 'center',
    width:width-40,
    height:1,
    backgroundColor:"silver"
  },
  addressline3:{
    flexDirection: "row",
    margin: 10,
    marginLeft: 0
  },
  textInput2:{
    height: 40,
    backgroundColor: 'transparent',
    flex: 0.3,
    color:'#757575',
    fontSize: 14,
    paddingLeft: 5,
    fontFamily : 'Roboto-Light'
  },
  divider3:{
    width:114,
    marginLeft:5,
    height:1,
    backgroundColor:"silver"
  },
  addAddressButtons:{
    flexDirection: "row"
  },
  addAddressLeftButton:{
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    flex:1,
    alignItems: "center",
    backgroundColor: "rgba(0,120,60,0.7)",
    borderRadius: 2,
    marginLeft: 2,
    marginRight:2,
    marginTop: 10,
    // shadowColor: 'grey',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 1,
  },
  buttonText:{
    fontSize:18,
    color:"white",
    padding:10,
    fontWeight:'bold',
    fontFamily:'Helvetica'
  },
  addAddressRightButton:{
    flex: 0.35,
    alignItems: "center",
    backgroundColor: "black"
  },

  headingBlock:{
    flex: .2,
    borderBottomColor: '#757575',
    borderBottomWidth: .5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
},

  headingText:{
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Helvetica',
  },

});
