import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nora Rasheed</Text>
            <Text style={styles.email}>nora@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Cards</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Account Settings</Text>
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<Settings size={24} color="#666" />}
            title="Account Settings"
          />
          <MenuItem 
            icon={<CreditCard size={24} color="#666" />}
            title="Payment Methods"
          />
          <MenuItem 
            icon={<Bell size={24} color="#666" />}
            title="Notifications"
          />
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Security</Text>
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<Shield size={24} color="#666" />}
            title="Privacy and Security"
          />
          <MenuItem 
            icon={<HelpCircle size={24} color="#666" />}
            title="Help Center"
          />
          <MenuItem 
            icon={<LogOut size={24} color="#FF3B30" />}
            title="Log Out"
            onPress={() => router.push('/welcome')}
          />
        </View>
      </View>

      <View style={styles.version}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'Jomhuria',
    fontSize: 36,
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#FFE974',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#EEEEEE',
  },
  statNumber: {
    fontFamily: 'Jomhuria',
    fontSize: 36,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Jomhuria',
    fontSize: 26,
    marginLeft: 12,
  },
  version: {
    alignItems: 'center',
    padding: 20,
    marginTop: 24,
  },
  versionText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
  },
});