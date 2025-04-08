import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6'
import { ButtonCameraRotation } from "../components/buttonCameraRotation";
import { ButtonFlash } from "../components/buttonFlash";
import { ButtonChange } from "../components/buttonChange";
import { ButtonPercent } from "../components/buttonPercent";
import { ButtonTakePhoto } from "../components/buttonTakePhoto";


type CameraFacing = "front" | "back"
type CameraFlash = 'on' | 'off' | 'auto'
type CameraFocus = 'on' | 'off'
export default function Page() {
    const cameraRef = useRef<CameraView>(null);

    const [cameraReady, setCameraReady] = useState(false);

    const [cameraZoom, setCameraZoom] = useState<number>(0);

    const [photoFile, setPhotoFile] = useState<string | null>(null)

    const [qrResult, setQrResult] = useState('');

    const [cameraFlash, setCameraFlash] = useState<CameraFlash>('off');

    const [cameraFocus, setCameraFocus] = useState<CameraFocus>('off')

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
                setCameraFlash('off')
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

    const handleCameraReady = () => {
        setCameraReady(true);
    }

    const handleTakePicture = async () => {
        if (cameraReady && cameraRef.current) {
            const options = {
                quality: 0.7,
                base64: true
            }
            const photo = await cameraRef.current.takePictureAsync(options);
            if (photo) {
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
                    mirror={true}

                >

                </CameraView>
                <View style={styles.topButtons}>
                    <ButtonCameraRotation icon="camera-rotate" onPress={handleCameraButton} />
                    <ButtonFlash onPress={handleCameraFlash}/>
                    {/* <ButtonChange/> */}
                    {/* <Text>FLASH: {cameraFlash}</Text> */}

                </View>
                <View>

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
                    <View style={styles.takePhoto}>
                        <ButtonTakePhoto icon="circle" onPress={handleTakePicture} />
                        {/* <Button title="Tirar Foto" onPress={handleTakePicture}/> */}
                    </View>
                    {/* {photoFile &&
                        <Image source={{ uri: photoFile }} style={styles.photo} />
                    } */}

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
        height: 900
    },
    zoomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    photo: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    topButtons: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    percent: {
        backgroundColor: 'red'
    },
    takePhoto: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 50,
    }

});