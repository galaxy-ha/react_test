import * as React from 'react';
import {useState} from "react";
import { Button, View, Text, StyleSheet,SafeAreaView, TextInput, Alert, Icon, Input } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';


    global.SavedData = null;
    global.UserSavedData = "";

  async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  var objData = JSON.parse(result);
  global.UserSavedData = JSON.parse(result);
  console.log("objData")
  console.log(objData)
  console.log("global.UserSavedData")
  console.log(global.UserSavedData.user_email)
}

function Login({ navigation }) {
	const ErrorAlert = () =>
    Alert.alert('Dear user', 'Log in failed !!!', [
      { text: 'Retry', onPress: () => console.log('Retry Pressed') },
    ]);
    const SuccessAlert = () =>
    Alert.alert('Dear user', '🔐 Loged in successfully 🔐', [
      { text: 'Ok', onPress: () => console.log('ok Pressed') },
    ]);

	function login() {
		
 getValueFor(email)

		if (email == global.UserSavedData.user_email && password == global.UserSavedData.user_password)
			{
				navigation.navigate('Home')
				SuccessAlert();
			}else{
				ErrorAlert();
				console.log("Log in failed")
			}
	
	}
  const [text, username] = React.useState(null);
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        email={email}
         placeholder="Enter Email address"
         onChangeText={(value) => setEmail(value)}
        value={text}
      />
      <TextInput
        style={styles.input}
        password={password}
         placeholder="Password"
         onChangeText={(value) => setPass(value)}
        value={text}
      /> 
    </SafeAreaView>
      <Text
      style={{ fontSize: 22, fontWeight: "bold", color: 'blue'}}
        title="Sign in"
        onPress={() => login()}
      >Sign in
      </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',flexDirection: 'row'}}>
      <Text>Don´t have account yet? </Text>
      <Text style={styles.signup}
        title="Sign up"
        onPress={() => navigation.navigate('Sign up')}
      >Sign up 
      </Text>
      <Text> here</Text>
      </View>
      
    </View>
  );
}
function SignupScreen({ navigation }) {

 const [text, onChangeText ] = React.useState(null);
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");



  const SuccessAlert= () =>
    Alert.alert('Dear user', 'Registration completed', [
      { text: 'Ok', onPress: () => console.log('Ok Pressed') },
    ]);
    const ErrorAlert = () =>
    Alert.alert('Dear user', 'Registration failed !!!', [
      { text: 'Retry', onPress: () => console.log('Retry Pressed') },
    ]);

  function register () {	
	if(email != "" && password != "" && name != "" && surname != "")
  	{
  		const userData = {
	"user_email": email,
	"user_password": password,
	"user_name": name,
	"user_surname": surname
	};
	global.SavedData = userData;
	console.log("Data saved")
	console.log(global.SavedData)

	var stringData = JSON.stringify(userData);
	
	save(email, stringData);
	SuccessAlert();
  	} else {
  		ErrorAlert();
  	}
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        email={email}
         placeholder="Enter Email address"
        onChangeText={(value) => setEmail(value)}
        value={text}
            
      />
      <TextInput
        style={styles.input}
        password={password}
         placeholder="Password"
         onChangeText={(value) => setPass(value)}
        value={text}
      />
      <TextInput
        style={styles.input}
        name={name}
         placeholder="Name"
         onChangeText={(value) => setName(value)}
        value={text}
      />
      <TextInput
        style={styles.input}
        surname={surname}
        value={text}
         placeholder="Surname"
         onChangeText={(value) => setSurname(value)}
      />
      <Text 
      style={{ fontSize: 22, fontWeight: "bold", color: 'darkcyan'}}
        title="Register"
        onPress={() => register() }
      >Register 
      </Text>
      
    </View>
  );
}
function Home({ navigation }) {
	return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>  
    <Text> Welcome </Text>
    <Text> Loged in successfully</Text>
    <Text 
      style={{ fontSize: 22, fontWeight: "bold", color: 'darkcyan'}}
        title="Edit Profile"
        onPress={() => navigation.navigate('Profile') }
      >Edit Profile 
      </Text>
    </View>
  );
  	
  }
  function Profile({ navigation }) {

  	function Update () {	
  		const ErrorAlert = () =>
    Alert.alert('Dear user', 'Update failed !!!', [
      { text: 'Retry', onPress: () => console.log('Retry Pressed') },
    ]);
    const SuccessAlert = () =>
    Alert.alert('Dear user', 'User Updated', [
      { text: 'Ok', onPress: () => console.log('ok Pressed') },
    ]);
	if(name != "" && surname != "")
  	{
  		const userData = {
	"user_email": global.SavedData.user_email,
	"user_password": global.SavedData.user_password,
	"user_name": name,
	"user_surname": surname
	};
	global.SavedData = userData;
	console.log("Data saved")
	console.log(global.SavedData)
	var stringData = JSON.stringify(userData);
	
	save(global.SavedData.user_email, stringData);
	SuccessAlert();
  	} else {
  		ErrorAlert();
  	}
  }

  	const [text, onChangeText ] = React.useState(null);
  	 const [name, setName] = useState("");
  	 const [surname, setSurname] = useState("");
  	return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>  
    <TextInput
        style={styles.input}
        name={name}
         placeholder="Name"
         onChangeText={(value) => setName(value)}
        value={global.SavedData.user_email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        name={name}
         placeholder="Name"
         onChangeText={(value) => setName(value)}
        value={text}
      />
      <TextInput
        style={styles.input}
        surname={surname}
        value={text}
         placeholder="Surname"
         onChangeText={(value) => setSurname(value)}
      />
      <Text 
      style={{ fontSize: 22, fontWeight: "bold", color: 'darkcyan'}}
        title="Update"
        onPress={() => Update() }
      >Update 
      </Text>
    </View>
  );
  }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign in">
        <Stack.Screen name="Sign in" component={Login} />
        <Stack.Screen name="Sign up" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  signup: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'blue'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300
  },
});

export default App;

