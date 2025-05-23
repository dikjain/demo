import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  try {
    if (!MIXPANEL_TOKEN) {
      console.warn('Mixpanel token is missing! Check your .env.local file.');
      return;
    }
    
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage'
    });

    mixpanel.track('pageview');
    return mixpanel;
  } catch (error) {
    console.error('Error initializing Mixpanel:', error);
  }
};

export const track = (eventName: string, properties?: Record<string, any>) => {
  try {
    mixpanel.track(eventName, properties);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}; 