import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function scoreMatch(patient, trial) {
  const prompt = `Sen klinik tadqiqot eligibility mutaxassisisan.

BEMOR MA'LUMOTLARI:
- Yoshi: ${patient.age}
- Jinsi: ${patient.gender}
- Mamlaakati: ${patient.country}
- Asosiy diagnoz: ${patient.diagnosis}
- Qo'shimcha kasalliklar: ${(patient.comorbidities || []).join(', ') || 'yo\'q'}

TADQIQOT:
- Nomi: ${trial.title}
- Sponsor: ${trial.sponsor}
- Faza: ${trial.phase}
- Holati: ${trial.status}
- Kasalliklar: ${trial.conditions.join(', ')}
- Min yosh: ${trial.eligibility.minAge || 'ko\'rsatilmagan'}
- Max yosh: ${trial.eligibility.maxAge || 'ko\'rsatilmagan'}
- Jins: ${trial.eligibility.gender || 'Hammasi'}
- Joylar: ${trial.locations.map(l => l.country).join(', ')}
- Eligibility kriterlari: ${trial.eligibility.criteria?.slice(0, 800) || 'yo\'q'}

Quyidagi JSON formatida javob ber (faqat JSON, boshqa narsa yozma):
{
  "score": 0-100 orasidagi son,
  "isMatch": true yoki false (score 60+ bo'lsa true),
  "reasons": ["mos kelgan sabablar ro'yxati"],
  "concerns": ["potensial to'siqlar ro'yxati"],
  "explanation": "bemorga oddiy tilda, o'zbek tilida tushuntirish (2-3 gap)"
}`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].text.trim()
  const jsonStart = text.indexOf('{')
  const jsonEnd = text.lastIndexOf('}') + 1
  return JSON.parse(text.slice(jsonStart, jsonEnd))
}
