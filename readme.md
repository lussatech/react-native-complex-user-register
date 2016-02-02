## Requirements:

    lussatech-cli

-----
## Content:
* [Step 1: Get the code](#step1)
* [Step 2: Generate files](#step2)
* [Step 3: Customize files](#step3)

-----
<a name="step1"></a>
### Step 1: Get the code

    npm install react-native-complex-user-register

-----
<a name="step2"></a>
### Step 2: Generate files

    lussatech generate react-native-complex-user-register

-----
<a name="step3"></a>
### Step 3: Customize files

    react-native-project
    ...
    |_ lib
      |_ react-native-complex-user-register
        |_ Example
        |_ ...
        |_ Register.js
        |_ ...
        |_ Server.js
    ...

#### Setting up your API end-point at `Server.js`
```javascript
# lib/react-native-complex-user-register/Server.js

export const  key = '@lussatech:session';       // key for asynstorage
export const host = 'http://example.com';
export default {
  auth: {
    login: function (data) {
      let url = host + '/auth/login',           // API URI for login
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    ...
  }
  ...
};
```
#### Customize your `Login` and `Register` authentication form, e.g.
```javascript
# lib/react-native-complex-user-register/Login.js

...
import api, {host,key} from './Server';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: undefined,
        ...
      },
      ...
    };
  }

  render() {
    return(
      <ScrollView ref={'loginForm'}>
        <Text style={style.title}>LOGIN</Text>
        <View key={'email'}>
          <TextInput
            ref={'email'}
            placeholder={'Email'}
            ...
            onChangeText={(text) => this.state.data.email = text}
            value={this.state.data.email} />
        </View>
        ...
        <TouchableHighlight style={style.button} onPress={this.onSubmit.bind(this)}>
          <Text style={style.buttonText}>{this.state.loading ? 'Please Wait . . .' : 'Submit'}</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  onSubmit() {
    ...
    api.auth.login(this.state.data)                           // call API URI for login
      .then((response) => {
        ...
      })
      .then((responseData) => {
        this.onSuccess(responseData);
      })
      .catch((error) => {
        ...
      })
      .done();
  }

  async onSuccess(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));  // save response data on asynstorage as session
      ...
    } catch (error) {
      ...
    }
  }
}
...
```

#### Import `Login.js`, `Register.js`, `Waiting.js` and `Confirmation.js` to your _react-native-project_, e.g.
```javascript
# index.android.js

...
import Login from './lib/react-native-complex-user-register/Login';

class Name extends Component {
  render() {
    return <Login />;
  }
}
...
```

#### Or import `Example` to your _react-native-project_ to see an example, e.g.
```javascript
# index.android.js

...
import Example from './lib/react-native-complex-user-register/Example';

class Name extends Component {
  render() {
    return <Example />;
  }
}
...
```
