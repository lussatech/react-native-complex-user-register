'use strict';

import React, {
  Component,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  AsyncStorage,
  Navigator
} from 'react-native';

import style from './Style';
import api, {host, key} from './Server';
import Register from './Register';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
           email: undefined,
        password: undefined,
            role: 0
      },
      loading: false
    };
  }

  render() {
    return (
      <ScrollView ref={'loginForm'}>
        <Text style={style.title}>LOGIN</Text>
        <View key={'email'}>
          <TextInput ref={'email'} placeholder={'Email'} keyboardType={'email-address'} secureTextEntry={false} onFocus={this.onFocus.bind(this, 'email')} onChangeText={(text) => this.state.data.email = text} value={this.state.data.email} />
        </View>
        <View key={'password'}>
          <TextInput ref={'password'} placeholder={'Password'} keyboardType={'default'} secureTextEntry={true} onFocus={this.onFocus.bind(this, 'password')} onChangeText={(text) => this.state.data.password = text} value={this.state.data.password} />
        </View>
        <TouchableHighlight style={style.button} onPress={this.onSubmit.bind(this)}>
          <Text style={style.buttonText}>{this.state.loading ? 'Please Wait . . .' : 'Submit'}</Text>
        </TouchableHighlight>
        <Text style={style.orText}>OR</Text>
        <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('register')}>
          <Text style={style.buttonText}>{'Register as Seller'}</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  onFocus(argument) {
    setTimeout(() => {
      let scrollResponder = this.refs.loginForm.getScrollResponder();
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            React.findNodeHandle(this.refs[argument]), 110, true
          );
    }, 50);
  }

  onSubmit() {
    if (this.state.loading) {
      ToastAndroid.show('Please Wait . . .', ToastAndroid.SHORT);
      return;
    }

    this.setState({
      loading: true
    });

    api.auth.login(this.state.data)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        this.onSuccess(responseData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
      })
      .done();
  }

  gotoRoute(name) {
    return this.props.navigator.push({name: name});
  }

  async onSuccess(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
      this.props.navigator.pop();
    } catch (error) {
      ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
    }
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'login'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'register':
        return <Register navigator={navigator} />
        break;
      default:
        return <Login navigator={navigator} />
    }
  }
}
