import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// Only initialize on native platforms
if (Platform.OS !== 'web') {
  NfcManager.start();
}

type NFCWriteMode = 'TEXT' | 'URI' | 'WIFI_SIMPLE' | 'VCARD';

export default function NFCWriteScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<NFCWriteMode>('TEXT');
  const [value, setValue] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nfcAvailable, setNfcAvailable] = useState(false);

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
          try {
            const startResult = await NfcManager.start();
            if (startResult !== null) {
              const enabled = await NfcManager.isEnabled();
              setNfcAvailable(enabled);
            } else {
              setNfcAvailable(false);
              setError('NFC initialization failed. Please ensure NFC is enabled.');
            }
          } catch (startError) {
            console.warn('NFC start error:', startError);
            setNfcAvailable(false);
            setError('Failed to initialize NFC. Please check your device settings.');
          }
        } else {
          setError('NFC is not supported on this device');
          setNfcAvailable(false);
        }
      }
    } catch (ex) {
      console.warn('NFC check error:', ex);
      setError('Unable to initialize NFC. Please check if NFC is enabled on your device.');
      setNfcAvailable(false);
    }
  };

  const encodeText = (text: string): Uint8Array => {
    return new TextEncoder().encode(text);
  };

  const writeNdef = async () => {
    if (!nfcAvailable) {
      setError('NFC is not available');
      return;
    }

    try {
      setIsWriting(true);
      setError(null);

      // Encode the text using TextEncoder
      const encodedValue = encodeText(value);

      if (Platform.OS === 'web') {
        const ndef = new (window as any).NDEFReader();
        await ndef.write({
          records: [
            {
              recordType: "text",
              data: encodedValue,
              encoding: "utf-8",
              lang: "en"
            }
          ]
        });
      } else {
        await NfcManager.requestTechnology(NfcTech.Ndef);

        let bytes;
        switch (mode) {
          case 'TEXT':
            bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
            break;
          case 'URI':
            bytes = Ndef.encodeMessage([Ndef.uriRecord(value)]);
            break;
          case 'WIFI_SIMPLE':
            const [ssid, password] = value.split(',');
            const credentials = {
              ssid: ssid.trim(),
              networkKey: password.trim(),
            };
            bytes = Ndef.encodeMessage([
              Ndef.wifiSimpleRecord(credentials)
            ]);
            break;
          case 'VCARD':
            bytes = Ndef.encodeMessage([
              Ndef.mimeMediaRecord('text/vcard', value)
            ]);
            break;
        }

        if (bytes) {
          await NfcManager.ndefHandler.writeNdefMessage(bytes);
          setError('Write successful!');
        }
      }
    } catch (ex) {
      console.warn('ex', ex);
      setError('Writing failed. Please try again.');
    } finally {
      setIsWriting(false);
      if (Platform.OS !== 'web') {
        NfcManager.cancelTechnologyRequest();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Write NFC Tag</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeSelector}>
        {(['TEXT', 'URI', 'WIFI_SIMPLE', 'VCARD'] as NFCWriteMode[]).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.modeButton, mode === m && styles.modeButtonActive]}
            onPress={() => setMode(m)}>
            <Text style={[styles.modeButtonText, mode === m && styles.modeButtonTextActive]}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={
            mode === 'WIFI_SIMPLE' 
              ? "Enter SSID, password" 
              : mode === 'VCARD' 
                ? "Enter vCard data"
                : `Enter ${mode.toLowerCase()}`
          }
          multiline={mode === 'VCARD'}
          numberOfLines={mode === 'VCARD' ? 4 : 1}
        />
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity
        style={[styles.writeButton, (!nfcAvailable || isWriting) && styles.writeButtonDisabled]}
        onPress={writeNdef}
        disabled={!nfcAvailable || isWriting}>
        <Text style={styles.writeButtonText}>
          {isWriting ? 'Writing...' : 'Write to Tag'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Jomhuria',
    fontSize: 36,
  },
  backButton: {
    backgroundColor: '#FFE974',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
  },
  modeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  modeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFE974',
  },
  modeButtonActive: {
    backgroundColor: '#FFE974',
  },
  modeButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#666',
  },
  modeButtonTextActive: {
    color: '#000',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    minHeight: 50,
  },
  error: {
    fontFamily: 'Jomhuria',
    fontSize: 24,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  writeButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  writeButtonDisabled: {
    opacity: 0.5,
  },
  writeButtonText: {
    fontFamily: 'Jomhuria',
    fontSize: 28,
    color: '#FFFFFF',
  },
});