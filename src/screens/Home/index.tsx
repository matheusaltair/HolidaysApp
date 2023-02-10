import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

//------libs--------//

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'

//------components--------//

import { Card } from '../../components/Card';
import { CardProps } from '../../components/Card';
import AccessCamera from '../../components/AccessCamera';

//------services--------//

import { apiHolidays } from '../../services/HolidayData';

//------styles--------//

import { styles } from './styles';


const dataKey = '@HolidayApp:holidays'

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [holidays, setHolidays] = useState([])
  const [idCard, setIdCard] = useState('')
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const camRef = useRef(null);
  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();
  const [accessLocation, setAccessLocation] = useState<Boolean>(false);


  async function handleGetHolidays() {
    try {
      setIsLoading(true)
      const value = await AsyncStorage.getItem(dataKey)
      if (value === null) {
        const response = await apiHolidays.getHolidays()

        if (response) {
          await AsyncStorage.setItem(dataKey, JSON.stringify(response))
        }
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      handleGetHolidaysOnAsyncStorage()
    }
  }


  async function handleGetHolidaysOnAsyncStorage() {

    setIsLoading(true)

    const response = await AsyncStorage.getItem(dataKey)

    const data = response ? JSON.parse(response) : null

    setHolidays(data)

    setIsLoading(false)

  }


  async function handleDeleteItem(id: CardProps) {
    try {
      Alert.alert('Deletar', 'Deseja realmente deletar este feriado??', [
        {
          text: 'Não',
          onPress: () => console.log(),
          style: 'cancel',
        },
        {
          text: 'Sim', onPress: async () => {
            const response =
              holidays.map(function (item: CardProps) {
                return item
              }).filter((item: CardProps) => item.title !== id.title)

            await AsyncStorage.setItem(dataKey, JSON.stringify(response))
            handleGetHolidaysOnAsyncStorage()
          }
        },
      ]);

    } catch (error) {
      console.log(error)
    }
  }


  function handleOpenCamera(title: string) {
    setIdCard(title)
    setOpenCamera(!openCamera)
  }


  async function handleTakePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri);
    }
  }


  async function handleSavePicture() {
    try {

      if (accessLocation === true) {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
      }

      const response =
        holidays.map(function (item: CardProps) {
          return item
        }).filter((item: CardProps) => item.title === idCard)

      const newObject = Object.defineProperties(response[0], {
        image: {
          value: String(capturedPhoto),
          writable: true,
          enumerable: true,
          configurable: true
        },
        latitude: {
          value: String(latitude),
          writable: true,
          enumerable: true,
          configurable: true
        },
        longitude: {
          value: String(longitude),
          writable: true,
          enumerable: true,
          configurable: true
        },
      })

      const removeOldItem =
        holidays.map(function (item: CardProps) {
          return item
        }).filter((item: CardProps) => item.title !== idCard)

      const newResponse = [
        ...removeOldItem,
        newObject
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(newResponse))
      setOpenCamera(!openCamera)
      setCapturedPhoto(null)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAccessLocation(false)
        return;
      } else setAccessLocation(true)
    })();

    handleGetHolidays()
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ?
        <View style={styles.activityIndicatorView} >
          <ActivityIndicator size='large' color="#000" />
        </View>
        :
        <>
          <View style={styles.header}>
            <Text style={styles.textHeader} >Bem vindo ao app de Feriados</Text>
          </View>
          <View style={styles.viewHolidaysList}>
            <FlatList
              data={holidays}
              keyExtractor={(item: CardProps) => item.title}
              renderItem={({ item }) => (
                <>
                  <Card title={item.title} date={item.date} description={item.description} deleteItem={() => handleDeleteItem(item)} openCamera={() => handleOpenCamera(item.title)} image={item.image} latitude={item.latitude} longitude={item.longitude} />
                </>
              )}
              style={styles.holidaysList}
            />
            {openCamera ?
              <View style={styles.viewCamera}>
                {capturedPhoto
                  ?
                  <>
                    <Image
                      style={styles.image}
                      source={{
                        uri: capturedPhoto,
                      }}
                    />
                    <View style={styles.viewButtonsCapturedPhoto}>
                      <TouchableOpacity style={styles.touchableIcon} onPress={() => setCapturedPhoto(null)}>
                        <AntDesign name="close" style={styles.icon} color={'white'} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.touchableIcon} onPress={handleSavePicture} >
                        <AntDesign name="check" style={styles.icon} color='white' />
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  <AccessCamera camRef={camRef} takePicture={handleTakePicture} closeCamera={() => handleOpenCamera('')} />
                }
              </View>
              :
              <View />
            }
          </View>
        </>
      }
    </View>
  );
}
