import { profile } from '../../utilities/performance'
import { event_type, EventController } from '../types'
import { event__diplomacy } from './diplomacy'
import { event__health_check } from './health'
import { event__rebellion } from './rebellion'
import { event__succession } from './succession'
import { event__war } from './war'

const event__dispatcher: Record<event_type, EventController> = {
  war: event__war,
  rebellion: event__rebellion,
  diplomacy: event__diplomacy,
  succession: event__succession,
  health_check: event__health_check
}

export const world__tick = (time: number) => {
  window.world.history_recording = true
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
  window.world.history_recording = false
}
