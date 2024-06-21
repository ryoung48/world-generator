import OpenAI from 'openai'

import { TEXT } from './text'

let chatting = false

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export const GPT = {
  chat: async <T>(prompts: string[]) => {
    if (chatting) return false
    try {
      chatting = true
      const responses = await Promise.all(
        prompts.map(content => {
          console.log(content)
          return openai.chat.completions.create({
            messages: [
              {
                role: 'system',
                content: 'Assistant is a master creative writer.'
              },
              { role: 'user', content }
            ],
            model: 'meta-llama/llama-3-70b-instruct:nitro',
            temperature: 0
          })
        })
      )
      return responses.map(response => {
        console.log('DATA:', response.choices[0].message.content)
        return JSON.parse(
          TEXT.parseOutermostBrackets(response.choices[0].message.content)?.[0] || '{}'
        ) as T
      })
    } catch (error) {
      console.log(error)
      return false
    } finally {
      chatting = false
    }
  }
}
