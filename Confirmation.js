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
          Congratulations... / Unfortunately...
        </Text>
        <Text style={style.instructions}>
          Your registration is accepted / rejected
        </Text>
      </View>
    );
  }
}
