import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EmailValidator from "../../utility/validate_email";
import { updateUserDetails } from '../../actions/user';
import { Spinner } from "../common/";
import styles from './styles';

const { width } = Dimensions.get("window");
class EditDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      editableUserDetails:false,
      showUpdateButton: false,
      username:"",
      phone: "",
      email: "",
    }
  }

  componentWillMount(){
    this.setState({
      username:this.props.username,
      email: this.props.email,
      phone: this.props.phone,
    })
  }

  //
  // Deals in state changes relating to the component
  //
  componentWillReceiveProps(nextProps){
    const userUpdateObj = nextProps.userUpdateObj;
    if (userUpdateObj.userDetailsUpdating) {
      this.setState({
        showSpinner:true
      })
    }else if (userUpdateObj.userDetailsUpdated) {
      this.setState({
        showSpinner:false,
        editableUserDetails:false,
        showUpdateButton:false,
      })
    }else if (userUpdateObj.userDetailsUpdateerror) {
      this.setState({
        showSpinner:false,
        editableUserDetails:true,
        showUpdateButton:true,
        error:true,
        errorMessage: "User details update failed"
      })
    }
  }

  capitalizeFirstLetter(string) {
    return string.substring(0,1).toUpperCase() + string.slice(1);
  }
  //
  // Enables ediatablity
  //
  editUserDetails(){
    this.setState({
      editableUserDetails:true,
      showUpdateButton:true,
    })
  }
  cancelUpdate(){
    this.setState({
      username:this.props.username,
      email: this.props.email,
      showSpinner:false,
      error: false,
      editableUserDetails:false,
      showUpdateButton:false,
    })
  }
  updateUserDetails(){
      const validate = EmailValidator.validate(this.state.email);
      if(this.state.username === ""){
        // this.setState({ error: true, errorMessage: "Username cannot be blank" });
        this.props.alertMessage.alertWithType('error', 'Error', "Username cannot be blank");
        return;
      }else if (validate.error) {
        // this.setState({ error: validate.error, errorMessage: validate.errorMessage });
        this.props.alertMessage.alertWithType('error', 'Error', validate.errorMessage);
        return ;
      }
      this.props.updateUserDetails(this.state.username, this.state.email);
  }

  renderButtonIcon(){
    if (this.state.showSpinner) {
      return <Spinner size="small"/>
    }
    return <Text style={styles.cancelText}>Done</Text>
  }

  render() {
    const { username, email } = this.state;
    return (
          <View style={styles.topHost}>
            <View style={styles.userPicView}>
              <View style={styles.userBackground}>
                <Text style={styles.userInitial}>{this.state.username.substring(0,1).toUpperCase()}</Text>
              </View>
            </View>
            {
              !this.state.editableUserDetails &&
              <View style={styles.userInfo}>
                <Text style={styles.welcomeText}>Welcome {this.capitalizeFirstLetter(this.state.username.split(' ')[0])}</Text>
                <Text style={styles.userPhone}>+{this.state.phone}</Text>
                <Text style={styles.userPhone}>{this.state.email}</Text>
              </View>
            }
            {
              this.state.editableUserDetails &&
              <View style={styles.userUpdate}>
                <View style={{borderBottomColor: '#757575', borderBottomWidth: 1, padding: 0,}}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.userUpdateInput}
                    tintColor={this.state.editableUserDetails?"rgba(0,120,60,0.5)":"transparent"}
                    placeholderTextColor ={"grey"}
                    editable={this.state.editableUserDetails}
                    autoFocus={this.state.showUpdateButton}
                    value={this.state.username}
                    onChangeText={(text)=>this.setState({username:text})}
                  />
                </View>
                <View style={{borderBottomColor: '#757575', borderBottomWidth: 1, padding: 0}}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.userUpdateInput}
                    keyboardType={"email-address"}
                    tintColor={this.state.editableUserDetails?"rgba(0,120,60,0.5)":"transparent"}
                    editable={this.state.editableUserDetails}
                    autoCapitalize={"none"}
                    value={this.state.email}
                    onChangeText={(text)=>this.setState({email:text})}
                  />
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={()=>this.cancelUpdate()}
                    style={styles.cancelButton}
                    >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={()=>this.updateUserDetails()}

                    >
                    {
                        this.renderButtonIcon()
                    }
                  </TouchableOpacity>
                </View>
              </View>
            }

            {
              !this.state.showUpdateButton &&
              <TouchableOpacity
                style={styles.editProfile}
                onPress={()=>this.editUserDetails()}
              >
                <MaterialIcon style={styles.editIcon} name="edit" />
              </TouchableOpacity>
            }
          </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    userUpdateObj: state.user.userUpdateObj,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateUserDetails:(username,email)=>dispatch(updateUserDetails(username,email)),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(EditDetails);
