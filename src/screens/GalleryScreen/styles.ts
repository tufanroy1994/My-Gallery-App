import { Platform, StyleSheet, Dimensions } from 'react-native';
import { AppColors, FontSizes, hp, wp } from '../../utils';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

export const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? hp(7) : hp(6),
    paddingHorizontal: wp(3),
    borderBottomWidth: wp(1),
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    color: AppColors.PRIMARY_TEXT,
    fontSize: FontSizes.FONT_SIZE_25,
    fontWeight: 'bold',
    paddingTop: hp(2),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginBottom: hp(1),
  },
  userName: {
    fontSize: FontSizes.FONT_SIZE_12,
    fontWeight: 'bold',
    color: AppColors.PRIMARY_TEXT,
  },
  gallery: {
    padding: wp(4),
  },
  galleryItem: {
    width: itemWidth,
    marginRight: wp(3),
    marginBottom: wp(2),
    backgroundColor: AppColors.CARD_BACKGROUND,
    borderRadius: wp(2),
    overflow: 'hidden',
    elevation: wp(4),
    shadowColor: AppColors.PRIMARY_TEXT,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: wp(1),
  },
  galleryImage: {
    width: '100%',
    height: itemWidth,
  },
  captionContainer: {
    padding: wp(3),
  },
  captionText: {
    fontSize: FontSizes.FONT_SIZE_14,
    color: AppColors.PRIMARY_TEXT,
    marginBottom: hp(1),
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingTop: wp(2),
    paddingBottom: wp(1),
  },
  shareButton: {
    color: AppColors.SAHRE_BUTTON,
    fontSize: FontSizes.FONT_SIZE_12,
  },
  deleteButton: {
    color: AppColors.DELETE_BUTTON,
    fontSize: FontSizes.FONT_SIZE_12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: hp(30),
  },
  emptyText: {
    fontSize: FontSizes.FONT_SIZE_25,
    fontWeight: 'bold',
    color: AppColors.SUBTITLE_TEXT,
    marginTop: hp(1),
  },
  emptySubtext: {
    fontSize: FontSizes.FONT_SIZE_14,
    color: AppColors.FOOTER_TEXT,
    textAlign: 'center',
    marginTop: hp(1),
  },
  addButton: {
    position: 'absolute',
    bottom: hp(9),
    right: wp(35),
    width: wp(35),
    height: wp(17),
    borderRadius: wp(1),
    backgroundColor: AppColors.ADD_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: wp(5),
    shadowColor: AppColors.PRIMARY_TEXT,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: wp(2),
  },
  addText: {
    color: AppColors.PRIMARY_BACKGROUND,
    fontSize: FontSizes.FONT_SIZE_16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
    borderRadius: wp(1),
    padding: wp(6),
    width: width - 48,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: FontSizes.FONT_SIZE_16,
    fontWeight: 'bold',
    color: AppColors.PRIMARY_TEXT,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: wp(1),
    marginBottom: hp(2),
  },
  captionInputContainer: {
    marginBottom: hp(3),
  },
  captionInput: {
    borderWidth: 2,
    borderColor: AppColors.BORDER,
    borderRadius: wp(1),
    padding: 12,
    fontSize: FontSizes.FONT_SIZE_14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: hp(2),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: AppColors.CANCEL_BUTTON,
    marginRight: wp(2),
  },
  addButtonModal: {
    backgroundColor: AppColors.ADD_BUTTON,
    marginLeft: wp(3),
  },
  cancelButtonText: {
    fontSize: FontSizes.FONT_SIZE_14,
    color: AppColors.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  addButtonText: {
    fontSize: FontSizes.FONT_SIZE_14,
    color: AppColors.PRIMARY_BACKGROUND,
    fontWeight: 'bold',
  },
});
