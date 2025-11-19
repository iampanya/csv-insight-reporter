import { GoogleGenAI } from "@google/genai";
import { CleanedDataRow } from "../types";

export const generateReport = async (
  data: CleanedDataRow[],
  query: string
): Promise<string> => {
  try {
    // Initialize the Gemini API client using process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Convert data to JSON string
    // Gemini 2.5 Flash accommodates huge context, allowing us to pass the dataset directly.
    const dataString = JSON.stringify(data);

    const userPrompt = `
      Data Schema (CSV Columns):
      - BA: Business Area (รหัสหน่วยงาน)
      - monthly: YYYYMM (เดือนของรายการ)
      - actCode: Account Code (รหัสบัญชี)
      - amount: จำนวนเงิน

      Dataset (JSON):
      \`\`\`json
      ${dataString}
      \`\`\`

      User Query: "${query}"

      Please analyze the data and generate a report in Thai markdown format based on the user query.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: "คุณคือ Senior Financial Data Analyst ที่เชี่ยวชาญการวิเคราะห์ข้อมูลธุรกรรมทางการเงินและสรุปผลเป็นภาษาไทย หน้าที่ของคุณคืออ่าน JSON Data ที่ได้รับ วิเคราะห์ตามคำถาม (Query) และสร้างรายงานแบบ Markdown ที่สวยงาม อ่านง่าย มีการสรุปยอดรวม (Total), แนวโน้ม (Trends), และข้อสังเกตสำคัญ (Insights) เสมอ",
        temperature: 0.3, // Low temperature for factual analysis
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "ขออภัย ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้ (Empty Response)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Enhance error message for UI
    if (error instanceof Error) {
       return `เกิดข้อผิดพลาด: ${error.message}`;
    }
    
    throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API กรุณาตรวจสอบ API Key หรือลองใหม่อีกครั้ง");
  }
};