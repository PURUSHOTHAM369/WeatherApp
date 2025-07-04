import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '2124d6f826e017abed4faeb772399f13'; // 🔑 Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (!city.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather App</Text>
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Get Weather" onPress={getWeather} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0f0fd', padding: 20, paddingTop: 80 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  result: { marginTop: 30, alignItems: 'center' },
  city: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 40, fontWeight: 'bold', color: '#ff8c00' },
  desc: { fontSize: 20, fontStyle: 'italic' },
});
