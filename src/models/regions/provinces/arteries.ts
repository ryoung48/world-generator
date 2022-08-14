import { province__is_capital, province__local_neighbors, province__sort_closest } from '.'
import { Province } from './types'

export const province__connected = (city: Province) => {
  return city.artery.length > 0 || province__is_capital(city)
}

// All roads lead to Rome: attach to an arterial network
export const province__attach = (city: Province, idx: number) => {
  // attach myself
  city.artery = [idx]
  const visited: Record<string, boolean> = {}
  const queue: Province[] = [city]
  // attach all of my unconnected neighbors (and their neighbors)
  while (queue.length > 0) {
    const curr = queue.shift()
    if (!visited[curr.idx]) {
      visited[curr.idx] = true
      const neighbors = province__sort_closest(province__local_neighbors(curr), curr).filter(
        n => !province__connected(n)
      )
      neighbors.forEach(n => {
        n.artery = [curr.idx]
      })
      queue.push(...neighbors)
    }
  }
}
// sever from an arterial network
export const province__sever = (city: Province) => {
  // sever myself
  city.artery = []
  const visited: Record<string, boolean> = {}
  const severed: Province[] = [city]
  const queue: Province[] = [city]
  // sever all other neighbors who on longer have arterial links
  // due to my severance
  while (queue.length > 0) {
    const curr = queue.shift()
    if (!visited[curr.idx]) {
      visited[curr.idx] = true
      const neighbors = province__local_neighbors(curr).filter(n => !visited[n.idx])
      neighbors.forEach(n => {
        n.artery = n.artery.filter(idx => idx !== curr.idx)
      })
      const lost = neighbors.filter(n => !province__connected(n))
      lost.filter(n => !severed.includes(n)).forEach(n => severed.push(n))
      queue.push(...lost)
    }
  }
  return severed
}
