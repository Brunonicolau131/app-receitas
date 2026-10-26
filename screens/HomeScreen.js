import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarReceitas() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
        { timeout: 15000 }
      );

      setReceitas(resposta.data.meals ?? []);
    } catch (error) {
      setErro('Não foi possível carregar as receitas. Verifique sua internet.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarReceitas();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#b94722" />
        <Text style={styles.aviso}>Carregando receitas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.aviso}>{erro}</Text>
        <Button
          title="Tentar novamente"
          onPress={buscarReceitas}
          color="#b94722"
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['left', 'right', 'bottom']}
    >
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.aviso}>Nenhuma receita encontrada.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Detalhes', { receita: item })
            }
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.imagem}
            />

            <Text style={styles.nome}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
  },
  lista: {
    padding: 16,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff8f0',
  },
  aviso: {
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eadfd5',
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  nome: {
    padding: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38271f',
  },
});