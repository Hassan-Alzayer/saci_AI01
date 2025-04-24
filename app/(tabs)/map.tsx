import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Earth, House, User, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { MapView } from '../../components/MapView';

export default function MapScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/${route}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>

        <View style={styles.sideButtons}>
          <TouchableOpacity style={[styles.sideButton, styles.activeButton]}>
            <Earth size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sideButton}
            onPress={() => router.push('/(tabs)')}>
            <House size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sideButton}
            onPress={() => handleNavigation('profile')}>
            <User size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton}>
            <MessageCircle size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 60,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sideButtons: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    gap: 10,
    zIndex: 1,
  },
  sideButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#FFE974',
  },
});