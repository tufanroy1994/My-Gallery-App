import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types/RootStackTypes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
