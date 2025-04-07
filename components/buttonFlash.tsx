import { Pressable } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'

type Props={
    icon: string,
    onPress:()=> void;
}
export const ButtonFlash = ({icon, onPress}:Props)=>{
    return(
        <Pressable onPress={onPress}>
            <Icon name={icon} size={30}/>
        </Pressable>
    );
}
