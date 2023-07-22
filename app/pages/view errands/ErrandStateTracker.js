import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../styles';
import ImagePro from '../../components/image/ImagePro';
const STAGES = [
  {key: 'default', text: 'Started running...', checked: ['default']},
  {
    key: 'engaging',
    text: 'Engaging Instructions...',
    checked: ['engaging', 'default'],
  },
  {
    key: 'returning',
    text: 'Returning / Delivering...',
    checked: ['engaging', 'default', 'returning'],
  },
  {
    key: 'complete',
    text: 'Complete',
    checked: ['engaging', 'default', 'returning', 'complete'],
  },
  {
    key: 'transferred',
    text: 'Funds Transferred!',
    checked: ['engaging', 'default', 'returning', 'complete', 'transferred'],
  },
];
const ErrandStateTracker = ({errand}) => {
  const errandStatus = STAGES.find(stage => stage.key === errand.status);
  const {runner} = errand || {};
  console.log('How is the errand', errandStatus);
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
          imageUrl={runner?.image || 'https://i.pravatar.cc/300'}
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
            {runner?.name || '...'}
          </Text>
          <Text>Running this errand...</Text>
        </View>
      </View>
      {STAGES.map((stage, index) => {
        return (
          <View key={index?.toString()}>
            <Stage
              text={stage.text}
              complete={errandStatus?.checked?.includes(stage.key)}
              trail={index === STAGES.length - 1 ? false : true}
            />
          </View>
        );
      })}
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
