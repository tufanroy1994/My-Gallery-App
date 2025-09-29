import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 40,
    paddingBottom: 16,
    borderBottomWidth: 5,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});
