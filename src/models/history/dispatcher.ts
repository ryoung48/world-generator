import { profile } from '../utilities/performance'
import { event__diplomacy } from './diplomacy'
import { event__healthCheck } from './health'
import { event__rebellion } from './rebellion'
import { event__succession } from './succession'
import { EventController, EventType } from './types'
import { event__war } from './war'

const event__dispatcher: Record<EventType, EventController> = {
  war: event__war,
  rebellion: event__rebellion,
  diplomacy: event__diplomacy,
  succession: event__succession,
  healthCheck: event__healthCheck
}

export const world__tick = (time: number) => {
  window.world.historyRecording = true
  while (window.world.future.peek().time <= time) {
    const event = window.world.future.dequeue()
    const controller = event__dispatcher[event.type]
    window.world.date = event.time
    profile({
      label: `Event: ${controller.title}`,
      f: () => controller.tick(event)
    })
  }
  window.world.date = time
  window.world.historyRecording = false
}
