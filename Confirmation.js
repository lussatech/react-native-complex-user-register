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
      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#CDDC39'}}>
        <Text style={{textAlign:'center'}}>
          {`Congratulations... / Unfortunately...\n\nYour registration is accepted / rejected`}
        </Text>
      </View>
    );
  }
}
