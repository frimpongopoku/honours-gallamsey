import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import {colors} from '../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import firestore from '@react-native-firebase/firestore';
import {LOADING} from '../authentication/constants';
import {connect} from 'react-redux';
import {getTimeAgo} from '../../utils';
const Chatting = ({route, user}) => {
  const [chat, setChat] = useState(LOADING);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };
  const data = route?.params.data;
  const chatKey = data?.key;
  const fullErrand = data?.errand;

  const otherPerson = () => {
    if (user?._id === fullErrand?.poster?.id) return fullErrand?.runner;
    return fullErrand?.poster;
  };

  console.log('THIS IS CHAT KEY', chatKey);

  useEffect(() => {
    // Reference to the document in Firestore
    const docRef = firestore().collection('Chats').doc(chatKey);
    docRef
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          docRef.onSnapshot(snapshot => {
            const data = snapshot.data();
            // Update your component state or take any other actions
            setChat(data);
          });
        } else {
          docRef
            .set({messages: []})
            .then(() => {
              console.log('Document created successfully!');
              // Subscribe to snapshot updates
              docRef.onSnapshot(snapshot => {
                const data = snapshot.data();
                setChat(data);
              });
            })
            .catch(error => {
              console.error('Error creating document:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching document:', error);
      });
    return () => {
      docRef.onSnapshot(() => {});
    };
  }, [chatKey]);

  const takeToFirestore = chatObj => {
    const docRef = firestore().collection('Chats').doc(chatKey);
    docRef
      .set(chatObj)
      .then(() => {
        console.log('Document created successfully!');
      })
      .catch(error => {
        console.error('Error creating document:', error);
      });
  };
  const sendMessage = () => {
    if (!message) return;
    const obj = {
      name: user?.preferredName,
      user_id: user?._id,
      text: message,
      timestamp: new Date().toISOString(),
    };
    const chatObj = {...(chat || {}), messages: [...chat?.messages, obj]};
    setChat(chatObj);
    setMessage('');
    takeToFirestore(chatObj);
  };

  if (chat === LOADING)
    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <Toolbar title="..." />
        <ActivityIndicator color="red" size={40} />
      </View>
    );

  const messages = chat?.messages || [];

  return (
    <View>
      <Toolbar title={`Talk to ${otherPerson()?.name || '...'}`} />
      <ScrollView
        ref={scrollViewRef}
        onLayout={scrollToBottom}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          height: '93%',
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        {messages.map((messageObj, index) => {
          return (
            <View key={index?.toString()}>
              <ChatItem
                {...messageObj}
                receiver={messageObj.user_id === user?._id}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          // padding: 10,
          width: '100%',
          display: 'flex',
          flex: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.lightGrey,
          elevation: 10,
        }}>
        <TextInput
          onChangeText={text => setMessage(text)}
          value={message}
          style={{
            flex: 8.5,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 20,
            fontSize: 17,
          }}
          placeholder="Enter message here..."
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            flex: 1.5,
            padding: 10,
            textAlign: 'center',
            // backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.black,
            height: '100%',
          }}>
          <FontAwesomeIcon icon={faPaperPlane} size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ChatItem = ({receiver = false, timestamp, text, name}) => {
  const mods = receiver
    ? {}
    : {
        container: {
          backgroundColor: colors.greyish,
          marginLeft: 10,
          marginVertical: 5,
        },
        items: {color: 'red'},
      };
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          elevation: 5,
          backgroundColor: 'red',
          borderRadius: 7,
          marginLeft: receiver ? 'auto' : 0,
          marginBottom: 15,
          ...(mods?.container || {}),
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
            ...(mods?.items || {}),
          }}>
          {name || '...'}
        </Text>
        <Text style={{color: 'white', fontSize: 16, ...(mods?.items || {})}}>
          {text || '...'}
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: 5,
            fontSize: 12,
            ...(mods?.items || {}),
          }}>
          {getTimeAgo(timestamp) || '...'}
        </Text>
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {user: state.user};
};

export default connect(mapStateToProps)(Chatting);
