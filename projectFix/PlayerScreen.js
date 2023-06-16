import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


const PlayerScreen = (props) => {
  
    const [lastClickedPlayerIndex, setLastClickedPlayerIndex] = useState(null);


      const { earliestMatchId } = props.route.params;
      console.log('here ' + earliestMatchId);

      const [voteData, setVoteData] = useState([]);

      const urlVotes = 'http://10.0.2.2:3000/votes?match_id=eq.' + earliestMatchId;
     
      const [voteId, setVoteIdData] = useState();

      useEffect(()=>{  
        fetch(urlVotes)
          .then(response => response.json())
          .then(data => {
            setVoteData(data);
            //const voteUrlId = voteData.map(vote => vote.voteid);
            setVoteIdData(voteData.map(vote => vote.voteid));
          })
          .catch(error => {
            console.error(error);
          });
        }, []);

        const voteUrlId = voteData.map(vote => vote.voteid);
        //setVoteIdData(voteData.map(vote => vote.voteid));
  

     
        //setVoteIdData(voteState[0].voteid);
     
  

    
  const [playerIds, setPlayerIds] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [nVotes, setNVotes] = useState([]);

  //setVoteIdData(voteUrlId);
  
  //console.log('this is the vote id ' + voteId)
  console.log('this is the vote id url ' + voteUrlId)


    const urlVotePlayers = 'http://10.0.2.2:3000/voteplayers?vote_id=eq.' + voteUrlId;
          
            useEffect(()=>{  
              fetch(urlVotePlayers)
                .then(response => response.json())
                .then(data => {
                  
                  setPlayerIds(data.map(item => item.player_id));
                  setPlayerNames(data.map(item => item.player_name));
                  setNVotes(data.map(item => item.nvotes));
                })
                .catch(error => {
                  
                });
              }, [voteId]);
      

              const handlePlayerNameClick = (playerId, nVotes, index) => {
                console.log('Player ID:', playerId);
                console.log('Number of Votes:', nVotes);
                const newNvotes = nVotes + 1;

                const newUrl = 'http://10.0.2.2:3000/voteplayers?player_id=eq.' + playerId;

                fetch(newUrl, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    nvotes: newNvotes,
                  }),
                })
                  .then(response => response.json())
                  .then(responseJson => {
                   
                    console.log(responseJson);
                  })
                  .catch(error => {
                    
                    
                  });

                setLastClickedPlayerIndex(index);
              };
            
              return (
                <View>
                  {playerNames.length > 0 ? (
                    <View style={styles.firstContainer}>
                      {playerNames.map((name, index) => (
                        <View style={styles.container} key={index}>
                          <TouchableHighlight onPress={() => handlePlayerNameClick(playerIds[index], nVotes[index], index)}>
                            <Text style={styles.text}>{name}</Text>
                          </TouchableHighlight>

                        {lastClickedPlayerIndex === index && (
                            <Image source={require('./checkmark.png')} style={styles.checkmark} />
                        )}
                       
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text>Loading player names...</Text>
                  )}
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
  checkmark: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
  },
});


export default PlayerScreen;