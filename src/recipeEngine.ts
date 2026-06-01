import { LifeLevel, RecipeResult } from './types';

const RECIPES: Record<LifeLevel, (ingredients: string) => RecipeResult> = {
  10: (ingredients) => ({
    title: '限界レンジ蒸し',
    step: `${ingredients || '食材'}を耐熱皿に並べてラップをし、600Wで3分チン。塩をふって完成。`,
    time: '3分',
  }),
  30: (ingredients) => ({
    title: 'ズボラ卵とじ',
    step: `${ingredients || '食材'}を耐熱ボウルに入れ、卵1個と醤油少々を混ぜてラップし600Wで2分。混ぜてさらに1分チンして完成。`,
    time: '3分',
  }),
  50: (ingredients) => ({
    title: 'なんちゃって丼',
    step: `${ingredients || '食材'}を一口大に切って耐熱皿へ。めんつゆ大さじ2を回しかけラップし600Wで4分。ご飯の上に乗せて完成。`,
    time: '5分',
  }),
};

export function getRecipe(life: LifeLevel, ingredients: string): RecipeResult {
  return RECIPES[life](ingredients.trim());
}
