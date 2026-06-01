import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import './global.css';
import { getRecipe } from './src/recipeEngine';
import { LifeLevel, RecipeResult } from './src/types';

const LIFE_LEVELS: LifeLevel[] = [10, 30, 50];

const LIFE_LABELS: Record<LifeLevel, string> = {
  10: '10% 死にそう',
  30: '30% しんどい',
  50: '50% まあまあ',
};

const LIFE_COLORS: Record<LifeLevel, string> = {
  10: 'bg-red-500',
  30: 'bg-orange-400',
  50: 'bg-yellow-400',
};

export default function App() {
  const [life, setLife] = useState<LifeLevel>(30);
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);

  const handleGenerate = () => {
    setRecipe(getRecipe(life, ingredients));
  };

  return (
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="px-5 pt-16 pb-10">
      <StatusBar style="light" />

      <Text className="text-3xl font-bold text-white mb-1">限界レシピ</Text>
      <Text className="text-gray-400 mb-8">今の体力でできる1STEPご飯</Text>

      {/* ライフ選択 */}
      <Text className="text-gray-300 font-semibold mb-3">今のライフ</Text>
      <View className="flex-row gap-3 mb-6">
        {LIFE_LEVELS.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setLife(level)}
            className={`flex-1 py-3 rounded-xl ${LIFE_COLORS[level]} ${life === level ? 'opacity-100' : 'opacity-30'}`}
            accessibilityRole="button"
            accessibilityLabel={LIFE_LABELS[level]}
            accessibilityState={{ selected: life === level }}
          >
            <Text className="text-white font-bold text-center text-sm">{LIFE_LABELS[level]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 食材入力 */}
      <Text className="text-gray-300 font-semibold mb-3">食材（なければ空欄OK）</Text>
      <TextInput
        className="bg-gray-800 text-white rounded-xl px-4 py-3 mb-8"
        placeholder="例: 卵、キャベツ、ベーコン"
        placeholderTextColor="#6b7280"
        value={ingredients}
        onChangeText={setIngredients}
        accessibilityLabel="食材入力"
      />

      {/* 生成ボタン */}
      <TouchableOpacity
        onPress={handleGenerate}
        className="bg-indigo-500 py-4 rounded-2xl mb-8"
        accessibilityRole="button"
        accessibilityLabel="レシピを生成"
      >
        <Text className="text-white font-bold text-center text-lg">レシピを生成する</Text>
      </TouchableOpacity>

      {/* レシピ表示 */}
      {recipe && (
        <View className="bg-gray-800 rounded-2xl p-5" accessibilityLabel="レシピ結果">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-xl font-bold">{recipe.title}</Text>
            <Text className="text-gray-400 text-sm">⏱ {recipe.time}</Text>
          </View>
          <Text className="text-gray-300 leading-6">{recipe.step}</Text>
        </View>
      )}
    </ScrollView>
  );
}
