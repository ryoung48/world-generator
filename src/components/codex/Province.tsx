import { VIEW } from '../context'
import { HubView } from './Hub'
import { SiteView } from './Site'

export function ProvinceView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const site = province.sites[state.loc.idx]
  return site.type === 'hub' ? <HubView></HubView> : <SiteView></SiteView>
}
