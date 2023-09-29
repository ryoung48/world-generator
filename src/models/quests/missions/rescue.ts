export const rescue = {
  introductions: [
    'The party receives a hastily written note delivered by a weary messenger.',
    'The group overhears tales of a recent kidnapping at the local {tavern|marketplace}.',
    'A member of the party discovers that someone they know—{a family member|an old friend|a former ally}—has gone missing.',
    'The local authorities approach the party, offering a reward for the safe return of the captive.',
    'The party directly observes the kidnapping or the aftermath- they come across {a ransacked campsite|the scene of a struggle in a dark alleyway}.',
    'Someone closely connected to the captive—a {spouse|child|parent|friend}—directly approaches the party, begging for their assistance.'
  ],
  stages: [
    [
      [
        {
          type: 'social',
          text: 'convince a reluctant witness to speak',
          location: 'hub',
          complications: [
            'the witness demands a significant favor in return for their information.',
            'a powerful figure in the hub warns the party to leave the witness alone.',
            'The witness is deeply involved in other personal problems and is distracted or uncooperative.',
            'the witness will only speak in a specific secure or sacred location.',
            'the witness is deeply paranoid and believes they are being watched or followed.',
            'the witness has been bribed or threatened by another party to keep silent.'
          ]
        },
        {
          type: 'combat',
          text: 'protect a key informant from thugs hired by the captor',
          location: 'hub',
          complications: [
            'The thugs have superior numbers or are exceptionally skilled.',
            'Civilians or bystanders are caught in the crossfire, complicating the battle.',
            'The environment offers limited cover or strategic positions.',
            'Local law enforcement misconstrues the situation, and the party is mistaken for aggressors.',
            'The informant panics or acts unpredictably during the confrontation.'
          ]
        },
        {
          type: 'investigation',
          text: 'examine a crime scene for clues',
          location: 'hub',
          complications: [
            'the crime scene has been intentionally tampered with or staged.',
            'local authorities are uncooperative or hinder the investigation.',
            'a critical piece of evidence has been stolen or destroyed.',
            'several witnesses claim to have knowledge, offering conflicting testimonies.',
            'there are multiple crime scenes, each with conflicting information.',
            'the scene attracts a crowd, making investigation difficult.',
            'the crime scene is located in a dangerous or restricted area of the hub.'
          ]
        },
        {
          type: 'stealth',
          text: 'eavesdrop on a suspicious conversation',
          location: 'hub',
          complications: [
            'the speakers use code or another language, requiring translation.',
            'there are multiple overlapping conversations, making it difficult to discern the relevant information.',
            'a sudden distraction, like a street performance or altercation, occurs nearby.',
            'the speakers frequently move locations, requiring the party to follow discreetly.',
            "the speakers are aware they're being monitored and provide false or misleading information.",
            'one of the speakers is paranoid and frequently checks for eavesdroppers.'
          ]
        },
        {
          type: 'survival',
          text: 'weave through a crowd to chase a fleeing suspect',
          location: 'hub',
          complications: [
            'The crowd is dense or moving in unpredictable patterns.',
            'The suspect employs disguises or blending tactics to evade pursuit.',
            'Physical obstacles, like carts or street performances, block direct paths.',
            'The suspect receives help or is handed off to other accomplices.',
            'Distracting events, like a sudden commotion or spectacle, divert attention.',
            'The suspect uses the environment, like rooftops or underground passages, to their advantage.',
            'Local authorities or guards misconstrue the chase and intervene.'
          ]
        }
      ]
    ],
    [
      {
        type: 'social',
        text: 'interrogate a suspected accomplice',
        location: 'hub',
        complications: [
          'the accomplice has been bribed or threatened to remain silent.',
          'language or cultural barriers make communication difficult.',
          'the accomplice is mentally unstable or under a spell, affecting their clarity.',
          'False or misleading information is given to throw off the interrogators.',
          'the accomplice demands a trade or favor for information.',
          'local authorities intervene to halt the interrogation.',
          'multiple conflicting stories arise from the accomplice.',
          'the accomplice has partial but incomplete information.',
          'The accomplice has a personal relationship with someone in the party, causing tension.'
        ]
      },
      {
        type: 'combat',
        text: 'ambush minor hostiles on their way back to the hideout',
        location: 'wilderness',
        complications: [
          'The hostiles are accompanied by an unexpected stronger ally.',
          'Environmental factors, like fog or rain, impair visibility during the ambush.',
          'The terrain benefits the hostiles, offering them natural cover or escape routes.',
          'Civilians or neutral parties accidentally wander into the ambush zone.',
          'Communication breakdowns in the party lead to a disjointed or mistimed ambush.'
        ]
      },
      {
        type: 'investigation',
        text: 'track down an elusive witness by interviewing locals',
        location: 'hub',
        complications: [
          'Locals are distrustful of outsiders and reluctant to share information.',
          'Rumors and false leads misguide the investigation.',
          'The witness has moved locations or gone into hiding.',
          'Local authorities or influential figures hinder the search due to their own interests.',
          "Multiple conflicting accounts of the witness's appearance or activities confuse the search.",
          'The witness has been threatened and is actively avoiding detection.',
          'The witness is disguised or living under an assumed identity.'
        ]
      },
      {
        type: 'stealth',
        text: 'follow a suspect without being detected',
        location: 'hub',
        complications: [
          '"Local customs, like a sudden public gathering, divert the course of the suspect."',
          'The suspect is paranoid and frequently checks for tails.',
          'Crowded areas or unpredictable pedestrian traffic make tailing difficult.',
          'The suspect enters restricted or guarded areas, complicating the pursuit.',
          'The suspect intentionally leads the party into a trap or dangerous area.'
        ]
      },
      {
        type: 'survival',
        text: 'navigate a treacherous natural obstacle',
        location: 'wilderness',
        complications: [
          'The party lacks the proper equipment or expertise to safely navigate.',
          'the weather turns bad, making the obstacle even more dangerous.',
          'local fauna are aggressive or territorial.',
          'the route is not stable and parts of it collapse or shift.',
          'supplies are running low, increasing the urgency.',
          'the obstacle is larger or more extensive than initially estimated.',
          'natural toxins or hazards (like poisonous plants) are present.'
        ]
      }
    ],
    [
      {
        type: 'social',
        text: "persuade a defector from the kidnapper's group to aid you",
        location: 'wilderness',
        complications: [
          'The defector is deeply traumatized and difficult to approach.',
          'They demand a high price or specific favor in return for their aid.',
          "They don't fully trust the party and withhold critical information.",
          "The kidnapper's group is actively searching for the defector.",
          'The defector has personal or family ties to the kidnapper, causing conflict.',
          'The defector is injured or in need of immediate aid, making the conversation time-sensitive.'
        ]
      },
      {
        type: 'combat',
        text: 'battle guards at the entrance of the hideout',
        location: 'dungeon',
        complications: [
          'the guards have reinforcements nearby.',
          'the guards have a beast or monster with them.',
          'there are innocent bystanders or hostages in the vicinity.',
          'the guards are using a potent magical artifact.',
          "The terrain or architecture of the entrance benefits the guards' defense.",
          'the guards have a mage casting protective spells.',
          'some guards are more skilled or better equipped than expected.',
          'The guards are alerted and have reinforced the entrance.'
        ]
      },
      {
        type: 'investigation',
        text: "discover a secret entrance to the victim's holding area",
        location: 'dungeon',
        complications: [
          "clues to the passage's location are fragmented or scattered.",
          'there are false passages that lead to dead ends or more traps.',
          'magic conceals the passage, requiring special means to reveal.',
          'the mechanism to open the passage is complex or puzzling.',
          'local lore or legends about the passage are vague or cryptic.'
        ]
      },
      {
        type: 'stealth',
        text: 'use disguises to sneak into the hideout undetected',
        location: 'dungeon',
        complications: [
          'The disguises are imperfect or slightly outdated, raising suspicion.',
          'Certain areas of the hideout require additional identification or passwords.',
          "The party encounters someone they've previously interacted with, risking exposure.",
          'Routine activities or duties are expected of those in disguise, catching the party off guard.',
          "There's a sudden change in the hideout's security protocol.",
          'The party needs to maintain the ruse during unplanned social interactions or gatherings.'
        ]
      },
      {
        type: 'survival',
        text: "avoid a dangerous creature's territory near the hideout",
        location: 'wilderness',
        complications: [
          'The creature is territorial and highly sensitive to intruders.',
          "The terrain makes avoiding the creature's territory challenging.",
          'The creature has offsprings or mates, making it more aggressive.',
          'The creature is a unique or mutated variant with unpredictable behaviors.',
          "Local fauna or flora can alert the creature to the party's presence."
        ]
      }
    ],
    [
      {
        type: 'social',
        text: 'convince the captive to depart with the group',
        location: 'dungeon',
        complications: [
          'The captive is traumatized and distrusts strangers, including the rescuers.',
          "The captive believes they're safer where they are than attempting to escape.",
          'The kidnappers have fed the captive lies or misinformation about the rescue group.',
          'The captive is suffering from a curse or enchantment that affects their decision-making.',
          'The captive feels a need to stay to help or protect other captives in the dungeon.',
          'The captive has grown sympathetic to the kidnappers and their cause.'
        ]
      },
      {
        type: 'combat',
        text: 'defeat an elite {enforcer|lieutenant} guarding the inner sanctum',
        location: 'dungeon',
        complications: [
          'The guards possesses unique or unexpected abilities.',
          'Reinforcements can quickly support the elite guard when alerted.',
          'The guards utilizes captured prisoners as human shields.',
          'The guards has undergone magical enhancements or augmentations.',
          'Strategic retreats or tactical withdrawals are used to lure the group into traps.',
          'The guard uses potent potions or elixirs during combat for an advantage.'
        ]
      },
      {
        type: 'investigation',
        text: 'find the keys needed to free the captive',
        location: 'dungeon',
        complications: [
          "There are multiple keys, and they're scattered throughout the hideout.",
          'Some keys are decoys or traps, leading to dangers when used.',
          'Guard patrols are increased around key storage or locations.',
          'Certain keys are magically concealed and require spells or rituals to reveal.',
          'Keys are in the possession of powerful creatures or hideout inhabitants.'
        ]
      },
      {
        type: 'stealth',
        text: 'pick a locked door to access a restricted area',
        location: 'dungeon',
        complications: [
          'The lock is of a unique or complex design requiring specialized tools.',
          'Guard patrols frequently pass by the door, reducing the time window to pick it.',
          'The door is reinforced or trapped, presenting additional challenges.',
          'The lock has been damaged or tampered with before, complicating the picking.',
          'Multiple locks or barriers must be overcome in quick succession.'
        ]
      },
      {
        type: 'survival',
        text: 'release other captives on the way to the main captive',
        location: 'dungeon',
        complications: [
          'Other captives are skeptical or scared, requiring convincing or coaxing.',
          'Some captives are ill, injured, or need specialized care or attention.',
          'Releasing all the captives may not be feasible due to time or resource constraints.',
          'Some captives have critical information, but are hesitant to share.',
          'Rescuing additional captives draws the ire and increased attention of dungeon inhabitants.',
          'Certain captives might have conflicting goals or agendas, causing internal disputes.'
        ]
      }
    ],
    [
      {
        type: 'social',
        text: 'negotiate the release of the victim',
        location: 'dungeon',
        complications: [
          'the captor has personal vendettas making negotiation emotionally charged.',
          "multiple factions within the captor's group have differing demands.",
          "there's a language or cultural barrier between the negotiator and captor.",
          "the captor doubts the negotiator's sincerity or ability to fulfill promises.",
          'the victim becomes an active participant, complicating negotiations.',
          'the captor is using the negotiation as a distraction for another plot.',
          'time constraints or outside threats put pressure on the negotiation.',
          'the kidnapper increases their demands during negotiations.',
          'the victim refuses to be released without certain conditions met.',
          "the kidnapper's emotional instability makes negotiations unpredictable.",
          "the negotiator's own party disagrees on what should be offered or promised."
        ]
      },
      {
        type: 'combat',
        text: 'confront the kidnapper in a final showdown',
        location: 'dungeon',
        complications: [
          'the kidnapper uses the victim as a shield or bargaining chip during the battle.',
          'the kidnapper tries to escape mid-battle, leading to a chase.',
          'the kidnapper reveals surprising information during combat, causing distractions.',
          'the kidnapper has hostages, using them as leverage during combat.',
          'the environment benefits the kidnapper, providing them with cover or hazards to use.',
          'reinforcements arrive to aid the kidnapper during the confrontation.',
          'The kidnapper has powerful lieutenants at their side.'
        ]
      },
      {
        type: 'investigation',
        text: 'identify the true motive behind the kidnapping',
        location: 'dungeon',
        complications: [
          'the true motive is intertwined with local politics or scandals.',
          'witnesses or informants have been bribed, threatened, or silenced.',
          'key evidence has been tampered with or destroyed.',
          'the motive ties back to a historical event or ancient legend.',
          'local customs or taboos make discussing the motive taboo or dangerous.',
          'multiple parties benefit from the kidnapping, muddying the motive.',
          'the motive is deeply personal, making it hard to decipher without insider knowledge.'
        ]
      },
      {
        type: 'stealth',
        text: 'quietly extract the victim without detection',
        location: 'dungeon',
        complications: [
          'the victim is in a state of panic or confusion, making noise.',
          'other prisoners or entities attempt to alert the guards.',
          'the escape route is narrow, illuminated, or challenging.',
          "the victim's health or injuries require special care during extraction.",
          'guards have creatures or pets with heightened senses.',
          'unexpected events, like a change in guard shifts, occur.',
          'there are multiple decoy victims or distractions.'
        ]
      },
      {
        type: 'survival',
        text: 'use natural remedies to treat injuries',
        location: 'wilderness',
        complications: [
          'The required herbs or plants are rare or out of season.',
          'Local wildlife is protective or aggressive around medicinal resource areas.',
          'The wilderness is vast, making it easy to get lost while searching for remedies.',
          'Some remedies require a specific preparation or ritual to be effective.',
          'Local folklore warns of cursed or forbidden areas where certain plants grow.',
          'The injuries are severe, requiring a combination of remedies and constant care.'
        ]
      }
    ]
  ]
}
