import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Earth, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { NFCCard } from '../../components/NFCCard';

interface ReservationCardProps {
  title: string;
  time: string;
  date: string;
  status: 'Started' | 'Has not Started';
  image: string;
  logo?: string;
}

function ReservationCard({ title, time, date, status, image, logo }: ReservationCardProps) {
  return (
    <View style={styles.reservationCard}>
      <Image source={{ uri: image }} style={styles.reservationImage} />
      <View style={styles.reservationContent}>
        <Text style={styles.reservationTitle}>{title}</Text>
        <View style={styles.reservationTimeContainer}>
          <Text style={styles.reservationTime}>{time}</Text>
          <Text style={styles.reservationDate}>{date}</Text>
        </View>
        <Text style={styles.reservationStatusText}>{status}</Text>
      </View>
      {logo && (
        <Image source={{ uri: logo }} style={styles.reservationLogo} />
      )}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/${route}`);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.name}>Nora Rasheed</Text>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.cardContainer}>
          <NFCCard
            cardNumber="28303"
            cardHolder="Nora Rasheed"
            expiryDate="2/2/25"
            type="هتاف"
          />
        </View>

        <Text style={styles.sectionTitle}>My Reservations</Text>

        <ReservationCard
          title="al Hilal vs al nasser"
          time="20:22-22:50"
          date="Tue,16 Mar"
          status="Started"
          image="https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=500"
          logo="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Saudi_Pro_League_logo_2022.png/150px-Saudi_Pro_League_logo_2022.png"
        />

        <ReservationCard
          title="Coco vs Zheng"
          time="18:00-20:00"
          date="Thu,18 Mar"
          status="Has not Started"
          image="https://images.unsplash.com/photo-1560012057-4372e14c5085?w=500"
          logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/WTA_tennis_logo_2010.svg/150px-WTA_tennis_logo_2010.svg.png"
        />

        <Text style={styles.sectionTitle}>Upcoming events</Text>

        <View style={styles.upcomingGrid}>
          <View style={styles.upcomingCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500' }}
              style={styles.upcomingImage}
            />
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>Nadal vs carlos</Text>
              <Text style={styles.upcomingDate}>wed, 02 Apr</Text>
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </View>
            </View>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/ATP_tennis_logo.svg/150px-ATP_tennis_logo.svg.png' }}
              style={styles.upcomingLogo}
            />
          </View>

          <View style={styles.upcomingCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500' }}
              style={styles.upcomingImage}
            />
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>Al Shabab vs Al Attihad</Text>
              <Text style={styles.upcomingDate}>sun, 22 Apr</Text>
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </View>
            </View>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Saudi_Pro_League_logo_2022.png/150px-Saudi_Pro_League_logo_2022.png' }}
              style={styles.upcomingLogo}
            />
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.menuBar}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleNavigation('map')}>
          <Earth size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.activeMenuItem]}>
          <View style={styles.activeMenuContent}>
            <Image 
              source={require('../../assets/images/Home-Icon.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleNavigation('profile')}>
          <User size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Jomhuria',
    fontSize: 36,
    color: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reservationImage: {
    width: '100%',
    height: 150,
  },
  reservationContent: {
    padding: 15,
  },
  reservationTitle: {
    fontFamily: 'Jomhuria',
    fontSize: 28,
    marginBottom: 8,
  },
  reservationTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reservationTime: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
    marginRight: 15,
  },
  reservationDate: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
  },
  reservationStatusText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#5500FF',
    textAlign: 'right',
  },
  reservationLogo: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
  },
  upcomingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  upcomingCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingImage: {
    width: '100%',
    height: 120,
  },
  upcomingContent: {
    padding: 12,
  },
  upcomingTitle: {
    fontFamily: 'Jomhuria',
    fontSize: 26,
    marginBottom: 4,
  },
  upcomingDate: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
    marginBottom: 12,
  },
  upcomingLogo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  bookButton: {
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#FFF',
  },
  bottomPadding: {
    height: 100,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -114 }],
    width: 228,
    height: 61,
    borderRadius: 30,
    gap: 24,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMenuItem: {
    backgroundColor: '#FFE974',
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 16,
  },
  activeMenuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#000',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});