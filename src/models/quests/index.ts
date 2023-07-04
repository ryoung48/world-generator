import { npc__spawn } from '../npcs'
import { hub__alias } from '../regions/provinces/hubs'
import { difficulty__random } from '../utilities/difficulty'
import { openai__chat } from '../utilities/openai'
import { province__traits } from './hooks'
import { stage__current, stage__resolve, stage__spawn } from './stages'
import { Quest, QuestAdvanceParams, QuestSpawnParams } from './types'

export const quest__spawn = ({ province, pc }: QuestSpawnParams) => {
  if (!province.quest)
    province.quest = {
      province: province.idx,
      failures: 0,
      complexity: window.dice.randint(5, 15),
      difficulty: { cr: difficulty__random(pc) }
    }
  return province.quest
}

export const quest__details = async ({ province }: QuestSpawnParams) => {
  if (!province.quest.objectives) {
    const region = window.world.regions[province.region]
    const traits = province__traits(province)
    const alias = hub__alias(province.hub)
    const setting = !region.civilized && alias === 'village' ? 'tribal camp' : alias
    const gen = await openai__chat<Quest>(`
  Write a list of quest objectives for a fantasy RPG quest inspired by TES daggerfall and the witcher 3 that blends elements from the two hook tags below:
  
  ${traits.map(trait => `${trait.tag}: ${trait.text}`).join('\n')}
  
  Keep in mind the following:
  * do not mention the settlement name, region name, organization names, or any NPC names in the quest summary or objectives
  * each objective should synthesize elements from the two hooks above; there should be no objectives that use only a single hook
  * each objective should be accompanied by a location that describes where the objective takes place; do not use proper names in location descriptions; locations should be appropriate for a "${setting}"; each location should be interesting and unique; do not repeat locations
  * the surrounding terrain is ${province.environment.terrain}
  * each objective should be a single sentence no more than 15 words long
  * be as specific as possible; for example, "find the wizard's spellbook" is better than "find something valuable"
  * be sure to add twists and complications among the objectives
  * do not mention any fantasy races such as elves, dwarves, goblins, orcs, ogres, etc.
  * the quest is to be completed by a party of adventurers
  * The output should be a markdown code snippet formatted in the following schema:
  \`\`\`json
  {
    "title": string; // 2-3 words at most
    "description": string; // the main problem that the quest seeks to resolve; do not mention surrounding terrain in this summary; the main problem does not need to blend the two hooks if it does not make sense
    "npcs": {
        "id": number; // unique id for the npc
        "occupation": string;
        "gender": "male" | "female";
        "age": "young adult" | "adult" | "middle age" | "old";
        "outfit": string; // a list of clothing and equipment the npc is wearing (10 words at most, do not mention hairstyles or personality traits)
        "foreigner": boolean; // whether the npc is a foreigner to the region or of a minority ethnic group
    }[];
    "questGiver": number; // id of the npc that starts the quest
    "objectives": {
        "text": string; // do not mention locations in this text
        "location": string;
        "npcs": number[]; // list of npc ids that might appear in this objective
        "resolution": string; // what happens when this objective is completed and how does it connect to the next objective; should be written in past tense
    }[] // there should be exactly ${province.quest.complexity} objectives
  \`\`\`
  
  below is an example of what I am looking for written for a jungle city tagged with new industry & pilgrimage site with 8 objectives:
  \`\`\`json
  {
    "title": "Sacred Veins",
    "description": "Uncover the mysteries surrounding an ancient pilgrimage site that is being threatened by a new mining operation.",
    "npcs": [
        {
            "id": 1,
            "occupation": "Templar",
            "gender": "female",
            "age": "adult",
            "outfit": "chainmail armor, white tabard with golden emblem, longsword, and a small amulet",
            "foreigner": false
        },
        {
            "id": 2,
            "occupation": "Miner",
            "gender": "male",
            "age": "young adult",
            "outfit": "dusty trousers, leather boots, pickaxe, and a lantern",
            "foreigner": false
        },
        {
            "id": 3,
            "occupation": "Pilgrim",
            "gender": "female",
            "age": "middle age",
            "outfit": "hooded robe, walking staff, a satchel of herbs, and prayer beads",
            "foreigner": true
        },
        {
            "id": 4,
            "occupation": "Archaeologist",
            "gender": "male",
            "age": "adult",
            "outfit": "green vest, pith helmet, satchel with brushes, and a magnifying glass",
            "foreigner": true
        },
        {
            "id": 5,
            "occupation": "Spirit",
            "gender": "female",
            "age": "old",
            "outfit": "ghostly white robe, emanating an eerie glow",
            "foreigner": false
        }
    ],
    "questGiver": 1,
    "objectives": [
        {
            "text": "Investigate mining operation disrupting the pilgrimage site",
            "location": "A newly dug mine entrance near the ancient shrine",
            "npcs": [2],
            "resolution": "Learned that the mining operation had accidentally opened an ancient tomb beneath the shrine"
        },
        {
            "text": "Collect sacred relics unearthed by the miners",
            "location": "Inside the mine, deep within the ancient tomb",
            "npcs": [],
            "resolution": "Acquired relics that were connected to the pilgrimage site's history"
        },
        {
            "text": "Consult a pilgrim about the relics' significance",
            "location": "A small campsite with tents, set up for pilgrims near the shrine",
            "npcs": [3],
            "resolution": "Learned that the relics were believed to keep an ancient spirit at peace"
        },
        {
            "text": "Seek advice from an archaeologist about the tomb",
            "location": "A makeshift research tent filled with artifacts and books",
            "npcs": [4],
            "resolution": "Discovered a ritual to appease the disturbed spirit using the relics"
        },
        {
            "text": "Gather jungle herbs for the ritual",
            "location": "A dense, overgrown jungle path leading to a clearing with rare herbs",
            "npcs": [],
            "resolution": "Obtained the necessary ingredients to perform the ritual"
        },
        {
            "text": "Perform the ritual within the ancient tomb",
            "location": "A large burial chamber deep inside the mine with ancient inscriptions",
            "npcs": [5],
            "resolution": "The spirit was partially appeased, but demanded the mining operations to cease"
        },
        {
            "text": "Convince the miner to halt the mining operation",
            "location": "Back at the mine entrance, now bustling with activity",
            "npcs": [2],
            "resolution": "The miner agreed to cease operations temporarily for further evaluation"
        },
        {
            "text": "Report back to the templar",
            "location": "In front of the ancient shrine, now serene and quiet",
            "npcs": [1],
            "resolution": "The templar thanked the adventurers and offered a reward for preserving the sacred site"
        }
    ]
}
  \`\`\`
        `)
    if (gen) {
      province.quest = { ...province.quest, ...gen }
      province.quest.npcs = province.quest.npcs
        .filter(npc => npc.gender === 'male' || npc.gender === 'female')
        .map(npc => {
          const spawned = npc__spawn({
            loc: province,
            gender: npc.gender,
            age: npc.age,
            profession: 'custom',
            foreign: npc.foreigner
          })
          spawned.outfit = npc.outfit
          spawned.profession.title = npc.occupation.toLowerCase()
          return {
            ...npc,
            ref: spawned.idx
          }
        })
      province.quest.objectives.forEach(objective => {
        objective.setting = { weather: '', duration: '', memory: -Infinity }
      })
    }
  }
  return province.quest
}

export const quest__score = (quest: Quest) => quest.failures / quest.objectives.length

export const quest__resolve = (params: { quest: Quest; pc: number }) => {
  const { quest, pc } = params
  const score = quest__score(quest)
  quest.difficulty.pc = pc
  quest.status =
    score < 0.1 ? 'perfection' : score < 0.6 ? 'success' : score < 1 ? 'pyrrhic' : 'failure'
}

export const quest__advance = async ({ quest, pc, tag }: QuestAdvanceParams) => {
  const current = stage__current(quest)
  if (!current) return await quest__resolve({ quest, pc })
  const option = current.options.find(option => option.tag === tag)
  option.selected = true
  current.status = stage__resolve({ pc, challenge: option.difficulty })
  current.difficulty = { cr: option.difficulty, pc }
  if (current.status === 'failure') quest.failures += 2
  else if (current.status === 'perfection') quest.failures = Math.max(0, quest.failures - 1)
  else if (current.status === 'pyrrhic') quest.failures++
  const score = quest__score(quest)
  const next = score > 1 ? false : stage__current(quest)
  if (next) await stage__spawn(quest)
  else quest__resolve({ quest, pc })
}
