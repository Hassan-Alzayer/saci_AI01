import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapViewProps {
  style?: any;
}

export function MapView({ style }: MapViewProps) {
  const mapUrl = 'https://app.mappedin.com/map/67e7ddd4104606000b7c88f5';

  if (Platform.OS === 'web') {
    return (
      <iframe
        src={mapUrl}
        style={{
          ...style,
          border: 'none',
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        allow="geolocation"
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: mapUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});