import axios from "axios";
import config from "../config/config.js";
const ai = async (promptMsg) => {
  const response = await axios.post(
    config.gemini.Url,
    {
      contents: [
        {
          parts: [
            {
              text: promptMsg,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "x-goog-api-key": config.gemini.apiKey,
      },
    }
  );
  return response.data.candidates[0].content.parts[0].text;
};
export default ai;
