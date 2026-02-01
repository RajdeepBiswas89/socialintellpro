
/**
 * YouTube Service for real-time Data API v3 integration
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeProfile {
  id: string;
  title: string;
  customUrl: string;
  thumbnails: any;
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}

const MOCK_VIDEOS = [
  {
    id: 'mock1',
    title: 'How I Built a $10k/mo SaaS in 30 Days (Full Breakdown)',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    views: '124,500',
    likes: '8,200',
    comments: '450',
    ctr: '8.4%',
    retention: '62%',
    platform: 'youtube' as const,
    status: 'Live',
    watchTime: '4,200 hrs',
    avgDuration: '12:45'
  },
  {
    id: 'mock2',
    title: '10 AI Tools That Will Make You A 10x Developer',
    thumb: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    views: '89,200',
    likes: '5,100',
    comments: '230',
    ctr: '7.1%',
    retention: '54%',
    platform: 'youtube' as const,
    status: 'Live',
    watchTime: '3,100 hrs',
    avgDuration: '08:12'
  },
  {
    id: 'mock3',
    title: 'The Future of Web Design: Glassmorphism vs Neobrutalism',
    thumb: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    views: '45,600',
    likes: '2,800',
    comments: '180',
    ctr: '6.2%',
    retention: '48%',
    platform: 'youtube' as const,
    status: 'Live',
    watchTime: '1,500 hrs',
    avgDuration: '15:30'
  }
];

export class YoutubeService {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }

  async fetchMyChannel(): Promise<YouTubeProfile> {
    if (!this.accessToken) {
      // Fallback for demo mode
      return {
        id: 'UC_DEMO_CHANNEL_ID',
        title: 'SocialIntel Demo',
        customUrl: '@socialintel_pro',
        thumbnails: { high: { url: 'https://picsum.photos/seed/demo/200/200' } },
        statistics: {
          viewCount: '1500000',
          subscriberCount: '124500',
          videoCount: '142'
        }
      };
    }
    
    const response = await fetch(`${YOUTUBE_API_BASE}/channels?part=snippet,statistics&mine=true`, {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    });
    
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    const channel = data.items[0];
    return {
      id: channel.id,
      title: channel.snippet.title,
      customUrl: channel.snippet.customUrl,
      thumbnails: channel.snippet.thumbnails,
      statistics: channel.statistics
    };
  }

  async fetchMyVideos(maxResults = 10): Promise<any[]> {
    if (!this.accessToken) {
      // Return mock data for demo mode
      return MOCK_VIDEOS;
    }

    try {
      // First, get the 'uploads' playlist ID
      const channelRes = await fetch(`${YOUTUBE_API_BASE}/channels?part=contentDetails&mine=true`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      const channelData = await channelRes.json();
      if (!channelData.items) return MOCK_VIDEOS;
      
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Fetch items from the uploads playlist
      const playlistRes = await fetch(`${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      const playlistData = await playlistRes.json();

      // Map to our internal VideoStats format
      const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');
      
      // Get real statistics for these videos
      const statsRes = await fetch(`${YOUTUBE_API_BASE}/videos?part=statistics,contentDetails,snippet&id=${videoIds}`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      const statsData = await statsRes.json();

      return statsData.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        views: parseInt(item.statistics.viewCount).toLocaleString(),
        likes: parseInt(item.statistics.likeCount).toLocaleString(),
        comments: parseInt(item.statistics.commentCount).toLocaleString(),
        ctr: "7.2%", // Mocking CTR as it needs Analytics API
        retention: "58%",
        platform: 'youtube',
        status: 'Live',
        watchTime: "Calculated",
        avgDuration: item.contentDetails.duration
      }));
    } catch (e) {
      console.warn("API Error, falling back to mock data:", e);
      return MOCK_VIDEOS;
    }
  }

  /**
   * Triggers the Google Identity Services OAuth flow
   */
  static login(clientId: string, callback: (token: string) => void) {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      callback: (response: any) => {
        if (response.access_token) {
          callback(response.access_token);
        }
      },
    });
    client.requestAccessToken();
  }
}

export const youtube = new YoutubeService();
