import { SignInResponse } from '@react-native-google-signin/google-signin';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  GalleryScreen: { user: SignInResponse };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
