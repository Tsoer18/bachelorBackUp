import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SponsorScreen from './SponsorScreen';
 
    

const TeamScreenOB = (props) => {

  const { clubId, clubUrl } = props.route.params;
  console.log({clubId});
  console.log(clubUrl);
  const clubImageUrl = clubUrl[0]; 
  console.log(clubImageUrl);


  const url = 'http://10.0.2.2:3000/teams?club_id=eq.' + clubId;
  console.log(url);
  
  const [teamData, setTeamData] = useState([]);

  useEffect(()=>{  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTeamData(data);
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

      console.log(teamData);

      const teamNames = teamData.map(team => team.teamname);
      const teamId = teamData.map(team => team.team_id);

      const onPressHandle = (teamId) => {
        props.navigation.navigate('SponsorScreen', {teamId});
      }

    return(
      <View>
        <Image source={{ uri: clubImageUrl }} style={styles.image}/>
        {teamNames.map((name, index) => (
        <View style={[styles.container, index === 0 && styles.firstContainer]}>
        <TouchableHighlight  key={index} onPress={() => onPressHandle(teamId[index])}>
          <Text style={styles.text} key={index}>{name}</Text>
        </TouchableHighlight>
        </View>
        ))}
      </View>
    );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  firstContainer: {
    borderTopColor: 'black',
    borderTopWidth: 3,
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: "cover",
    marginBottom: 20
  },
});


export default TeamScreenOB;