import { Pressable } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'

type Props={
    icon: string,
    onPress:()=> void,
    title: string
}
export const ButtonPercent = ({icon,onPress,title}:Props)=>{
    return(
        <Pressable onPress={onPress}>
            <Icon name={icon} size={22} title={title}/>
        </Pressable>
    );
}