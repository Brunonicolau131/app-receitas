import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalhesScreen({ route }) {
  const { receita } = route.params;

  return (
    <SafeAreaView
      style={styles.container}
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Image
          source={{ uri: receita.strMealThumb }}
          style={styles.imagem}
        />

        <Text style={styles.titulo}>{receita.strMeal}</Text>

        <Text style={styles.informacao}>
          Categoria: {receita.strCategory || 'Não informada'}
        </Text>

        <Text style={styles.informacao}>
          Origem: {receita.strArea || 'Não informada'}
        </Text>

        <Text style={styles.subtitulo}>Modo de preparo</Text>

        <Text style={styles.instrucoes}>
          {receita.strInstructions || 'Modo de preparo não disponível.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  imagem: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38271f',
    marginVertical: 16,
  },
  informacao: {
    fontSize: 16,
    color: '#59483d',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b94722',
    marginTop: 20,
    marginBottom: 12,
  },
  instrucoes: {
    fontSize: 17,
    lineHeight: 27,
    color: '#38271f',
  },
});