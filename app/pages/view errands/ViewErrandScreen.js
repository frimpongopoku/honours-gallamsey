import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import {ScrollView} from 'react-native-gesture-handler';
import GButton from '../../components/button/Button';
import ImagePro from '../../components/image/ImagePro';
import GBottomSheet from '../../components/bottomsheet/GBottomSheet';
import AboutToPickErrand from './AboutToPickErrand';

const ViewErrandScreen = () => {
  return (
    <GBottomSheet
      generics={{snapPoints: ['30%']}}
      sheetContent={<AboutToPickErrand />}>
      <Toolbar
        title="A new pair of shoes"
        onBackPress={() => console.log('Trying to go back from viewing errand')}
      />
      <ScrollView style={{marginBottom: 220}}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 10,
                fontWeight: '600',
                fontSize: 18,
                backgroundColor: '#FFCACA',
                textAlign: 'center',
                color: colors.red,
                flex: 1,
              }}>
              GHS 150
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '600',
                fontSize: 18,
                backgroundColor: '#D3FFE0',
                color: colors.green,
                textAlign: 'center',
                flex: 1,
              }}>
              GHS 25
            </Text>
          </View>
          <Paragraph>
            You need GHS 150 GHS to run this errand, you will earn GHS 25 when
            complete. So at the end of the errand you will walk away with a
            total of GHS 175.
          </Paragraph>

          <View>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: colors.red,
                fontWeight: 'bold',
                color: 'white',
              }}>
              JOB INSTRUCTIONS
            </Text>
            <Paragraph>
              1. Please make sure its the color RED 2. Check the bottom and see
              it has "Guuci" 3. Make sure it has the color blue 4. Please do a
              litmus paper test 5. Make sure its sealed before delivery 1.
              Please make sure its the color RED 2. Check the bottom and see it
              has "Guuci" 3. Make sure it has the color blue 4. Please do a
              litmus paper test 5. Make sure its sealed before delivery
            </Paragraph>
          </View>

          <View>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: colors.red,
                fontWeight: 'bold',
                color: 'white',
              }}>
              POSTER'S DETAILS
            </Text>
            <View style={{padding: 15}}>
              <View>
                <Text style={{color: colors.black, marginBottom: 5}}>
                  Full Name
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  Desmond Elliot
                </Text>
              </View>
              <View>
                <Text style={{color: colors.black, marginBottom: 5}}>
                  Whatsapp
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  +230 4637 387 32
                </Text>
              </View>
              <View>
                <Text style={{color: colors.black, marginBottom: 5}}>
                  Whatsapp
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  +230 4637 387 32
                </Text>
              </View>
              <View>
                <Text style={{color: colors.black, marginBottom: 5}}>
                  Whatsapp
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  +230 4637 387 32
                </Text>
              </View>
              <View>
                <Text style={{color: colors.black, marginBottom: 5}}>
                  Whatsapp
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  +230 4637 387 32
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <GButton
        style={{padding: 5, backgroundColor: '#F0F0F0', bottom: 230}}
        floating>
        <ImagePro
          imageUrl="https://i.pravatar.cc/300"
          style={{borderRadius: 55, width: 60, height: 60}}
        />
      </GButton>
    </GBottomSheet>
  );
};

export default ViewErrandScreen;
