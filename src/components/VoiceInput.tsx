import React from 'react';
import { TouchableOpacity, Alert, Text, Platform } from 'react-native';
import { startSpeechToText } from 'react-native-voice-to-text';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { FontSizes } from '../utils';

interface VoiceInputProps {
  onResult: (transcript: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onResult,
  isListening,
  onListeningChange,
}) => {
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('Microphone permission request error:', error);
      return false;
    }
  };

  const handlePress = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Microphone permission is required for voice input.',
        );
        return;
      }

      onListeningChange(true);

      // Call library function
      const result = await startSpeechToText();

      if (typeof result === 'string' && result.trim().length > 0) {
        onResult(result);
      } else {
        Alert.alert('No Speech Detected', 'Please try again.');
      }
    } catch (error) {
      console.log('Speech recognition error:', error);
      Alert.alert(
        'Voice Error',
        'Failed to recognize speech. Please try again.',
      );
    } finally {
      onListeningChange(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: isListening ? '#f44336' : '#4285F4',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: FontSizes.FONT_SIZE_14, fontWeight: 'bold' }}>
        {isListening ? 'Listening...' : 'Mic'}
      </Text>
    </TouchableOpacity>
  );
};
