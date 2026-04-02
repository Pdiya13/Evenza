const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAISuggestions = async (req, res) => {
  try {
    const { eventName, type, budget, location, details } = req.body;

    const prompt = `
    You are an expert event planner.

    Event: ${eventName}
    Type: ${type}
    Budget: ${budget}
    Location: ${location}
    Details: ${details}

    Give:
    1. Creative ideas
    2. Checklist tasks
    3. Budget tips
    4. Unique innovations

    Format in clean bullet points.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      success: true,
      data: response.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
};

module.exports = { getAISuggestions };