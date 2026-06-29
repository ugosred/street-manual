export type CategoryId =
  | 'techniques'
  | 'shoot_like'
  | 'london'
  | 'herts'
  | 'essex'
  | 'projects'
  | 'settings';

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  title: string;
  body: string;
  locked: boolean;
  settings?: string;
  location?: string;
  assignment?: string; // a practical exercise for the photographer
  estimatedTime?: string;
}
