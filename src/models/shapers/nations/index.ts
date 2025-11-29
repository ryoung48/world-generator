import { TRADE_GOODS } from '../../provinces/trade'
import { PERFORMANCE } from '../../utilities/performance'
import { shapeCultures, shapeMinorities } from './cultures'
import { shapeDemographics } from './demographics'
import { shapeGdp } from './economics'
import { shapeGovernments } from './governments'
import { shapeLanguages } from './languages'
import { shapeWalls } from './military'
import { shapeNames } from './names'
import { shapeNations } from './nations'
import { shapeReligions } from './religions'
import { shapeConflicts } from './conflicts'

export const NATION_SHAPER = PERFORMANCE.profile.wrapper({
  label: 'NATION_SHAPER',
  o: {
    cultures: shapeCultures,
    minorities: shapeMinorities,
    languages: shapeLanguages,
    religions: shapeReligions,
    names: shapeNames,
    governments: shapeGovernments,
    nations: shapeNations,
    demographics: shapeDemographics,
    walls: shapeWalls,
    conflicts: shapeConflicts,
    gdp: shapeGdp,
    build: () => {
      NATION_SHAPER.nations()
      NATION_SHAPER.cultures()
      NATION_SHAPER.languages()
      NATION_SHAPER.religions()
      NATION_SHAPER.names()
      NATION_SHAPER.minorities()
      NATION_SHAPER.governments()
      // NATION_SHAPER.walls()
      NATION_SHAPER.demographics()
      NATION_SHAPER.conflicts()
      TRADE_GOODS.exports()
      NATION_SHAPER.gdp()
    }
  }
})
