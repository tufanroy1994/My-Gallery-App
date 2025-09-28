import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types/RootStackTypes';

const useAppNavigation = (screenName: keyof RootStackParamList) => {
  type Props = StackScreenProps<RootStackParamList, typeof screenName>;
  type ScreenNavigationProp = Props['navigation'];

  const navigation = useNavigation<ScreenNavigationProp>();
  return navigation;
};

export default useAppNavigation;
