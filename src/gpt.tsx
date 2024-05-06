export async function generateCareer(
  questions: string[],
  answers: string[]
): Promise<string> {
  const OpenAI = require("openai");

  let keyData = "";
  const saveKeyData = "MYKEY";
  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }
  const openai = new OpenAI({
    apiKey: keyData,
    dangerouslyAllowBrowser: true,
    organization: "org-JQxy7z2AjS0qio5K1VNWXoH7",
    project: "proj_LAKcKEyKlhHJRGVFnqDmX2SV",
  });

  const qaString = questions
    .map((question, index) => `${question}: ${answers[index]}`)
    .join("\n");

    const completion = await openai.chat.completions.create({
        response_format: { "type": "json_object" },
        model: "gpt-3.5-turbo",
        messages: [     
        { role: 'system', content: 'You are a career counselor' },
        { role: 'user', content: "These are the questions and answers that a user has inputted for a quiz designed to recommend a career path:\n" + qaString 
            + "\nBased on this information, what career path would you recommend, return a JSON with the following template {\"Field\": [name of career field], \"potential_job_titles\": [job title 1, job title 2, job title 3], \"reasoning\": [reasoning for recommendation]}\n"}
        ],
    });
    const result = completion.choices[0]
    
    const { content } = result.message;
    console.log(content);
    const contentString = JSON.stringify(content); // Convert content to a string

  return contentString;
}
