import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export default async function handler(req, res) {
    // Set headers to allow your Google Site to reach this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle initial handshake requests seamlessly
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).json({ error: "Message required" });

        // Connect directly to the Gemini API engine
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });

        return res.status(200).json({ reply: response.text });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
