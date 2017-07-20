import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FCFCFC"
  },
  searchBarAndFilterSection: {
    flexDirection: "row",
    height: 45,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  searchIcon:{
    backgroundColor: 'transparent',
    fontSize: 24,
    paddingLeft: 10,
  },
  textInput: {
    color:'#757575',
    fontSize:16,
    height: 50,
    flex: 0.8,
  },
  filterButton: {
    flex: 0.2,
    backgroundColor: "#6BDBFD",
    alignItems: 'center',
    justifyContent: "center"
  },
  listviewContainer:{
    padding:5,
  },
  resultObjectView:{
     flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding:5
  },
  left:{
    flex:0.3,
    height:90,
    borderRadius: 5,
   // backgroundColor:'silver'
  },
  right: {
  flex:0.7,
 // flexDirection: "row",
  paddingLeft:15,
  },

  divider:{
  height:1,
  alignSelf: 'stretch',
  backgroundColor: 'rgba(0,0,0,0.1)',
  marginTop: 12,
  marginBottom: 12,
  },

rightTop: {
  flex: 0.7,
  flexDirection: 'column',
},
  restroName:{
    paddingTop:10,
    fontSize:18,
  },
  restroDistance:{

  },

rightBottom: {
  flex:0,
  flexDirection: "row",
},
  status: {
    flex: 0.8,
    justifyContent: "flex-end",
  },
  statusText:{

  },
  rating: {
    flex:0.2,
    alignItems: "flex-end",
  },
  restroRating: {
    width: 28,
    height:28,
    borderRadius:14,
    backgroundColor: "silver",
    justifyContent: "center",
  },
  ratingText: {
    fontSize:14,
    alignSelf: 'center',
  },
  centered:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  centeredText:{
    padding:10,
    paddingLeft:16,
    // fontSize:16,
    color:'#757575',
    fontSize:16,
  },
  centered2:{
    paddingTop: height/3.2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
