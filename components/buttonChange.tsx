import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome6'

export const ButtonChange = () => {
  const [iconeVisivel, setIconeVisivel] = useState(true);

  const alternarIcone = () => {
    setIconeVisivel(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={alternarIcone}>
      <Icon
        name={iconeVisivel ? 'eye' : 'bolt-slash'} 
        size={30}
        color="#333"
      />
    </TouchableOpacity>
  );
};


