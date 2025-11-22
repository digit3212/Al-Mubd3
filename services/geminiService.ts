import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Article Generator ---
export const generateArticle = async (
  topic: string, 
  tone: string = 'professional', 
  length: string = 'medium', 
  language: string = 'Arabic'
): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key is missing");

  const lengthPrompt = length === 'short' ? 'around 300-400 words' : length === 'long' ? 'detailed, around 1000-1200 words' : 'around 600-800 words';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a professional content writer. Write a high-quality article about "${topic}".
      
      CRITICAL INSTRUCTION: The output article MUST be written completely in ${language}. 
      Do NOT write in any other language. If the topic is in Arabic but language is English, translate and write in English.
      
      Settings:
      - Tone: ${tone}.
      - Length: ${lengthPrompt}.
      
      Structure Requirements:
      1. Catchy Title (h1).
      2. Engaging Introduction.
      3. Several Subheadings (h2, h3) covering different aspects.
      4. Bullet points or numbered lists where appropriate (ul/li).
      5. Strong Conclusion.
      
      Output Format:
      Return ONLY raw HTML (no markdown backticks, no \`\`\`). 
      Use semantic HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>.
      Do not add any conversational text before or after the HTML.`,
    });
    return response.text || "<p>عذراً، لم أتمكن من إنشاء المحتوى.</p>";
  } catch (error) {
    console.error("Gemini Article Error:", error);
    throw error;
  }
};

// --- SEO Analyzer ---
export const analyzeSeo = async (text: string, keyword: string): Promise<any> => {
  if (!process.env.API_KEY) throw new Error("API Key is missing");
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following text for SEO optimization based on the target keyword: "${keyword}".
      
      Text Snippet (first 2000 chars): "${text.substring(0, 2000)}..."
      
      Perform a strict analysis on:
      1. Keyword Density.
      2. Readability.
      3. Header usage.
      4. Content value.

      Return a strictly valid JSON object (no markdown, no code blocks) with this structure:
      {
        "score": "number between 0-100",
        "summary": "A brief 2-sentence summary of the analysis in Arabic",
        "good": ["array of strings describing positive points in Arabic"],
        "bad": ["array of strings describing improvements needed in Arabic"]
      }`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const cleanJson = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson || '{}');
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    throw error;
  }
};

// --- Content Ideas ---
export const generateContentIdeas = async (niche: string, platform: string, audience: string): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 viral, high-engagement content ideas for the niche: "${niche}".
      Platform: "${platform}".
      Target Audience: "${audience}".
      Language: Arabic.

      Return a strictly valid JSON array (no markdown) where each object has:
      - "title": Catchy, click-worthy title.
      - "description": Brief explanation of the content/script hook.
      - "difficulty": "Easy", "Medium", or "Hard".`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return response.text || "[]";
  } catch (error) {
    console.error("Gemini Ideas Error:", error);
    throw error;
  }
};

// --- Translator ---
export const translateToEnglish = async (text: string): Promise<string> => {
    if (!process.env.API_KEY) return text; 
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate this Arabic text to a descriptive English prompt for an AI image generator. 
            Keep the artistic style and details. Output ONLY the English text.
            Text: "${text}"`,
        });
        return response.text?.trim() || text;
    } catch (error) {
        return text;
    }
}

// --- Image URL Helper ---
export const getImageUrl = (prompt: string, width: number = 1024, height: number = 1024, seed: number = 42, model: string = 'flux'): string => {
    const cleanPrompt = prompt.trim().replace(/[#?&/\\]/g, '');
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    // Removed enhance to rely on frontend prompt engineering, added nologo/private
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true&private=true`;
}