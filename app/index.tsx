import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'
import { ButtonCameraRotation } from "../components/buttonCameraRotation";
import { ButtonFlash } from "../components/buttonFlash";
import { ButtonChange } from "../components/buttonChange";
import { ButtonPercent } from "../components/buttonPercent";


type CameraFacing = "front" | "back"
type CameraFlash = 'on' | 'off' | 'auto'
export default function Page() {
    const cameraRef = useRef<CameraView>(null);

    const [cameraReady, setCameraReady] = useState(false);

    const [cameraZoom, setCameraZoom] = useState<number>(0);

    const [photoFile, setPhotoFile] = useState<string| null>(null)

    const [qrResult, setQrResult] = useState('');

    const [cameraFlash, setCameraFlash] = useState<CameraFlash>('off')

    const [cameraFacing, setCameraFacing] = useState<CameraFacing>('front');

    const [permission, requestPermission] = useCameraPermissions();
    if (!permission) return <View />;

    

    if (!permission.granted) {
        return (
            <View>
                <Text>Permissão de câmera não concedida</Text>
                <Button title="Pedir Permissão" onPress={requestPermission} />
            </View>
        );
    }
    const handleCameraButton = () => {
        if (cameraFacing === 'front') {
            setCameraFacing('back');
        } else {
            setCameraFacing('front');
        }
    };
    const handleCameraFlash = () => {
        switch (cameraFlash) {
            case 'on':
                setCameraFlash('off');
                break;
            case 'off':
                setCameraFlash('auto');
                break;
            case 'auto':
                setCameraFlash('on');
                break;
        };
    };

    const handleBarCode = (result: BarcodeScanningResult) => {
        setQrResult(result.data);
    };

    const handleCameraReady = () =>{
        setCameraReady(true);
    }

    const handleTakePicture = async ()=>{
        if(cameraReady && cameraRef.current){
            const options = {
                quality: 0.7,
                base64: true
            }
            const photo = await cameraRef.current.takePictureAsync(options);
            if(photo){
                setPhotoFile(photo.uri)
            }
        }
    }
    return (
        <ScrollView>
            
        <View style={styles.container}>
            <CameraView
            ref={cameraRef}
                style={styles.camera}
                facing={cameraFacing}
                flash={cameraFlash}
                zoom={cameraZoom}
                onBarcodeScanned={handleBarCode}
                onCameraReady={handleCameraReady}
            >

            </CameraView>
            <View>
                <View style={styles.footButtons}>
                    <ButtonCameraRotation icon="camera-rotate" onPress={handleCameraButton}/>
                    <ButtonFlash icon="bolt-lightning" onPress={handleCameraFlash}/>
                    {/* <ButtonChange/> */}
                    {/* <Text>FLASH: {cameraFlash}</Text> */}

                </View>
                <View>
                    {/* <Text>QR: {qrResult}</Text> */}
                </View>
                
                {/* <View style={styles.zoomContainer}>
                    <ButtonPercent title="0%" onPress={() => setCameraZoom(0)} icon="percent"/>
                    <ButtonPercent title="25%" onPress={() => setCameraZoom(0.25)} icon="percent"/>
                    <ButtonPercent title="50%" onPress={() => setCameraZoom(0.5)} icon="percent"/>
                    <ButtonPercent title="75%" onPress={() => setCameraZoom(0.75)} icon="percent"/>
                    <ButtonPercent title="100%" onPress={() => setCameraZoom(1)} icon="percent"/>
                </View> */}
                <View>
                    <Button title="Tirar Foto" onPress={handleTakePicture}/>
                </View>
                {photoFile &&
                    <Image source={{uri: photoFile}} style={styles.photo}/>
                }
                
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        width: "100%",
        height: 550
    },
    zoomContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    photo:{
        width: 200,
        height:200,
        borderRadius: 10,
    },
    footButtons:{
        flexDirection:"row",
        justifyContent: "space-between",
        padding: 5,
    },
    percent:{
        backgroundColor: 'red'
    }
   
});