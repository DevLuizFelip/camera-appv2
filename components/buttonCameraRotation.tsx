import { Pressable, StyleSheet } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'
import { Ionicons } from '@expo/vector-icons';

type Props= {
    icon: string,
    onPress:()=> void;
}
export const ButtonCameraRotation = ({icon, onPress}:Props) =>{
    return(
        <Pressable onPress={onPress}>
            <Ionicons name="camera-reverse-outline"  size={30}/>
        </Pressable>
    );
}
