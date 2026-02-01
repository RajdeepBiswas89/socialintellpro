
export enum MetricTrend {
  UP = 'UP',
  DOWN = 'DOWN',
  NEUTRAL = 'NEUTRAL'
}

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  trend: number;
  trendDirection: MetricTrend;
  sparklineData: number[];
  unit?: string;
}

export interface ChannelInfo {
  id: string;
  name: string;
  avatar: string;
  platform: 'youtube' | 'instagram';
  subscribers: number;
  totalViews: number;
  engagementRate: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'optimization' | 'growth' | 'alert' | 'competitor';
  priority: 'p1' | 'p2' | 'p3';
  timestamp: Date;
  confidence: number;
}

export interface VideoStats {
  id: string | number;
  title: string;
  thumb: string;
  views: string | number;
  likes: string | number;
  comments: string | number;
  ctr: string;
  retention: string;
  platform: 'youtube' | 'instagram';
  status: string;
  watchTime?: string;
  avgDuration?: string;
  revenue?: string;
  retentionCurve?: { time: string; value: number }[];
  demographics?: { category: string; value: number }[];
  locations?: { country: string; value: number }[];
}
