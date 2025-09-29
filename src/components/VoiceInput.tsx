import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert, Platform, Text } from 'react-native';
import Voice from '@react-native-voice/voice';
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
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    checkVoiceAvailability();
    setupVoiceListeners();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const checkVoiceAvailability = async () => {
    try {
      const available = await Voice.isAvailable();
      // Convert 0/1 to boolean: 1 = true, 0 = false
      setIsAvailable(Boolean(available));
    } catch (error) {
      console.error('Voice availability check error:', error);
      setIsAvailable(false);
    }
  };

  const setupVoiceListeners = () => {
    Voice.onSpeechStart = () => onListeningChange(true);
    Voice.onSpeechEnd = () => onListeningChange(false);
    Voice.onSpeechError = error => {
      console.error('Speech error:', error);
      onListeningChange(false);
      Alert.alert(
        'Voice Error',
        'Failed to recognize speech. Please try again.',
      );
    };
    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0) {
        onResult(event.value[0]);
      }
    };
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Microphone permission request error:', error);
      return false;
    }
  };

  const startListening = async () => {
    if (!isAvailable) {
      Alert.alert(
        'Voice Input Unavailable',
        'Voice input is not available on this device.',
      );
      return;
    }

    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Microphone permission is required for voice input.',
        );
        return;
      }

      await Voice.start('en-US');
      onListeningChange(true);
    } catch (error) {
      console.error('Start listening error:', error);
      Alert.alert(
        'Voice Error',
        'Failed to start voice input. Please try again.',
      );
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      onListeningChange(false);
    } catch (error) {
      console.log('Stop listening error:', error);
    }
  };

  const handlePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isAvailable) {
    return null;
  }

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
      {isListening ? (
        <Text style={{ fontSize: FontSizes.FONT_SIZE_14, fontWeight: 'bold' }}>
          Mic-off
        </Text>
      ) : (
        <Text style={{ fontSize: FontSizes.FONT_SIZE_14, fontWeight: 'bold' }}>
          Mic
        </Text>
      )}
    </TouchableOpacity>
  );
};
