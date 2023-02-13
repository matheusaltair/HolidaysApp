import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

//------libs--------//

import { AntDesign } from '@expo/vector-icons'

//------imgs--------//

import { Feriado_Image } from '../../imgs/feriado';

//------styles--------//

import { styles } from './styles';


export interface CardProps extends TouchableOpacityProps {
  title: string,
  date: string,
  description: string,
  variableDates?: string,
  deleteItem: () => void,
  openCamera: () => void,
  image: string,
  latitude: string,
  longitude: string
}

export function Card({ title, date, description, deleteItem, openCamera, image, latitude, longitude }: CardProps) {
  const [openCard, setOpenCard] = useState(false)

  function handleStatusCard() {
    setOpenCard(!openCard)
  }

  return (
    <View style={styles.container}>
      {openCard ?
        <>
          <View style={styles.viewRow}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.textDate}>{date}</Text>
            </View>
            <TouchableOpacity onPress={handleStatusCard}>
              <AntDesign name="up" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={openCamera}>
            <Image
              style={styles.image}
              source={{
                uri: image ? image : Feriado_Image,
              }}
            />
          </TouchableOpacity>

          {latitude !== 'undefined' && latitude && <Text style={styles.latElongText}>latitude: {' '}{latitude}</Text>}
          {longitude !== 'undefined' && longitude && <Text style={styles.latElongText}>longitude: {' '}{longitude}</Text>}

          <Text style={styles.description}>{description}</Text>

          <View style={styles.viewRow}>
            <TouchableOpacity onPress={deleteItem}>
              <AntDesign name="close" style={styles.icon} />
              <Text style={styles.descriptionButton}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteItem}>
              <AntDesign name="edit" style={styles.icon} />
              <Text style={styles.descriptionButton}>Editar</Text>
            </TouchableOpacity>
          </View>
        </>
        :
        <>
          <View style={styles.viewRow}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.textDate}>{date}</Text>
            </View>
            <TouchableOpacity onPress={handleStatusCard}>
              <AntDesign name="down" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  );
}
