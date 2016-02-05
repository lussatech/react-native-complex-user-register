'use strict';

import React, {
  Component,
  Navigator,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  BackAndroid
} from 'react-native';

import Confirmation from './Confirmation';
import Login from './Login';
import Register from './Register';
import Server, {host as Host, key as Key} from './Server';
import Style from './Style';
import Waiting from './Waiting';

export {Confirmation, Login, Register, Server, Host, Key, Style, Waiting};

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'home'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'register':
        return <Register navigator={navigator} />
        break;
      case 'waiting':
        return <Waiting navigator={navigator} />
        break;
      case 'confirmation':
        return <Confirmation navigator={navigator} />
        break;
      default:
        return <Login navigator={navigator} />
    }
  }
}

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});
