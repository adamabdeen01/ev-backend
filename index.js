import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your Google Site can securely communicate with this URL
app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize the Google Gen AI client
const ai = new GoogleGenAI();

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: "Message required" });
        }

        // Send the input directly to the Gemini API engine
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });

        return res.json({ reply: response.text });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Start listening for web requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
