import Share from 'react-native-share';
import { Platform } from 'react-native';

export class ShareManager {
  static async shareImage(imageUri: string, caption: string): Promise<void> {
    try {
      const shareOptions = {
        title: 'My Gallery Photo',
        message: caption,
        url: Platform.OS === 'android' ? `file://${imageUri}` : imageUri,
        type: 'image/jpeg',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Share error:', error);
      throw new Error('Failed to share image');
    }
  }

  static async shareText(text: string): Promise<void> {
    try {
      const shareOptions = {
        title: 'Share Caption',
        message: text,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Share text error:', error);
      throw new Error('Failed to share text');
    }
  }

  static async shareImageWithText(
    imageUri: string,
    caption: string,
    title?: string,
  ): Promise<void> {
    try {
      const shareUrl =
        Platform.OS === 'android'
          ? imageUri.startsWith('file://')
            ? imageUri
            : `file://${imageUri}`
          : imageUri;

      const shareOptions = {
        title: title || 'My Gallery Photo',
        message: caption || '',
        url: shareUrl,
        type: 'image/jpeg',
        failOnCancel: false, // Prevent throwing error if user cancels
      };

      const result = await Share.open(shareOptions);
      console.log('Share result:', result);

      // Only show error if sharing actually failed
      if (!result.success && !result.dismissedAction) {
        console.warn('Share did not complete.');
      }
    } catch (error: any) {
      // Ignore user cancel error
      if (
        error?.message === 'User did not share' ||
        error?.message === 'User cancelled action'
      ) {
        console.log('Share cancelled by user');
        return;
      }
      console.log('Share image error:', error);
    }
  }

  static async shareMultipleImages(
    imageUris: string[],
    caption?: string,
  ): Promise<void> {
    try {
      const urls = imageUris.map(uri =>
        Platform.OS === 'android' ? `file://${uri}` : uri,
      );

      const shareOptions = {
        title: 'My Gallery Photos',
        message: caption || 'Multiple photos from My Gallery',
        urls,
        type: 'image/jpeg',
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error: any) {
      console.error('Share multiple images error:', error);
      if (error.message !== 'User did not share') {
        throw new Error('Failed to share multiple images');
      }
    }
  }

  static async shareToSocialMedia(
    imageUri: string,
    caption: string,
    socialMedia: 'facebook' | 'twitter' | 'instagram' | 'whatsapp',
    facebookAppId?: string, // Added optional Facebook App ID parameter
  ): Promise<void> {
    try {
      let social;
      let shareOptions: any = {
        title: 'My Gallery Photo',
        message: caption,
        url: Platform.OS === 'android' ? `file://${imageUri}` : imageUri,
        filename: 'MyGalleryPhoto',
      };

      switch (socialMedia) {
        case 'facebook':
          social = Share.Social.FACEBOOK;
          // Facebook requires appId for shareSingle
          if (!facebookAppId) {
            throw new Error('Facebook App ID is required for Facebook sharing');
          }
          shareOptions.appId = facebookAppId;
          break;
        case 'twitter':
          social = Share.Social.TWITTER;
          break;
        case 'instagram':
          social = Share.Social.INSTAGRAM;
          break;
        case 'whatsapp':
          social = Share.Social.WHATSAPP;
          break;
        default:
          throw new Error('Unsupported social media platform');
      }

      shareOptions.social = social;

      await Share.shareSingle(shareOptions);
    } catch (error: any) {
      console.error(`Share to ${socialMedia} error:`, error);
      if (
        error.message.includes('not installed') ||
        error.message.includes('not available')
      ) {
        throw new Error(`${socialMedia} app is not installed on this device`);
      } else if (error.message !== 'User did not share') {
        throw new Error(`Failed to share to ${socialMedia}`);
      }
    }
  }

  static isShareAvailable(): boolean {
    return Share.isPackageInstalled !== undefined;
  }

  // Alternative method to get available apps using Share.open instead
  static async showShareDialog(
    message: string = 'Share from My Gallery',
  ): Promise<void> {
    try {
      await Share.open({
        message,
        title: 'Share',
      });
    } catch (error) {
      console.error('Share dialog error:', error);
    }
  }

  // Check if a specific app is installed (if supported by the library)
  static async isAppInstalled(packageName: string): Promise<boolean> {
    try {
      if (Share.isPackageInstalled) {
        const result = await Share.isPackageInstalled(packageName);
        return result.isInstalled;
      }
      return false;
    } catch (error) {
      console.error('App installation check error:', error);
      return false;
    }
  }
}
