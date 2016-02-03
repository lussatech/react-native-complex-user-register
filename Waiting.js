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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Please wait a moment...
        </Text>
        <Text style={styles.instructions}>
          Currently, we are still process your registration.
        </Text>
      </View>
    );
  }
}
