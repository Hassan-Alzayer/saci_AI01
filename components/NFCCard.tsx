import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Wifi, WifiOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

interface NFCCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  type: string;
  email?: string;
}

export function NFCCard({ cardNumber, cardHolder, expiryDate, type, email }: NFCCardProps) {
  const [nfcAvailable, setNfcAvailable] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [writeSuccess, setWriteSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkNFCAvailability();
    return () => {
      if (Platform.OS !== 'web') {
        NfcManager.cancelTechnologyRequest();
      }
    };
  }, []);

  const checkNFCAvailability = async () => {
    try {
      if (Platform.OS === 'web') {
        setNfcAvailable('NDEFReader' in window);
      } else {
        const supported = await NfcManager.isSupported();
        if (supported) {
          await NfcManager.start();
          const enabled = await NfcManager.isEnabled();
          setNfcAvailable(enabled);
        } else {
          setNfcAvailable(false);
          setError('NFC is not supported on this device');
        }
      }
    } catch (ex) {
      console.warn('NFC check error:', ex);
      setError('Unable to initialize NFC. Please check if NFC is enabled on your device.');
      setNfcAvailable(false);
    }
  };

  const writeNdef = async () => {
    if (!nfcAvailable) {
      setError('NFC is not available');
      return;
    }

    try {
      setIsProcessing(true);
      setIsWriting(true);
      setError(null);

      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Prepare card data
      const cardData = {
        number: cardNumber,
        holder: cardHolder,
        expiry: expiryDate,
        type: type
      };

      // Create NDEF message
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(cardData))
      ]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        setWriteSuccess(true);
        setError('Write successful!');
      }
    } catch (ex) {
      console.warn('ex', ex);
      setError('Writing failed. Please try again.');
    } finally {
      setIsWriting(false);
      setIsProcessing(false);
      NfcManager.cancelTechnologyRequest();
    }
  };

  const handleCardPress = async () => {
    if (Platform.OS !== 'web') {
      await writeNdef();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.card, styles.cardGradient]} 
        onPress={handleCardPress}
        activeOpacity={0.8}
      >
        <View style={styles.nfcIndicator}>
          {nfcAvailable ? (
            <Wifi size={24} color="#000" />
          ) : (
            <WifiOff size={24} color="#666" />
          )}
        </View>
        <Text style={styles.cardType}>{type}</Text>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.cardName}>{cardHolder}</Text>
          <Text style={styles.cardDate}>{expiryDate}</Text>
        </View>

        {(isProcessing || writeSuccess) && (
          <View style={styles.overlay}>
            <ActivityIndicator 
              size="large" 
              color="#FFE974" 
              style={styles.loadingIndicator}
            />
            <Text style={styles.overlayText}>
              {writeSuccess ? 'تم الكتابة بنجاح!' : isWriting ? 'جاري الكتابة...' : 'جاري البحث عن البطاقة...'}
            </Text>
            {isProcessing && !writeSuccess && (
              <Text style={styles.overlaySubText}>
                الرجاء تقريب البطاقة من الجهاز
              </Text>
            )}
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    height: 197,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  cardGradient: {
    backgroundColor: '#f0f0f0',
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  },
  nfcIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE974',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardType: {
    fontFamily: 'Jomhuria',
    fontSize: 48,
    textAlign: 'right',
    marginBottom: 15,
    marginRight: 50,
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
  },
  cardName: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
  },
  cardDate: {
    fontFamily: 'Jomhuria',
    fontSize: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingIndicator: {
    marginBottom: 16,
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Jomhuria',
    marginBottom: 8,
    textAlign: 'center',
  },
  overlaySubText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Jomhuria',
    opacity: 0.8,
    textAlign: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderRadius: 10,
    padding: 8,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Jomhuria',
    textAlign: 'center',
  },
});