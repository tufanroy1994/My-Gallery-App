import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types/RootStackTypes';

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
