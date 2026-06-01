import { getRecipe } from './recipeEngine';

describe('getRecipe', () => {
  it('ライフ10%のとき限界レンジ蒸しを返す', () => {
    const recipe = getRecipe(10, '卵');
    expect(recipe.title).toBe('限界レンジ蒸し');
    expect(recipe.step).toContain('卵');
    expect(recipe.time).toBe('3分');
  });

  it('ライフ30%のときズボラ卵とじを返す', () => {
    const recipe = getRecipe(30, 'キャベツ');
    expect(recipe.title).toBe('ズボラ卵とじ');
    expect(recipe.step).toContain('キャベツ');
  });

  it('ライフ50%のときなんちゃって丼を返す', () => {
    const recipe = getRecipe(50, 'ベーコン');
    expect(recipe.title).toBe('なんちゃって丼');
    expect(recipe.step).toContain('ベーコン');
    expect(recipe.time).toBe('5分');
  });

  it('食材が空のときデフォルト文言を使う', () => {
    const recipe = getRecipe(10, '');
    expect(recipe.step).toContain('食材');
  });

  it('食材の前後の空白をトリムする', () => {
    const recipe = getRecipe(30, '  豆腐  ');
    expect(recipe.step).toContain('豆腐');
  });
});
