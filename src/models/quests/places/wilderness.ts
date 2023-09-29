import { Place } from './types'

const ruins: Place[] = [
  { text: '{abandoned|overgrown|half-buried} {village|mining site|mineshaft|quarry|estate}' },
  { text: '{burnt|scorched} {village|hamlet|encampment}' },
  { text: 'abandoned campsite, hastily left behind' },
  { text: '{desolate|forgotten|ancient|overgrown} {battleground|battlefield}' },
  { text: '{crumbling|ancient|sacred} stone bridge' },
  { text: '{dark|forbidden|unholy} {sacrificial altar|shrine}' },
  { text: '{overgrown|forgotten|cursed} {tomb|crypt|graveyard}' },
  { text: '{abandoned|overgrown|half-buried|ruined} {temple|shrine|monastery}' },
  { text: '{cursed|enchanted|bewitched} {stone circle|standing stones}' },
  { text: '{forgotten|overgrown|deserted} {academy|library|observatory}' },
  { text: '{dusty|ancient|abandoned|overgrown} occult {laboratory|tower}' },
  { text: '{ancient|forgotten|ruined|overgrown} {watchtower|fort|outpost|fortress|stronghold}' }
].map(place => ({
  ...place,
  type: 'ruins' as const
}))

const wilds: Place[] = [
  { text: '{natural|subterranean|crystal-infused} {cave|cavern}' },
  { text: '{deep|wide|vast} {sinkhole|chasm|crevasse|ravine|canyon}' },
  { text: '{volcanic|lava} field' },
  { text: 'trackless wilderness' },
  { text: '{ancient|buried|hidden} meteorite impact site' },
  { text: 'steaming {geyser|hot spring}' }
].map(place => ({
  ...place,
  type: 'wilderness' as const
}))

const mountains: Place[] = [
  { text: '{towering|jagged|snow-capped} {peak|summit}' },
  { text: '{narrow|dangerous|winding} {path|trail|pass}' },
  { text: '{precipitous|steep|sheer} {cliff|rock} face' },
  { text: '{rocky|stone-covered|boulder-strewn} {slope|hillside}' },
  { text: '{roaring|fast-flowing} {stream|brook|river}' },
  { text: 'desolate landslide {site|zone}' },
  { text: '{mossy|lichen-covered|overgrown} {boulder field|rock garden|stone pile}' }
].map(place => ({
  ...place,
  constraints: { mountainous: true },
  type: 'wilderness' as const
}))

const wet: Place[] = [
  { text: '{dense|wild|tangled} {path|trail}' },
  { text: '{sandy|boggy|rocky} {riverbank|lake shore}' },
  { text: '{muddy|quick} {river|stream}' },
  { text: '{moss-covered|vine-strangled|overgrown} {ruin|relic}' },
  { text: '{poisonous|vibrant|luminous} {spore field|fungus grove}' },
  { text: '{twisted|rotting|overgrown} {wooden bridge|boardwalk}' }
].map(place => ({
  ...place,
  constraints: { wet: true },
  type: 'wilderness' as const
}))

const forest: Place[] = [
  { text: '{primordial|withered|corrupted|haunted|fungal} {forest|grove|glade}' },
  { text: '{abandoned|overgrown|disused} {lumber mill|logging camp|vineyard|farmstead|orchard}' }
].map(place => ({
  ...place,
  constraints: { forest: true },
  type: 'wilderness' as const
}))

const dry: Place[] = [
  { text: '{ancient|sunken|buried} {statue|monolith|obelisk}' },
  { text: '{wind-eroded|weathered} rock formation' },
  { text: '{massive|sun-bleached|ancient} {bones|skeleton}' },
  { text: '{dusty|worn|ancient} {road|path|trail}' },
  { text: '{hidden|remote} nomad camp' },
  { text: '{abandoned|ancient|forgotten} {barrow|mound|burial ground}' }
].map(place => ({
  ...place,
  constraints: { dry: true },
  type: 'wilderness' as const
}))

const desert: Place[] = [
  { text: '{endless|blistering|shifting} sand {dunes|sea}' },
  { text: '{cracked|deserted|forsaken} salt flats' },
  { text: '{desolate|sun-scorched|blighted} {vineyard|farmstead}' },
  { text: '{buried|sunken|deserted} {palace|estate|manor}' },
  { text: '{lush|forgotten|withered} oasis' }
].map(place => ({
  ...place,
  constraints: { desert: true },
  type: 'wilderness' as const
}))

const plains: Place[] = [{ text: '{vast|lush|endless} {grasslands|fields}' }].map(place => ({
  ...place,
  constraints: { plains: true },
  type: 'wilderness' as const
}))

const tundra: Place[] = [
  { text: '{barren|desolate|frozen} {wilderness|expanse}' },
  { text: '{isolated|solitary|lonely} {grove|lichen cluster}' }
].map(place => ({
  constraints: { tundra: true },
  type: 'wilderness' as const,
  ...place
}))

const marsh: Place[] = [
  { text: '{abandoned|overgrown} {hut|shack|cabin} on stilts' },
  { text: '{rotten|sinking} quagmire' }
].map(place => ({
  ...place,
  constraints: { marsh: true },
  type: 'wilderness' as const
}))

export const wilderness = [
  ...ruins,
  ...mountains,
  ...wilds,
  ...dry,
  ...wet,
  ...forest,
  ...desert,
  ...plains,
  ...tundra,
  ...marsh
]
