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

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} underlayColor={'#2bbbad'} onPress={() => this.gotoRoute('login')}>
            <Text style={styles.buttonText}>{'Login'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor={'#2bbbad'} onPress={() => this.gotoRoute('waiting')}>
            <Text style={styles.buttonText}>{'Waiting Confirmation Page'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor={'#2bbbad'} onPress={() => this.gotoRoute('confirmation')}>
            <Text style={styles.buttonText}>{'Confirmation Page'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  gotoRoute(name) {
    return this.props.navigator.push({name: name});
  }
}

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
      case 'login':
        return <Login navigator={navigator} />
        break;
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
        return <Home navigator={navigator} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    backgroundColor: '#26a69a',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10
  },
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  }
});
