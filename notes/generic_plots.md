I have the following plot tag from worlds without number:

```js
{
  Hermitage: {
      text: "A small hermitage was established here sometime in the past to provide solitude for some ascetic. Occasionally small clusters of hermits form around such a central point, meeting at times to check on each other or join in shared discipline. Such anchorites usually shun visitors who aren't also devotees of their path, but occasionally a hermit wins such fame for sorcery or wisdom that pilgrims seek them out. Some hermits have been known to respond with great anger toward these repeated worldly interruptions.",
      enemies: [
        { title: 'Hermit sorcerer gone mad' },
        { title: 'Sinister villain hiding as a hermit' },
        { title: 'Alien hermit with inscrutably evil philosophical principles', monstrous: true }
      ],
      friends: [
        { title: 'Worried relative of a new hermit' },
        { title: 'Petitioner seeking holy help' },
        { title: 'Hermit rethinking solitude' }
      ],
      complications: [
        'The hermits have control over a local magical energy or enchantment',
        'They keep themselves separate to keep others safe from them and their irrepressible powers',
        'The hermit is hated by the local secular authorities for their aid to its foes'
      ],
      things: [
        'Precious religious relic carried by the hermit',
        'Cast-off worldly wealth',
        'Map to finding them'
      ],
      places: [
        'Austere wilderness cave',
        'Hermit hole in a grave-mound in the swamps',
        'Tall and narrow stone column for sitting on'
      ]
    }
}
```

build a quest from this tag; output the following as json:
```json
{
  "quest": string; // ~ 150 characters; must start with a verb
  "friend": string; // ~ 100 characters
  "enemy": string; // ~ 100 characters
  "place": string; // ~ 100 characters
  "complication": string; // ~ 100 characters
  "thing": string; // ~ 100 characters
  "hostiles": string; // ~ 100 characters; hostile groups that might be encountered; must not be one of the enemies listed above
}
```

extend this tag; output the following as json (all lowercase); all elements must make sense for a pre-modern setting; you will get an extra $500 tip for each interesting extension; note that "Outsiders" are aliens in this setting:
```json
{
  "hostiles": string[] // 6 potential hostile groups related to the tag
  "secrets": string[] // 6 potential secrets related to the tag; must start with "rumors suggest that"
  "quests:": string[] // 12 potential rpg quests related to the tag
}
```