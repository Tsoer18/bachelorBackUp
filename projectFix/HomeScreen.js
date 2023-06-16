import React, {useEffect, useState} from 'react';
import {Text, FlatList, SafeAreaView, StyleSheet, View, Image, Dimensions} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import TeamScreenOB from './TeamScreenOB';




const HomeScreen = (props) => {
  const [clubData, setClubData] = useState([]);

  useEffect(()=>{  
    fetch('http://10.0.2.2:3000/clubs')
      .then(response => response.json())
      .then(data => {
        setClubData(data);
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

      console.log(clubData);

      const clubNames = clubData.map(club => club.clubname);
      const clubId = clubData.map(club => club.id);
      const clubUrl = clubData.map(club => club.clublogourl);

      const onPressHandle = (clubId) => {
        const clubUrlSingle = clubUrl[clubId];
        props.navigation.navigate('OB', {clubId, clubUrl});
      }
  
  return (
    <View style={styles.background}>
      <FlatList
        style={styles.shadow}
        ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
        data={clubUrl}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        
        <TouchableHighlight onPress={() => onPressHandle(clubId[index])}>
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableHighlight> )}/>
    </View>
  );
};

const styles = StyleSheet.create({
  image:{
    height: 120,
    width: '100%',
    resizeMode: "cover",
  },
  shadow:{
    shadowColor: 'black',
    shadowRadius: 24,
    shadowOffset: {width:0 , height: 10,},
    shadowOpacity: 0.5,
    elevation: 12,
  },
  background:{
    backgroundColor: "white"
  }
});

export default HomeScreen