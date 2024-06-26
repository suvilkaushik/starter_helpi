
// function that makes a call to the OpenAI API to generate a response based on a prompt
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

  let attempts = 0;
  while (attempts < 3) {
    // Error handling: retry up to 3 times 
    try {
      const completion = await openai.chat.completions.create({
        response_format: { type: "json_object" },
        model: "gpt-4-1106-preview",
        messages: [
          { role: "system", content: "You are a career counselor" },
          {
            role: "user",
            content:
              "These are the questions and answers that a user has inputted for a quiz designed to recommend a career path:\n" +
              qaString +
              '\nBased on this information, what career path would you recommend, return a JSON with the following template {"Field": [name of career field], "potential_job_titles": [job title 1, job title 2, job title 3], "reasoning": [reasoning for recommendation]}\n',
          },
        ],
      });
      const result = completion.choices[0];
      console.log(result);
      const { content } = result.message;
      console.log(content);
      const contentString = JSON.stringify(content); // Convert content to a string

      return contentString;
    } catch (error) {
      console.error("Error occurred during API call:", error);
      attempts++;
      if (attempts >= 3) {
        throw error; // re-throw the error after 3 failed attempts
      }
    }
  }
  return "";
}

// A function to make a call to the DALL-E API to generate an image based on a prompt
export async function generateImage(prompt: string): Promise<string> {
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

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: "A image of a career in " + prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error("Error occurred during API call:", error);
    throw error;
  }
}
