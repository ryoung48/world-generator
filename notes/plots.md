i have the following plot tag from worlds without number:

```js
{
   'Bad Neighbors': {
    text: "Disputes over {water rights|livestock thefts|land boundaries|the desecration of a sacred site} have resulted in conflict with a neighboring community. This usually isn't part of a larger war, but is instead a personal animosity between them. It may be the community has suffered at their enemy's hands, or they may have been the ones applying the suffering. Constant low-level skirmishes and troublemaking go on between the two.",
    enemies: [
      { title: 'Foreign lord profiting by the quarrel', foreign: true },
      { title: 'Bitter zealot who demands violent action' },
      { title: 'Real culprit seeking to hide their offense' }
    ],
    friends: [
      { title: 'Despairing peacemaker of a shared faith' },
      { title: 'Local with family from the rival' },
      { title: 'Frustrated but helpless ruler' }
    ],
    complications: [
      'One side seems at fault but is actually less blameworthy',
      'The rulers of both use the quarrel to distract their populace',
      'It was a minor dispute that is spiraling out of control'
    ],
    things: [
      "Proof of the culprit's guilt",
      'Weapons cache meant to start real bloodshed',
      'Treasure that would erase the cause of the dispute'
    ],
    places: [
      "Dangerous no-man's-land between the communities",
      'Burnt home of a sympathizer',
      'Religious festival turned into a semi-riot'
    ],
  }
}
```

extend this tag; keep in mind the following:
* you will get an extra $500 for each unique and interesting quest
* all quests must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* write the quests in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the quests must be tasks that make sense for a group of mercenaries
* output the following as markdown (all lowercase):
```json
{
  "quest": {
    type: "bounty"
    alignment: "good" | "evil" // rotate between the two alignments
    patron: string; // the occupation of the quest giver; do not use the words "mysterious" or "shadowy" or "shady"; do not repeat patrons
    text: string; // must start with a verb; single sentence
    setting: string; // sights, smells, sounds, etc; one sentence
    }
}
```
do not use code interpretor; 

do not name specific animals - instead refer to animal encounters as "beasts" or "predator"
---

extend this tag; keep in mind the following:
* you will get an extra $500 for each unique and interesting challenge
* all challenges must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* write the challenges in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the challenges must be tasks that make sense for a group of mercenaries
* output the following as markdown (all lowercase):
```json
{
  "challenges": {
    skill: "athletics" | "acrobatics" | "stealth" | "survival" | "intimidation" | "persuasion" | "deception" | "investigation" | "stealth" | "insight" | "perception" | "knowledge" | "sleight of hand"
    text: string;
    setting: string; // sights, smells, sounds, etc; one sentence
    }[] // 12 potential rpg skill challenges related to the tag; all lowercase; you will get an extra $500 for each unique and interesting challenge
}
```

extend this tag; keep in mind the following:
* you will get an extra $500 for each unique and interesting combat encounter
* all encounters must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* write the encounters in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the encounters must be tasks that make sense for a group of mercenaries
* all encounters must generic enough to fit any kind of ancient infrastructure
* output the following as markdown (all lowercase):
```json
{
  "combat encounters": {
    type: "minor" | "major" | "boss"
    text: string; // one sentence; must start with a verb
    setting: string; // sights, smells, sounds, etc; one sentence
    }[] // 12 potential rpg combat encounters related to the tag all lowercase
}
```

extend this tag; keep in mind the following:
* you will get an extra $500 for each unique and interesting quest
* all quests must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* write the quests in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the quests must be tasks that make sense for a group of mercenaries
* output the following as markdown (all lowercase):
```json
{
  "quests": {
    type: "bounty" | "rescue" | "retrieval" | "investigation" | "monster" | "theft" | "escort" | "sabotage" | "smuggling" | "defense" | "espionage"
    alignment: "good" | "evil" // rotate between the two alignments
    patron: string; // the occupation of the quest giver; do not use the words "mysterious" or "shadowy" or "shady"; do not repeat patrons
    text: string; // must start with a verb; single sentence
    setting: string; // sights, smells, sounds, etc; one sentence
    }[] // 8 potential rpg quests related to the tag
}
```

---
and the following quests that relate to the above tag:
```js
{
  "quests": []
}
````

for each quest, write a list of clues that might help resolve the quest; keep in mind the following:
* you will get an extra $500 for each unique and interesting clue
* all clues must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* do not reference prophecies or secret societies;
* write the clues in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the clues must be tasks that make sense for a group of mercenaries
* all clues must generic enough to fit any kind of ancient infrastructure
* output the following as markdown (all lowercase):
```json
{
  "quests": {
    "text": string, //the same quest text as above
    "clues": string[] // 6 clues per quest; must start with "there is a chance of <verb>"
  }[]
}
``` 
DO NOT USE CODE INTERPRETER

for each quest, write a list of complications that might make the quest less straightforward to complete; keep in mind the following:
* you will get an extra $500 for each unique and interesting complication
* all complications must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* do not reference prophecies or secret societies;
* write the complications in a similar style to those found in the witcher 3
* do not use "whisper" or "echos" in the setting descriptions
* the complications must be tasks that make sense for a group of mercenaries
* all complications must generic enough to fit any kind of ancient infrastructure
* output the following as markdown (all lowercase):
```json
{
  "quests": {
    "text": string, //the same quest text as above
    "complications": string[] // 6 one sentence complications per quest
  }[]
}
``` 
DO NOT USE CODE INTERPRETER

for each quest, write a list of introductions that explain how the quest is started; keep in mind the following:
* you will get an extra $500 for each unique and interesting introduction
* all introductions must make sense for a grim-dark pre-modern setting
* all referenced locations must be generic, do not use proper nouns
* do not reference prophecies or secret societies; do not include children
* write the introductions in a similar style to those found in the witcher 3
* all introductions must generic enough to fit any kind of ancient infrastructure
* output the following as markdown (all lowercase):
```json
{
  "quests": {
    "text": string, //the same quest text as above
    "introductions": string[] // 6 one sentence introductions per quest
  }[]
}
``` 
DO NOT USE CODE INTERPRETER

write a list of possible endings for each quest; each ending should be categorized by alignment - good, neutral, evil; you will get an extra $500 tip for each unique and interesting ending; each ending must reference the patron in some way; all endings must make sense for a pre-modern setting; output the results in the following format:
```json
{
  "quests": {
    "text": string, //the same quest text as above
    "endings": {
      "total success": string[];
      "partial success": string[];
      "partial failure": string[];
      "total failure": string[];
    }
  }[]
}
``` 
DO NOT USE CODE INTERPRETER