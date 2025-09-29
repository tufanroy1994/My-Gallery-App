import React from 'react';
import { View, Text, Image } from 'react-native';

import { useAppNavigation } from '../../hooks';
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../navigation/types/RootStackTypes';
import { styles } from './styles';

const GalleryScreen = () => {
  const { params } = useRoute<RootRouteProps<'GalleryScreen'>>();
  const navigation = useAppNavigation('GalleryScreen');

  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.header]}>
        <Image
          source={{ uri: params?.user?.data?.user?.photo || '' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{params?.user?.data?.user?.name}</Text>
      </View>
    </View>
  );
};

export default GalleryScreen;
