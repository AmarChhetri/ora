import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:extraTopMargin,
    backgroundColor:'#FCFCFC',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent', 
    flexDirection: 'row',
  },
  mainContainer:{
    flex:0.8,
    padding:10,
  },
  radioBlock:{ 
    flexDirection: "row",
    borderColor:  'rgba(0,120,60,0.7)',
    borderWidth: 1,
    margin:15,
    height:80,
    padding:10,
    paddingTop:20,
    paddingBottom:20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 15
  },
  radioButton:{
    // flex:0.3
    borderColor:  'rgba(0,120,60,0.7)',
  },
  radioText:{
    fontSize: 20,
    paddingLeft: 20,
    color: "grey",
    textAlign: "center",
    fontFamily: "Roboto-Regular"
  },
  bottombar:{
    flex:0.1,
    flexDirection: "row"
  },
  addAddressLeftButton:{
    flex:0.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    flexDirection: "row",
  },
  buttonText:{
    fontSize:16,
    color:"white",
    padding:10,
    fontFamily:'Helvetica'
  },
  totalPrice:{
    fontSize:16,
    color:"white",
    // padding:10,
    fontFamily:'Helvetica'
  },
  addAddressRightButton:{
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0,120,60,0.7)',
  }
});
