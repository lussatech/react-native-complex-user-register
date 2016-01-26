'use strict';

import React, {
  Component,
  Navigator,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

import Login from './Login';
import Register from './Register';
import Waiting from './Waiting';
import Confirmation from './Confirmation';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
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
    backgroundColor: '#EC7E48',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10
  },
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('login')}>
            <Text style={style.buttonText}>{'Login'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('waiting')}>
            <Text style={style.buttonText}>{'Waiting Confirmation Page'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('confirmation')}>
            <Text style={style.buttonText}>{'Confirmation Page'}</Text>
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
