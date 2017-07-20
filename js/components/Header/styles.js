//
// Styles for Header component.
//

import { StyleSheet, Platform } from "react-native";

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
module.exports = StyleSheet.create({
  toolbar: {
    flex: 0.1,
    //marginTop: extraTopMargin,
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  toolbarTitle: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarButton: {
    flex: 0.15,
    justifyContent: "center",
    padding: 0,
  },
  toolbarRight: {
    flex: 0.15,
    alignSelf:'center',
    justifyContent: "center",
    flexDirection:"row",
  },
  backIcon: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 22,
  },
  blockDetails: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
  },
  headerText:{
    color:'grey',
    fontSize:18,
    padding: 5,
    // paddingTop: 10,
    // paddingBottom: 10,
    textAlign: "center",

  },
  italicText:{
    fontFamily : 'Helvetica'
  },

  cartStyle:{
    position: "absolute",
    width:16,
    height:16,
    borderRadius:8,
    backgroundColor: "#00C0AF",
    left:32,
  },
});
