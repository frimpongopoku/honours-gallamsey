import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import {colors} from '../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const Chatting = () => {
  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  return (
    <View>
      <Toolbar title="Chat with senior man" />
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
        {[3, 2, 3, 4, 3, 4, 5, 6, 6, 76, 67, 67, 76, 6, 54, 45].map(
          (item, index) => {
            return (
              <View key={index?.toString()}>
                <ChatItem receiver={index % 2 === 0} />
              </View>
            );
          },
        )}
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

const ChatItem = ({receiver = false}) => {
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
          Charles
        </Text>
        <Text style={{color: 'white', fontSize: 16, ...(mods?.items || {})}}>
          This is the real spelling
        </Text>
      </View>
    </View>
  );
};
export default Chatting;
