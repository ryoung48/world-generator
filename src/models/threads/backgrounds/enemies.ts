export const enemies = {
  civilization: () =>
    window.dice.weightedChoice([
      { w: 3, v: 'bandit raiders' },
      { w: 5, v: 'criminal thugs' },
      { w: 1, v: 'religious zealots' },
      { w: 1, v: 'dark cultists' },
      { w: 2, v: 'ruthless assassins' },
      { w: 3, v: 'rival mercenaries' },
      { w: 3, v: 'angry mob' },
      { w: 2, v: 'disguised warriors' },
      { w: 3, v: 'paid guardsman' },
      { w: 2, v: 'elite bodyguards' },
      { w: 2, v: 'city guards' },
      { w: 1, v: 'veteran witch-hunters' },
      { w: 1, v: 'skilled sorcerer' },
      { w: 1, v: 'mad alchemist' },
      { w: 1, v: 'rebel soldiers' },
      { w: 1, v: 'foreign agents' },
      { w: 2, v: 'grizzled veterans' },
      { w: 1, v: 'inhuman aberration' },
      { w: 1, v: 'ethnic supremacists' }
    ]),
  wilderness: () =>
    window.dice.spin(
      window.dice.weightedChoice([
        { w: 2, v: 'bandit raiders' },
        { w: 1, v: 'dark cultists' },
        {
          w: 1,
          v: '{blighted raiders|degenerate cannibals|inhuman aberrations|hulking aberration}'
        },
        { w: 1, v: '{mutated|enchanted|corrupted} {beast|beasts|flora|fungi}' },
        { w: 1, v: '{pack of wild beasts|lone predator}' },
        { w: 1, v: '{undead {husks|abomination}|{vengeful|guardian} wraiths}' },
        { w: 1, v: '{sorcerous cabal|vampiric spawn|necromantic cult}' },
        { w: 1, v: '{relic automatons|golem sentinels}' }
      ])
    )
}
