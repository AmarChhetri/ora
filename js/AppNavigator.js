import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Text, View, Platform, Navigator, BackAndroid } from 'react-native';
import Drawer from 'react-native-drawer';
import Splashscreen from './components/Splashscreen/';
import ShowTutorials from './components/ShowTutorials/';
import SelectLocation from './components/SelectLocation/';
import SelectLocation2 from './components/SelectLocation2/';
import SelectAddress from './components/SelectAddress/';
import RestaurantHome from './components/RestaurantHome/';
import RestroList from './components/RestroList/';
import Cart from './components/Cart/';
import CartShop from './components/Cart/CartShop';
import Pay from './components/Pay/';
import CuisineHome from './components/CuisineHome/';
import BestInTownHome from './components/BestInTownHome/';
import Tabs from './components/Tabs/';
import EditAddress from './components/EditUserAddress/';
import Sidebar from './components/Sidebar/';
import { closeDrawer } from './actions/sidebar';
import { setActiveTab, hideProductDisplay } from './actions';
import ProductDetailsTab from './components/ProductDetailsTab';
import ReturnItem from './components/OrdersPage/components/ReturnItem';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;

class AppNavigator extends Component {
  constructor(props){
    super(props);
    this.state={
      startColor:'',
      endColor:'',
      showIndicator: false,
    }

    this._pasEditUnmountFunction = this._pasEditUnmountFunction.bind(this);
  }
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.drawerState === 'opened') {
      this.openDrawer();
    }else if (nextProps.drawerState === 'closed') {
      this.closeDrawer();
    }
  }

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress',this._pasEditUnmountFunction)
  }

  _pasEditUnmountFunction(){
    const routes = this.refs.navigator.getCurrentRoutes();
    const { activeTab, productHome } = this.props;

     if ((routes[routes.length - 1].id === 'tabs' && activeTab === 'homepage') || routes[routes.length-1].id === 'select-location-2') {
               // CLose the app
       return false;
     }
    else if ((routes[routes.length - 1].id === 'tabs' && activeTab !== 'homepage')) {
      this.props.setActiveTab('homepage');
      return true;
    }
    else if (routes[routes.length - 1].id === 'product-details-tab-home') {
      if (productHome) {
        this.props.hideProductDisplay();
        return true;
      }
      this.refs.navigator.pop();
      return true;
    }
    else if (routes[routes.length - 1].id !== 'tabs') {
      this.refs.navigator.pop();
      return true;
    }
     return true;
  }
  configureScene(route){
      // return CustomSceneConfig;
      switch (route.id) {
          case 'splashscreen':
              return Navigator.SceneConfigs.FloatFromRight;
          case 'cart':
          case 'restro-home':
              return Navigator.SceneConfigs.FloatFromBottom;
          default :
              return Navigator.SceneConfigs.FloatFromRight;
      }
    }
  // Map Navigator routes to rendering fragments. A route is an object with an id attribute (and
  // possibly other attributes).
  renderScene(route, nav) {
    switch (route.id) {
      case 'splashscreen':
        return (
            <Splashscreen navigator={nav}/>
            );
      case 'show-tutorials':
        return (
            <ShowTutorials navigator={nav}/>
            );
      case 'select-location':
        return (
            <SelectLocation navigator={nav}/>
            );
      case 'select-location-2':
        return (
            <SelectLocation2 navigator={nav}/>
            );
      case 'tabs':
        return (
            <Tabs navigator={nav} />
            );
      case 'restro-home':
        return (
            <RestaurantHome
              navigator={nav}
              restroId={route.restroId}
              menuId={route.menuId}
              img={route.img}
              status={route.status}
              />
            );
      case 'cuisine-home':
        return (
            <CuisineHome navigator={nav} cuisineId={route.cuisineId} cuisine={route.cuisine} />
            );
      case 'best-in-town-home':
        return (
            <BestInTownHome navigator={nav} bestId={route.bestId} title={route.title} />
            );
      case 'restro-list':
        return (
            <RestroList navigator={nav} />
            );
      case 'select-address':
        return (
            <SelectAddress navigator={nav} from={route.from}/>
            );
      case 'edit-address':
        return (
            <EditAddress navigator={nav} address={route.address}/>
            );
      case 'cart':
        return (
            <Cart navigator={nav} item={route.item} from={route.from}/>
            );
      case 'cart-shop':
        return (
          <CartShop navigator={nav} item={route.item} from={route.from}/>
        );
      case 'pay':
        return (
            <Pay navigator={nav} from={route.from}/>
            );
     case 'product-details-tab-home':
      return (
          <ProductDetailsTab
            catId={route.catId}
            initialPage={route.initialPage}
            tabLabels = {route.tabLabels}
            navigator={nav} />
          );
      case 'return-item':
        return (
            <ReturnItem
              navigator={nav}
              itemToReturn= {route.itemToReturn}
               />
            );
      default:
        return(
            <Splashscreen navigator={nav} />
        );
    }
  }
  render() {
    const drawerStyles = {
        drawer: {
          marginTop: extraTopMargin,
        },
        main: {
          // backgroundColor: null,
        },
        mainOverlay :{
          backgroundColor:this.props.drawerState === 'opened'?'rgba(0,0,0,0.7)':null
        },
        drawerOverlay:{

        }
      }
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <Sidebar navigator={this._navigator} />
        }
        tapToClose
        styles={drawerStyles}
        negotiatePan
        onClose={() => this.props.closeDrawer()}
        acceptPan={false}
        tweenDuration={200}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        closedDrawerOffset={() => 0}
        >
        <Navigator
          ref="navigator"
          style={{backgroundColor:'#EAEAEA',}}
          configureScene={this.configureScene}
          initialRoute={{id: 'splashscreen'}}
          renderScene={(route, nav) => {
              return this.renderScene(route, nav); }} />
      </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
  hideProductDisplay:()=>dispatch(hideProductDisplay()),
});

const mapStateToProps = state => ({
  drawerState: state.sidebar.drawerState,
  activeTab: state.tab.activeTab,
  productHome: state.ecommerce.productHome
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
