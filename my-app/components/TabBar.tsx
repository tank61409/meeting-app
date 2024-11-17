import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import TabBarButton from './TabbarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';



export function TabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  const [dimensions,setDimensions] = useState({height:20, width: 100});

  const buttonwidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e:LayoutChangeEvent) =>{
    setDimensions({
      height: e.nativeEvent.layout.height,
      width : e.nativeEvent.layout.width
    })
  };

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(()=>{
    return{
      transform:[{translateX: tabPositionX.value}]
    }
  })

    return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle,{
        position:'absolute',
        backgroundColor:'#48735F',
        borderRadius:30,
        marginHorizontal:12,
        height: dimensions.height - 15,
        width: buttonwidth - 25
      }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonwidth * index,{duration: 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
         <TabBarButton
          key={route.name}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          routename={route.name}
          color={isFocused ? '#673ab7' : '#222'}
          label={label}
         />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{
        position:'absolute',
        bottom:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#FFF',
        marginHorizontal:60,
        paddingVertical:15,
        borderRadius:35,
        shadowColor:'#000',
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        shadowOpacity:0.1
    }
})