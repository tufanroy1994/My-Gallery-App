import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppNavigation } from '../../hooks';
import { RootRouteProps } from '../../navigation/types/RootStackTypes';
import { ImagePicker } from '../../components/ImagePicker';
import { styles } from './styles';

export interface GalleryItem {
  id: string;
  uri: string;
  caption: string;
  timestamp: number;
}

const GalleryScreen = () => {
  const { params } = useRoute<RootRouteProps<'GalleryScreen'>>();
  const navigation = useAppNavigation('GalleryScreen');

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('galleryItems');
      if (stored) {
        setGalleryItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading gallery items:', error);
    }
  };

  const saveGalleryItems = async (items: GalleryItem[]) => {
    try {
      await AsyncStorage.setItem('galleryItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving gallery items:', error);
    }
  };

  const handleImageSelected = (imageUri: string) => {
    setSelectedImage(imageUri);
    setShowAddModal(true);
  };

  const handleAddImage = () => {
    if (!selectedImage) return;

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      uri: selectedImage,
      caption: caption.trim() || 'No caption',
      timestamp: Date.now(),
    };

    const updatedItems = [newItem, ...galleryItems];
    setGalleryItems(updatedItems);
    saveGalleryItems(updatedItems);

    // Reset state
    setSelectedImage(null);
    setCaption('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedItems = galleryItems.filter(item => item.id !== id);
          setGalleryItems(updatedItems);
          saveGalleryItems(updatedItems);
        },
      },
    ]);
  };

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity style={styles.galleryItem}>
      <Image source={{ uri: item.uri }} style={styles.galleryImage} />
      <View style={styles.captionContainer}>
        <Text style={styles.captionText} numberOfLines={2}>
          {item.caption}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={{ color: '#4285F4' }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteItem(item.id)}
            style={styles.actionButton}
          >
            <Text style={{ color: '#f44336' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.header]}>
        <Image
          source={{ uri: params?.user?.data?.user?.photo || '' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{params?.user?.data?.user?.name}</Text>
      </View>

      {/* Gallery */}
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gallery}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {/* <Icon name="photo-library" size={64} color="#ccc" /> */}
            <Text style={styles.emptyText}>No photos yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to add your first photo
            </Text>
          </View>
        }
      />
      {/* Add Button */}
      <ImagePicker onImageSelected={handleImageSelected}>
        <View style={styles.addButton}>
          <Text style={{ color: '#fff' }}>Add Image</Text>
        </View>
      </ImagePicker>

      {/* Add Image Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Caption</Text>

            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
              />
            )}

            <View style={styles.captionInputContainer}>
              <TextInput
                style={styles.captionInput}
                placeholder="Enter a caption..."
                value={caption}
                onChangeText={setCaption}
                multiline
              />
              {/* <VoiceInput
                onResult={handleVoiceResult}
                isListening={isListening}
                onListeningChange={setIsListening}
              /> */}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setSelectedImage(null);
                  setCaption('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={handleAddImage}
              >
                <Text style={styles.addButtonText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GalleryScreen;
