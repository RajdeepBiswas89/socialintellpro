
/**
 * SocialIntel Pro Interaction Analytics Service
 * Provides production-grade tracking for enterprise user behavior analysis.
 */

export type EventType = 
  | 'page_view'
  | 'feature_usage'
  | 'button_click'
  | 'api_call'
  | 'auth_event'
  | 'ai_interaction';

interface AnalyticsEvent {
  event: EventType;
  label: string;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

class AnalyticsService {
  private sessionId: string;
  private queue: AnalyticsEvent[] = [];
  private isDevelopment: boolean = true;

  constructor() {
    this.sessionId = Math.random().toString(36).substring(7);
  }

  /**
   * Track a user interaction event
   */
  track(event: EventType, label: string, properties?: Record<string, any>) {
    const payload: AnalyticsEvent = {
      event,
      label,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    this.queue.push(payload);

    if (this.isDevelopment) {
      console.log(`%c[Analytics] ${event.toUpperCase()}: ${label}`, 'color: #6366f1; font-weight: bold', properties || '');
    }

    // In production, we would flush the queue to a backend endpoint
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  private async flush() {
    const eventsToFlush = [...this.queue];
    this.queue = [];
    
    // Mock API call to analytics microservice
    try {
      // await fetch('/api/analytics/batch', { method: 'POST', body: JSON.stringify(eventsToFlush) });
    } catch (e) {
      this.queue = [...eventsToFlush, ...this.queue];
    }
  }
}

export const analytics = new AnalyticsService();
