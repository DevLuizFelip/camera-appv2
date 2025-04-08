import { Pressable, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'
import { Ionicons } from '@expo/vector-icons';

type Props ={
    icon: string,
    onPress: ()=> void
}
export const ButtonTakePhoto = ({icon, onPress}:Props)=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <Ionicons name='radio-button-on' size={70} />
        </TouchableOpacity>
    );
}

