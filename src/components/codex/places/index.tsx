import { PROVINCE } from '../../../models/regions/provinces'
import { TEXT } from '../../../models/utilities/text'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { StyledText } from '../common/text/styled'
import { CampView } from './camp'
import { HubView } from './hub'
import { RuinView } from './ruin'
import { VillageView } from './village'
import { WildernessView } from './wilderness'

export function PlaceView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const place = province.places[state.loc.place]
  const nation = PROVINCE.nation(province)
  return (
    <CodexPage
      title={place.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${place.subtype} (${place.type}), ${TEXT.decorate({
            link: nation,
            label: nation.name
          })}`}
        ></StyledText>
      }
      content={
        place.type === 'hub' ? (
          <HubView hub={place} />
        ) : place.type === 'village' ? (
          <VillageView village={place}></VillageView>
        ) : place.type === 'camp' ? (
          <CampView camp={place}></CampView>
        ) : place.type === 'ruin' ? (
          <RuinView ruin={place}></RuinView>
        ) : (
          <WildernessView wilderness={place}></WildernessView>
        )
      }
    ></CodexPage>
  )
}
