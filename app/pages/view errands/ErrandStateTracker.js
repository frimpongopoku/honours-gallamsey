import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../styles';
import ImagePro from '../../components/image/ImagePro';
const STAGES = [
  {key: 'started', text: 'Started running...'},
  {key: 'engaging', text: 'Engaging Instructions...'},
  {key: 'returning', text: 'Returning / Delivering...'},
  {key: 'complete', text: 'Complete'},
  {key: 'transferred', text: 'Funds Transferred!'},
];
const ErrandStateTracker = () => {
  return (
    <View style={{}}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ImagePro
          imageUrl="https://i.pravatar.cc/300"
          style={{
            height: 60,
            width: 60,
            borderRadius: 55,
            borderWidth: 3,
            borderColor: colors.red,
            marginRight: 10,
          }}
        />

        <View>
          <Text style={{fontWeight: 'bold', color: colors.black, fontSize: 18}}>
            Akwesi Frimpong
          </Text>
          <Text>Running this errand...</Text>
        </View>
      </View>
      {STAGES.map((stage, index) => (
        <View key={index?.toString()}>
          <Stage
            text={stage.text}
            complete={index === 0}
            trail={index === STAGES.length - 1 ? false : true}
          />
        </View>
      ))}
    </View>
  );
};

const Stage = ({text, complete, trail = true}) => {
  const opacity = complete ? 1 : 0.3;
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 30,
          opacity,
        }}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          size={28}
          color="red"
          style={{marginRight: 15}}
        />
        <Text style={{color: colors.black, fontWeight: '600', fontSize: 18}}>
          {text || 'A stage in process...'}
        </Text>
      </View>
      {trail && (
        <View
          style={{
            opacity: 0.2,
            height: 40,
            borderLeftWidth: 2,
            borderColor: 'grey',
            marginLeft: 43,
          }}></View>
      )}
    </View>
  );
};

export default ErrandStateTracker;
