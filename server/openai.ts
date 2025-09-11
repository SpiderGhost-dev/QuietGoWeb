import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function analyzeStoolPhoto(base64Image: string): Promise<{
  bristol: number;
  color: string;
  confidence: number;
  summary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant specializing in stool analysis. Analyze the provided stool photo and classify it according to the Bristol Stool Scale (1-7), identify the color, provide a confidence score (0-1), and give a brief educational summary. This is for educational purposes only, not medical diagnosis. Respond with JSON in this format: { 'bristol': number, 'color': string, 'confidence': number, 'summary': string }"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this stool photo according to the Bristol Stool Scale. Provide the Bristol type (1-7), color description, confidence level, and educational summary."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      bristol: Math.max(1, Math.min(7, Math.round(result.bristol || 4))),
      color: result.color || 'brown',
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      summary: result.summary || 'Analysis completed. This is for educational purposes only and not medical advice.',
    };
  } catch (error) {
    console.error("Error analyzing stool photo:", error);
    throw new Error("Failed to analyze stool photo: " + (error as Error).message);
  }
}

export async function analyzeMealPhoto(base64Image: string): Promise<{
  foods: Array<{
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    confidence: number;
  }>;
  totalCalories: number;
  summary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a nutrition AI assistant specializing in food recognition and macro calculation. Analyze the provided meal photo and identify foods, estimate portions, calculate calories and macronutrients. Respond with JSON in this format: { 'foods': [{'name': string, 'quantity': number, 'unit': string, 'calories': number, 'macros': {'protein': number, 'carbs': number, 'fat': number, 'fiber': number}, 'confidence': number}], 'totalCalories': number, 'summary': string }"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this meal photo and identify all visible foods, estimate portion sizes, and calculate calories and macronutrients (protein, carbs, fat, fiber) for each item."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // Ensure foods is an array and calculate total calories
    const foods = Array.isArray(result.foods) ? result.foods : [];
    const totalCalories = foods.reduce((sum: number, food: any) => sum + (food.calories || 0), 0);

    return {
      foods: foods.map((food: any) => ({
        name: food.name || 'Unknown food',
        quantity: food.quantity || 1,
        unit: food.unit || 'serving',
        calories: food.calories || 0,
        macros: {
          protein: food.macros?.protein || 0,
          carbs: food.macros?.carbs || 0,
          fat: food.macros?.fat || 0,
          fiber: food.macros?.fiber || 0,
        },
        confidence: Math.max(0, Math.min(1, food.confidence || 0.5)),
      })),
      totalCalories,
      summary: result.summary || 'Meal analysis completed. Nutritional values are estimates.',
    };
  } catch (error) {
    console.error("Error analyzing meal photo:", error);
    throw new Error("Failed to analyze meal photo: " + (error as Error).message);
  }
}
