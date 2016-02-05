### Installation
    npm i react-native-complex-user-register

### Generate Files
Before generate library files to your react-native-project, make sure that `lussatech-cli` is installed globally in your machine, otherwise use this command to install it:

    npm i lussatech-cli -g

If `lussatech-cli` have been installed, change directory to your react-native-project and run this command:

    lussatech generate react-native-complex-user-register

then the library files will be added automatically inside your react-native-project, e.g.

    react-native-project
    |_ ...
    |_ lib
      |_ react-native-complex-user-register
        |_ ...
        |_ index.js
        |_ ...

### Usage
```javascript
...
import ComplexAuth, {   // sample app
/* available components */
  Login,                // sample login view
  Register,             // sample register view
  Waiting,              // sample waiting confirmation view
  Confirmation,         // sample confirmation view
/* available constants  */  
  Server,               // sample api end-point
  Host,                 // sample host for api end-point
  Key,                  // sample key for asynstorage
  Style                 // sample styles
} from './lib/react-native-complex-user-register';

class Name extends Component {
  render() {
    return (
      <ComplexAuth />      // sample calling component
    );
  }
}
...
```

###### Manage API end-point
To manage api end-point, update `Server.js` based on your api end-point, e.g.

```javascript
# lib/react-native-complex-user-register/Server.js

...
export const  key = '@lussatech:session'; // key for asynstorage
export const host = 'http://example.com'; // host for api end-point
export default {
  auth: {
    register: function (data) {
      let url = `${host}/auth/register`,  // api url for register
          opt = {                         // optional second argument
            method: 'post',               //  to customize the HTTP request
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    ...
  },
  ...
};
...
```

#### Customize views
To customize views, update `Confirmation.js`, `Login.js`, `Register.js` and `Waiting.js` based on your need, e.g.

```javascript
# lib/react-native-complex-user-register/Register.js

...
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
           email: undefined,
        password: undefined,
        ...
      },
      ...
    };
  }

  render() {
    let fields = [
      {ref: 'email', placeholder: 'Email', keyboardType: 'email-address', secureTextEntry: false, style: [styles.inputText]},
      {ref: 'password', placeholder: 'Password', keyboardType: 'default', secureTextEntry: true, style: [styles.inputText]},
      ...
    ];

    return(
      ...
        <View key={'messages'}>
          {this.renderMessages()}
        </View>
        <View key={'email'}>
          <TextInput {...fields[0]} onChangeText={(text) => this.state.data.email = text} />
        </View>
        <View key={'password'}>
          <TextInput {...fields[1]} onChangeText={(text) => this.state.data.password = text} />
        </View>
        ...
        <TouchableHighlight onPress={() => this.onSubmit()}>
          <Text>{'Submit'}</Text>
        </TouchableHighlight>
      ...
    );
  }

  renderMessages() {
    if (this.state.messages.length > 0) {
      let messages = this.state.messages.map((val, key) => {
        if (val.message) return <Text style={styles.message} key={key}>{val.message}</Text>;
      });

      return messages;
    }
  }

  onSubmit() {
    ...
    /* check for empty value (validation) */
    let keys = Object.keys(this.state.data).map((val, key) => {
      if ([null, undefined, 'null', 'undefined', ''].indexOf(this.state.data[val]) > -1) return val;
    });

    this.setState({messages: []});

    argument.map((val, key) => {
      if (keys.indexOf(val.ref) > -1) this.setState({messages: this.state.messages.concat(val)});
    });

    if (this.state.messages.length > 0) return null;

    api.auth.register(this.state.data)                        // call api url for register
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json();
      })
      .then((responseData) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done(() => {
        ...
      });
  }
}
...
```
