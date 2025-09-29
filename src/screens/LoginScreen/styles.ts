import { Platform, StyleSheet } from 'react-native';
import { AppColors, FontSizes, hp, wp } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: wp(50),
    width: wp(75),
    borderRadius: wp(2),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp(5),
  },
  title: {
    fontSize: FontSizes.FONT_SIZE_25,
    fontWeight: 'bold',
    color: AppColors.PRIMARY_TEXT,
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: FontSizes.FONT_SIZE_14,
    color: AppColors.SUBTITLE_TEXT,
    textAlign: 'center',
    lineHeight: hp(2.6),
    maxWidth: wp(70),
    marginBottom: hp(6),
  },
  footerText: {
    fontSize: FontSizes.FONT_SIZE_12,
    color: AppColors.FOOTER_TEXT,
    textAlign: 'center',
    lineHeight: hp(2),
    paddingTop: Platform.OS === 'android' ? hp(1) : 0,
  },
});
