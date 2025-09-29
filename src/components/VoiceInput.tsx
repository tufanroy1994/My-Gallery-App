import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert, Platform, Text } from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
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
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setupVoiceListeners();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const setupVoiceListeners = () => {
    Voice.onSpeechStart = () => onListeningChange(true);
    Voice.onSpeechEnd = () => onListeningChange(false);
    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      console.log('Speech error:', e);
      onListeningChange(false);
      Alert.alert(
        'Voice Error',
        'Failed to recognize speech. Please try again.',
      );
    };
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
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
      console.log('Microphone permission request error:', error);
      return false;
    }
  };

  const startListening = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Microphone permission is required for voice input.',
        );
        return;
      }

      await Voice.start('en-US'); // language code
      onListeningChange(true);
    } catch (error) {
      console.log('Start listening error:', error);
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

  if (!isAvailable) return null;

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
        {isListening ? 'Mic-off' : 'Mic'}
      </Text>
    </TouchableOpacity>
  );
};
