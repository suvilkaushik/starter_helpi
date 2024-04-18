export async function generateCareer(questions: string[], answers: string[]) {
    const OpenAI = require('openai');

    const openai = new OpenAI({apiKey: localStorage.getItem("MYKEY")});

    const qaString = questions.map((question, index) => `${question}: ${answers[index]}`).join('\n');

    const completion = await openai.chat.completions.create({
        response_format: { "type": "json_object" },
        messages: [     
        { role: 'system', content: 'You are a career counselor' },
        { role: 'user', content: "These are the questions and answers that a user has inputted for a quiz designed to recommend a career path:\n" + qaString 
            + "\nBased on this information, what career path would you recommend?"}
        ],
    });
    const result = completion.choices[0]
    
    const { content } = result.message;
    console.log(content);
}