import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
  },
  topbar:{
    flex:0.1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
   leftTopbar:{
    flex:0.15,
    alignSelf:'center',
  },
  menuIcon:{
    textAlign: 'center',
    color: '#757575',
  },
  midTopbar:{
    flex:0.65,
    alignItems:'center',
    flexDirection: 'row',
    //justifyContent: 'center',
  },
   rightTopbar:{
    flex: 0.2,
    alignSelf:'center',
    justifyContent: "center",
  },
  chevronIcon:{
    flex:0.2,
    textAlign: 'center',
    color: '#757575',
    fontSize: 18,
    paddingTop:3,
  },
  headerText:{
    flex:0.8,
    color:'grey',
    fontSize:18,
    padding: 5,
    textAlign: 'center',
    fontFamily : 'Roboto-LightItalic'
  },
  scrollbar:{
    flex:0.9,
    backgroundColor: "#C7C185"
  },
  offerImage:{
    width:width,
    height:280,
  },
  callUsBtn:{
    marginTop:10,
    flexDirection: "row",
    backgroundColor:"#6BDBFD",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width:180,
    borderRadius:5,
    padding:10
  },
  callusIcon:{
    color: "white"
  },
  callusText:{
    color: "white",
  },
  listOfrestroView:{
    padding:10,
  },
  listHeading:{
    color:'white',
    fontSize:16,
    textAlign: 'center',
    fontFamily : 'Roboto',
    paddingBottom:10,
  },
  restroCards:{
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius:5,
    borderColor:'rgba(0,0,0,0.2)',
    margin: 5,
    padding: 10,
    flexDirection: "row"
  },
  restroName:{
    fontFamily : 'Roboto-Light',
    fontSize: 16
  },
  restroLocation:{
    paddingLeft: 5,
    paddingTop: 2,
    fontFamily : 'Roboto-Light'
  }
});
