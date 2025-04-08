import React, { useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome6'
import { Ionicons } from '@expo/vector-icons';

type Props={
  onPress: ()=> void;
}
export const ButtonChange = ({onPress}:Props) => {
  const [iconeVisivel, setIconeVisivel] = useState(true);

  const alternarIcone = () => {
    setIconeVisivel(prev => !prev);
  };

  return (
    <Pressable onPress={onPress}>
    <TouchableOpacity onPress={alternarIcone}>
      <Ionicons
        name={iconeVisivel? "flash-off-outline" : "flash"}
        size={30}
        color="#333"
      />
    </TouchableOpacity>
    </Pressable>
  );
};


