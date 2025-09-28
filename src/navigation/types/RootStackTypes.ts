import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  GalleryScreen: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
