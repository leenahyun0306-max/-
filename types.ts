
export interface HistoryItem {
  id: string;
  temperature: number;
  reason: string;
  feedback: string;
  timestamp: number;
}

export enum Page {
  Home = 'home',
  Participate = 'participate',
  Wall = 'wall'
}
