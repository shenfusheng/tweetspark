import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: false, // MVP阶段先不用登录
//   },
// });

// 收藏相关操作
export async function addFavorite(tweetText: string, topic: string) {
  // MVP: 使用localStorage，未来集成Supabase Auth
  if (typeof window === 'undefined') return { success: false };

  const favorites = JSON.parse(localStorage.getItem('tweetspark_favorites') || '[]');
  favorites.push({
    id: Date.now(),
    tweetText,
    topic,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('tweetspark_favorites', JSON.stringify(favorites));
  return { success: true };
}

export async function getFavorites() {
  if (typeof window === 'undefined') return [];

  const favorites = JSON.parse(localStorage.getItem('tweetspark_favorites') || '[]');
  return favorites;
}

export function removeFavorite(id: number) {
  if (typeof window === 'undefined') return { success: false };

  const favorites = JSON.parse(localStorage.getItem('tweetspark_favorites') || '[]');
  const filtered = favorites.filter((fav: any) => fav.id !== id);
  localStorage.setItem('tweetspark_favorites', JSON.stringify(filtered));
  return { success: true };
}