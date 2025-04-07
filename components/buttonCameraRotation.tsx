import { Pressable, StyleSheet } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'


type Props= {
    icon: string,
    onPress:()=> void;
}
export const ButtonCameraRotation = ({icon, onPress}:Props) =>{
    return(
        <Pressable onPress={onPress}>
            <Icon name={icon} size={30} />
        </Pressable>
    );
}
