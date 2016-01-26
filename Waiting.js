'use strict';

import React, {
  Component,
  View,
  Text
} from 'react-native';

import style from './Style';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.instructions}>
          Please wait a moment...
        </Text>
        <Text style={style.instructions}>
          Currently, we are still process your registration.
        </Text>
      </View>
    );
  }
}
