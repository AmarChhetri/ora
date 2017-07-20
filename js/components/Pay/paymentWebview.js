import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyWeb extends Component {
  constructor(props){
    super(props);
    this.state={
      url:null,
    }
  }
  componentWillMount(){
    this.setState({
      url: this.props.url
    })
  }
  onLoadStart(){

  }
  _onNavigationStateChange(webViewState){
    const splittedUrl = webViewState.url.split('/');
    splittedUrl.map((item,index)=>{
      if (item === 'failed') {
        this.props.onFailure();
      }
      if (item === 'success') {
        setTimeout(()=>this.props.onSuccess(),1000);
      }
    })
  }
  render() {
    return (
      <WebView
       ref="webview"
       source={{uri:this.state.url}}
       onNavigationStateChange={this._onNavigationStateChange.bind(this)}
       javaScriptEnabled = {true}
       domStorageEnabled = {true}
       injectedJavaScript = {this.state.cookie}
       startInLoadingState={false}
        style={{marginTop: 20}}
      />
    );
  }
}

export default MyWeb;
