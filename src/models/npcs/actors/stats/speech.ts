import { proper_list, title_case } from '../../../utilities/text'
import { actor__details } from '../../../utilities/text/entities/actor'
import { Actor } from '../types'

type ActorVoice = Actor['voice']

const voices: Record<keyof ActorVoice, string[]> = {
  pitch: ['sharp', 'deep'],
  quality: ['rough', 'pleasant', 'melodic'],
  volume: ['soft', 'quiet', 'loud', 'crisp'],
  speed: ['quickly', 'slowly'],
  verbosity: ['sparsely', 'copiously']
}

export const npc__voice = (npc: Actor) => {
  const attributes = window.dice.weighted_sample<keyof ActorVoice>(
    [
      { v: 'pitch', w: 2 },
      { v: 'quality', w: 2 },
      { v: 'volume', w: 2 },
      { v: 'speed', w: 1 },
      { v: 'verbosity', w: 1 }
    ],
    2
  )
  npc.voice = attributes.reduce((voice: ActorVoice, attr) => {
    voice[attr] = window.dice.choice(voices[attr])
    return voice
  }, {})
}

export const describe__voice = (actor: Actor) => {
  const { pitch, quality, volume, verbosity, speed } = actor.voice
  const pattern_list = [speed, verbosity].filter(pattern => pattern)
  const patterns = proper_list(pattern_list, 'and')
  const speech_list = [volume, quality, pitch].filter(pattern => pattern)
  const speech = speech_list.join(', ')
  return `${title_case(actor__details.subject({ actor }))} speaks${
    pattern_list.length > 0 ? ` ${patterns}` : ''
  }${speech_list.length > 0 ? ` in a ${speech} voice` : ''}.`
}
