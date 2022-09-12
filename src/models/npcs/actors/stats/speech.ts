import { properList, titleCase } from '../../../utilities/text'
import { actor__details } from '../text'
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
  const attributes = window.dice.weightedSample<keyof ActorVoice>(
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
  const patternList = [speed, verbosity].filter(pattern => pattern)
  const patterns = properList(patternList, 'and')
  const speechList = [volume, quality, pitch].filter(pattern => pattern)
  const speech = speechList.join(', ')
  return `${titleCase(actor__details.subject({ actor }))} speaks${
    patternList.length > 0 ? ` ${patterns}` : ''
  }${speechList.length > 0 ? ` in a ${speech} voice` : ''}.`
}
