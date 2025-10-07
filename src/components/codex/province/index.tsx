import { VIEW } from '../../context'
import { HubView } from './Hub'
import { SiteView } from './Site'

export function ProvinceView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  const site = province.hub
  return site.site === 'hub' ? <HubView></HubView> : <SiteView></SiteView>
}
