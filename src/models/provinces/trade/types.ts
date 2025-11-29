import { Cell } from "../../cells/types";

export type TradeGood =
  | "academic research"
  | "aeronautical supplies"
  | "alchemical herbs"
  | "alum"
  | "anti-magic alloys"
  | "apiaries"
  | "arcane reagents"
  | "artillery"
  | "artwork"
  | "astronomical equipment"
  | "beer"
  | "ceramics"
  | "clay"
  | "clockwork devices"
  | "coal"
  | "cocoa"
  | "coffee"
  | "copper"
  | "cotton"
  | "cybernetics"
  | "daemonic curios"
  | "deep-sea harvests"
  | "dyes"
  | "enchantments"
  | "fiber crops"
  | "fine clothing"
  | "fishing"
  | "fruits"
  | "fur"
  | "furniture"
  | "gemstones"
  | "glassware"
  | "gold"
  | "grain"
  | "horses"
  | "incense"
  | "industrial parts"
  | "iron"
  | "ivory"
  | "jewelry"
  | "lacquerware"
  | "leather products"
  | "legumes"
  | "liquor"
  | "livestock"
  | "logging"
  | "manufactured goods"
  | "marble"
  | "medical services"
  | "mercenaries"
  | "mercury"
  | "meteorite fragments"
  | "musical instruments"
  | "narcotics"
  | "olive oil"
  | "ornamental woods"
  | "paper"
  | "pearls"
  | "petroleum"
  | "salt"
  | "sand"
  | "shipbuilding"
  | "silk"
  | "silver"
  | "slaves"
  | "spices"
  | "stone"
  | "sugar"
  | "tea"
  | "tin"
  | "tourism"
  | "war armaments"
  | "wine"
  | "wool"
  | "whale products";


  export type SpawnConditions = {
  vegetation: Cell['vegetation'][]
  topography: Cell['topography'][]
  climate: Cell['climate'][]
  development: number
  slaves: boolean
}

export type TradeGoods = Record<
  TradeGood,
  {
    description: string
    conditions?: (_params: SpawnConditions) => boolean
  }
>

export type TradeGoodDescriptions = Record<TradeGood, string>
