'use strict';

import React, {
  Component,
  View,
  Text
} from 'react-native';

import styles from './Style';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.gotoRoute('confirmation');
    }, 2345);
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#FFEB3B'}}>
        <Text style={{textAlign:'center'}}>
          {`Please wait a moment...\n\nCurrently, we are still process your registration.`}
        </Text>
      </View>
    );
  }

  goBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }

  gotoRoute(name) {
    if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
      this.props.navigator.push({name: name});
    }
  }

  replaceRoute(name) {
    if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
      this.props.navigator.replace({name: name});
    }
  }
}
