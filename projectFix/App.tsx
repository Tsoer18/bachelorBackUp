/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import 'react-native-gesture-handler';
 import * as React from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack'
 import HomeScreen from './HomeScreen';
 import TeamScreenOB from './TeamScreenOB'
 import SponsorScreen from './SponsorScreen';
 import PlayerScreen from './PlayerScreen';
 
 const navigator = createStackNavigator();
 
 function App() {
   return (
     <NavigationContainer>
       <navigator.Navigator>
         <navigator.Screen name="Home" component={HomeScreen}/>
         <navigator.Screen name="OB" component={TeamScreenOB}/>
         <navigator.Screen name="SponsorScreen" component={SponsorScreen}/>
         <navigator.Screen name="PlayerScreen" component={PlayerScreen}/>
       </navigator.Navigator>
     </NavigationContainer>
     
   );
 }
 
 export default App;