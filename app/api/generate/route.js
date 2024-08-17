import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemPrompt =`
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards. Give the front as questions and the back as answers.
Both front and back should be one sentence long. Do not say "Here are 10 flashcards about {the topic of the flashcards}." Just give the flashcards without any other words.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}

`

export async function POST(req){
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    })

    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {role : 'system', content: systemPrompt},
            {role:'user', content: data},
        ],
        model: "meta-llama/llama-3.1-8b-instruct:free",
        response_format: { type: 'json_object' },
    });    
    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
    
}
