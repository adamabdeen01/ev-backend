import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const ai = new GoogleGenAI();

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).json({ error: "Message required" });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });

        res.json({ reply: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
