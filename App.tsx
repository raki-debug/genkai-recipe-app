import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getRecipe } from './src/recipeEngine';
import { LifeLevel, RecipeResult } from './src/types';

const LIFE_LEVELS: LifeLevel[] = [10, 30, 50];

const LIFE_LABELS: Record<LifeLevel, string> = {
  10: '10% 死にそう',
  30: '30% しんどい',
  50: '50% まあまあ',
};

const LIFE_COLORS: Record<LifeLevel, string> = {
  10: '#ef4444',
  30: '#fb923c',
  50: '#facc15',
};

export default function App() {
  const [life, setLife] = useState<LifeLevel>(30);
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);

  const handleGenerate = () => {
    setRecipe(getRecipe(life, ingredients));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" />

      <Text style={styles.title}>限界レシピ</Text>
      <Text style={styles.subtitle}>今の体力でできる1STEPご飯</Text>

      <Text style={styles.label}>今のライフ</Text>
      <View style={styles.lifeLevels}>
        {LIFE_LEVELS.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setLife(level)}
            style={[
              styles.lifeButton,
              { backgroundColor: LIFE_COLORS[level], opacity: life === level ? 1 : 0.3 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={LIFE_LABELS[level]}
            accessibilityState={{ selected: life === level }}
          >
            <Text style={styles.lifeButtonText}>{LIFE_LABELS[level]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>食材（なければ空欄OK）</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 卵、キャベツ、ベーコン"
        placeholderTextColor="#6b7280"
        value={ingredients}
        onChangeText={setIngredients}
        accessibilityLabel="食材入力"
      />

      <TouchableOpacity
        onPress={handleGenerate}
        style={styles.generateButton}
        accessibilityRole="button"
        accessibilityLabel="レシピを生成"
      >
        <Text style={styles.generateButtonText}>レシピを生成する</Text>
      </TouchableOpacity>

      {recipe && (
        <View style={styles.recipeCard} accessibilityLabel="レシピ結果">
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeTime}>⏱ {recipe.time}</Text>
          </View>
          <Text style={styles.recipeStep}>{recipe.step}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 32,
  },
  label: {
    color: '#d1d5db',
    fontWeight: '600',
    marginBottom: 12,
  },
  lifeLevels: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  lifeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
  },
  lifeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 32,
  },
  generateButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  generateButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  recipeCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 20,
  },
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  recipeTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeTime: {
    color: '#9ca3af',
    fontSize: 14,
  },
  recipeStep: {
    color: '#d1d5db',
    lineHeight: 24,
  },
});
