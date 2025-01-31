import axios from "axios";

const API_KEY = "your_openai_api_key";

export const generateSummary = async (text: string) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Summarize this note:\n${text}`,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
};
