import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import { useState } from 'react';

export default function CreateScreen() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    expiryDate: '',
  });

  const cards = [
    { id: '28303', type: 'هتاف' },
    { id: '28304', type: 'VIP' },
    { id: '28305', type: 'Standard' },
  ];

  const handleCreate = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your cards</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => setCurrentCard(prev => (prev > 0 ? prev - 1 : cards.length - 1))}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>

        <View style={[styles.card, styles.cardGradient]}>
          <Text style={styles.cardType}>{cards[currentCard].type}</Text>
          <Text style={styles.cardNumber}>{cards[currentCard].id}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.cardName}>{formData.fullName || 'Nora Rasheed'}</Text>
            <Text style={styles.cardDate}>{formData.expiryDate || '2/2/25'}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => setCurrentCard(prev => (prev < cards.length - 1 ? prev + 1 : 0))}>
          <ChevronRight size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot,
              currentCard === index && styles.paginationDotActive
            ]} 
          />
        ))}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Enter your details</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
        />

        <TextInput
          style={styles.input}
          placeholder="National ID"
          value={formData.nationalId}
          onChangeText={(text) => setFormData(prev => ({ ...prev, nationalId: text }))}
          keyboardType="numeric"
        />

        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="dd/mm/yyyy"
            value={formData.expiryDate}
            onChangeText={(text) => setFormData(prev => ({ ...prev, expiryDate: text }))}
          />
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Jomhuria',
    fontSize: 36,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#FFE974',
    borderRadius: 20,
  },
  card: {
    width: 406,
    height: 197,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardGradient: {
    backgroundColor: '#f0f0f0',
    backgroundImage: 'linear-gradient(135deg, #ffffff  0%, #f0f0f0 100%)',
  },
  cardType: {
    fontFamily: 'Jomhuria',
    fontSize: 48,
    textAlign: 'right',
    marginBottom: 15,
  },
  cardNumber: {
    fontFamily: 'Jomhuria',
    fontSize: 52,
    marginBottom: 30,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardName: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
  },
  cardDate: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#000',
  },
  formContainer: {
    padding: 20,
    marginTop: 20,
  },
  formTitle: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    backgroundColor: '#FFE974',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  calendarButton: {
    backgroundColor: '#FFE974',
    padding: 15,
    borderRadius: 15,
  },
  createButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 28,
    color: '#FFFFFF',
  }
});