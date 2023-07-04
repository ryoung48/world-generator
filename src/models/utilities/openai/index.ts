import { JSONSchema7 } from 'json-schema'

import { parseOutermostBrackets } from '../text'
import { ChatGPTResponse } from './types'

let chatting = false
const completions = 'https://api.openai.com/v1/chat/completions'

export const openai__chat = async <T>(prompt: string) => {
  if (chatting) return false
  console.log(prompt)
  try {
    chatting = true
    const response = await fetch(completions, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    })
    const data: ChatGPTResponse = await response.json()
    console.log('DATA:', data.choices[0].message.content)
    return JSON.parse(parseOutermostBrackets(data.choices[0].message.content)?.[0] || '{}') as T
  } catch (error) {
    console.log(error)
    return false
  } finally {
    chatting = false
  }
}

export const openai__funcCall = async <T>(params: {
  prompt: string
  schema: { name: string; description: string; parameters: JSONSchema7 }
}) => {
  const { prompt, schema } = params
  console.log(prompt)
  if (chatting) return false
  try {
    chatting = true
    const response = await fetch(completions, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-0613',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        functions: [schema],
        // eslint-disable-next-line camelcase
        function_call: { name: schema.name }
      })
    })
    const data: ChatGPTResponse = await response.json()
    console.log('DATA:', data.choices[0].message.function_call.arguments)
    return JSON.parse(data.choices[0].message.function_call.arguments) as T
  } catch (error) {
    console.log(error)
    return false
  } finally {
    chatting = false
  }
}
