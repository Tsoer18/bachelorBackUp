import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PlayerScreen from './PlayerScreen';
import Modal from 'react-native-modal';

const DATA = [
    {
        id: 1,
        name: 'sponsor',
        image: require('./Din_forsyning.png')
    }
]

const SponsorScreen = ({props, navigation, route}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [userInput, setUserInput] = useState('');

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
      console.log('User input:', userInput);

      
      fetch('http://10.0.2.2:3000/participantsgiveaways', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giveaway_id: 1,
          participantname: userInput
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
         
          console.log(responseJson);
        })
        .catch(error => {
          
          console.error(error);
        });
  
    
      toggleModal();
    };

    const [sponsorData, setSponsorData] = useState([]);

    const { teamId } = route.params;
    console.log({teamId});

    const url = 'http://10.0.2.2:3000/sponsors?team_id=eq.' + teamId;
    console.log(url);

    useEffect(()=>{  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setSponsorData(data);
          })
          .catch(error => {
            console.error(error);
          });
        }, []);

    
    
        const [matchData, setMatchData] = useState([]);
        const [earliestMatchId, setEarliestMatchId] = useState(null);
      
        const matchurl = 'http://10.0.2.2:3000/matches?team_id=eq.' + teamId;
        console.log(matchurl);
      
        useEffect(() => {
          fetch(matchurl)
            .then(response => response.json())
            .then(data => {
              setMatchData(data);
      
              if (data.length > 0) {
                const currentDate = new Date();
                const upcomingMatches = data.filter(match => new Date(match.matchstart) > currentDate);
                upcomingMatches.sort((a, b) => new Date(a.matchstart) - new Date(b.matchstart));
      
                if (upcomingMatches.length > 0) {
                  setEarliestMatchId(upcomingMatches[0].match_id);
                }
              }
            })
            .catch(error => {
              console.error(error);
            });
        }, []);
      
        const earliestMatch = matchData.find(match => match.match_id === earliestMatchId);

        const getImageUrl = item => {
            return item.url;
          };

    return(
        <View style={styles.flatList}>
            <Text style={styles.text}>The match is sponsored by:</Text>
            <FlatList data={DATA} renderItem={({item}) => {
                return(
                    <Image source={item.image} style={styles.image}/>
                )
            }}/>

      <Modal isVisible={isModalVisible}>
        <View style={styles.backgroundColorModal}>
          <Text style={styles.text}>Enter your name:</Text>
          <TextInput
            value={userInput}
            onChangeText={text => setUserInput(text)}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>

            <Button style={styles.button} onPress={toggleModal} title="Participate in the giveaway"/>
            {earliestMatch && (
        
        <Text style={styles.text}>
          Upcomming match: {earliestMatch.matchstart}
          {'\n'}
          Match Opponent: {earliestMatch.matchopponent}
        </Text>
      )}
            <Button title="Vote for the player of the match" onPress={() => {
                navigation.navigate('PlayerScreen', {teamId, earliestMatchId});
                //navigation.navigate('Vote', {earliestMatchId});
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
  text:{
      fontSize: 20,
      alignItems: 'center',
      color: 'black',
      margin: 10
  },
  flatList:{
      alignItems: 'center',
      marginBottom: 10
     
  },
  button:{
      margin: 12
  }, 
  image:{
    marginBottom: 10
  },
  backgroundColorModal:{
      backgroundColor: 'white',
  },
})

export default SponsorScreen;