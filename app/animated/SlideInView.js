import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
const SlideInView = ({ children}) => {
  // Create an Animated.Value to control the animation
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Trigger the slide-in animation on component mount
    Animated.timing(slideAnim, {
      toValue: 1, // The final position of the view (fully visible)
      duration: 200, // Duration of the animation (in milliseconds)
      useNativeDriver: true, // Enable native driver for better performance
    }).start(); // Start the animation
  }, []);

  return (
    <Animated.View
      style={{
        opacity: slideAnim, // Control the opacity based on the animation progress
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [400, 0], // Slide the view up from 100 units below its final position
            }),
          },
        ],
      }}>
      {/* Content of the sliding view */}
      {children}
      {/* <View style={{backgroundColor: color, height: 100, width: 100}} /> */}
    </Animated.View>
  );
};


export default SlideInView