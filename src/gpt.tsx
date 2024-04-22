export async function generateCareer(questions: string[], answers: string[]) {
    const OpenAI = require('openai');

    let keyData = "";
    const saveKeyData = "MYKEY";
    const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
    if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
    }
    const openai = new OpenAI({
        apiKey: keyData,
        dangerouslyAllowBrowser: true,
        organization: 'org-JQxy7z2AjS0qio5K1VNWXoH7',
        project: 'proj_LAKcKEyKlhHJRGVFnqDmX2SV',
      });
    // const openai = new OpenAI({apiKey: localStorage.getItem("MYKEY"),dangerouslyAllowBrowser: true});
    console.log(localStorage.getItem("MYKEY"))
    const qaString = questions.map((question, index) => `${question}: ${answers[index]}`).join('\n');

    const completion = await openai.chat.completions.create({
        response_format: { "type": "json_object" },
        model: "gpt-3.5-turbo",
        messages: [     
        { role: 'system', content: 'You are a career counselor' },
        { role: 'user', content: "These are the questions and answers that a user has inputted for a quiz designed to recommend a career path:\n" + qaString 
            + "\nBased on this information, what career path would you recommend, return a json?"}
        ],
    });
    const result = completion.choices[0]
    
    const { content } = result.message;
    console.log(content);
}