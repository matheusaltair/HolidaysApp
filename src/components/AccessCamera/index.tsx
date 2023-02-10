import React, { useState, useEffect, } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

//------libs--------//

import { AntDesign } from '@expo/vector-icons'
import { Camera, CameraType } from 'expo-camera'

//------styles--------//

import { styles } from "./styles"


interface CameraProps {
  camRef: any,
  takePicture: () => void,
  closeCamera: () => void
}

export default function AccessCamera({ camRef, takePicture, closeCamera }: CameraProps) {

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })();
  }, []);

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} autoFocus={true} focusDepth={1} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <AntDesign name="sync" style={styles.icon} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <AntDesign name="camera" style={styles.icon} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={closeCamera} >
            <AntDesign name="close" style={styles.icon} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}
