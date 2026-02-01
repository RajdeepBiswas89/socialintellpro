
import { GoogleGenAI, Type } from "@google/genai";

const AI_CONFIG = {
  model: 'gemini-3-flash-preview',
  proModel: 'gemini-3-pro-preview'
};

export const getViralTopicResearch = async (niche: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Act as a world-class YouTube Growth Strategist. 
      Niche: "${niche}"
      Identify 5 "Exploding Blue Ocean" topics that are about to trend but have low competition right now.
      
      For each topic provide:
      - topic_name: High-impact name
      - viral_coefficient: 0-100 (predicted growth rate)
      - why_now: Cultural or platform trigger
      - competitor_blindspot: What others are missing
      - suggested_title: High-CTR title
      - retention_strategy: One unique hook idea
    `;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic_name: { type: Type.STRING },
              viral_coefficient: { type: Type.NUMBER },
              why_now: { type: Type.STRING },
              competitor_blindspot: { type: Type.STRING },
              suggested_title: { type: Type.STRING },
              retention_strategy: { type: Type.STRING }
            },
            required: ['topic_name', 'viral_coefficient', 'why_now', 'competitor_blindspot', 'suggested_title', 'retention_strategy']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Viral Research Error:", error);
    return [];
  }
};

export const getScriptHookStrategist = async (title: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Generate 3 high-retention psychological hook variations for a video titled: "${title}".
      Each hook should target a specific psychological trigger.
    `;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              archetype: { type: Type.STRING },
              psychological_trigger: { type: Type.STRING },
              script: { type: Type.STRING },
              visual_instruction: { type: Type.STRING }
            },
            required: ['archetype', 'psychological_trigger', 'script', 'visual_instruction']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Hook Strategist Error:", error);
    return [];
  }
};

export const getNeuralScriptOutline = async (title: string, niche: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Generate a 'Neural-Optimized' high-retention script outline for: "${title}" in the "${niche}" niche.
      
      Structure should include:
      - The Hook (0-15s)
      - The Re-Hook (Engagement Spike at 1m)
      - The 'Pattern Interrupt' (at 3m)
      - The Climax/Payoff
      - The 'Viral Loop' Outro (CTA to next video)
    `;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              section: { type: Type.STRING },
              content_brief: { type: Type.STRING },
              retention_logic: { type: Type.STRING },
              visual_cue: { type: Type.STRING }
            },
            required: ['timestamp', 'section', 'content_brief', 'retention_logic', 'visual_cue']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Script Architect Error:", error);
    return [];
  }
};

export const getAudiencePersonas = async (niche: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Create 3 detailed audience personas for the "${niche}" niche. 
      For each persona, define their core motivations, pain points, content triggers, and a "Strategy to Capture" their attention.
    `;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.proModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              age_range: { type: Type.STRING },
              motivations: { type: Type.ARRAY, items: { type: Type.STRING } },
              pain_points: { type: Type.ARRAY, items: { type: Type.STRING } },
              content_triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
              capture_strategy: { type: Type.STRING },
              authority_score: { type: Type.NUMBER }
            },
            required: ['name', 'age_range', 'motivations', 'pain_points', 'content_triggers', 'capture_strategy', 'authority_score']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Persona Architect Error:", error);
    return [];
  }
};

export const getPatternInterrupts = async (scriptOrIdea: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Analyze this video concept: "${scriptOrIdea}".
      Identify 5 critical moments where audience attention will fatigue and suggest high-impact "Pattern Interrupts" (visual or audio disruptions).
    `;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              trigger_point: { type: Type.STRING },
              disruption_type: { type: Type.STRING },
              instruction: { type: Type.STRING },
              impact_score: { type: Type.NUMBER }
            },
            required: ['timestamp', 'trigger_point', 'disruption_type', 'instruction', 'impact_score']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Pattern Lab Error:", error);
    return [];
  }
};

export const getAIInsights = async (channelData: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Analyze: ${JSON.stringify(channelData)}`;
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING },
              priority: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ['title', 'description', 'type', 'priority', 'confidence']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};

export const getVideoSEOAnalysis = async (videoTitle: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `SEO Analysis for: "${videoTitle}"`;
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimization_score: { type: Type.NUMBER },
            keyword_suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            tag_analysis: { type: Type.STRING },
            description_snippet: { type: Type.STRING },
            niche_competitiveness: { type: Type.STRING }
          },
          required: ['optimization_score', 'keyword_suggestions', 'tag_analysis', 'description_snippet', 'niche_competitiveness']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return {};
  }
};
