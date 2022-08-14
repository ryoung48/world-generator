import { SimpleToggle } from '../../common/navigation/ToggleButtons'
import { CultureView } from './Culture'
import { MarketsView } from './Markets'
import { OccupationsView } from './Occupations'

export function SocietyView() {
  return (
    <SimpleToggle
      tabs={{
        culture: <CultureView></CultureView>,
        occupations: <OccupationsView></OccupationsView>,
        economy: <MarketsView></MarketsView>
      }}
    ></SimpleToggle>
  )
}
