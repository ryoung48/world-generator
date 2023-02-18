import { hub__isVillage } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { backgrounds__community } from './communities'
import { backgrounds__court } from './courts'
import { backgrounds__faith } from './faith'
import { backgrounds__ruin } from './ruins'
import { Background, BackgroundDetails } from './types'
import { backgrounds__wilderness } from './wilderness'

const thread__backgrounds: Record<Background, BackgroundDetails> = {
  ...backgrounds__community,
  ...backgrounds__court,
  ...backgrounds__faith,
  ...backgrounds__ruin,
  ...backgrounds__wilderness
}

const backgrounds = Object.values(thread__backgrounds)

const hooks = [
  'An Enemy has suffered a dire reverse, and seeks a Thing in order to rescue their situation.',
  'An Enemy is behind a recent flare-up of a Complication that is causing problems for the PCs.',
  'An Enemy keeps a Thing at a well-guarded Place, and a Friend is willing to pass the PCs information on it.',
  'An Enemy is being targeted by the negative effects of a Complication but is trying to pin it all on a Friend.',
  'An Enemy is trying to take control of a Place, but is being hindered by the activities of a Friend.',
  'An Enemy is trying to use a Complication to pry a valuable Thing out of the hands of a Friend.',
  'An Enemy is using a Thing to bait a Friend into getting involved in a Complication that will probably destroy them.',
  'An Enemy controls a Place where a Thing is located, but a Complication is currently keeping them from being able to extract it.',
  "An Enemy has recently become active near a Place, and their actions have stirred up a Complication that a local Friend doesn't know how to handle.",
  'An Enemy is struggling over a Thing with another Enemy, and the fallout from their fight is making problems for the PCs or a Friend.',
  'An Enemy has a grudge against a Friend and is trying to frame them for some crime related to a Thing.',
  'An Enemy has just destroyed the last obstacle that prevents them from full exertion of their malice and is using a Thing they claimed to prosecute it.',
  "An Enemy lost a Thing at the worst possible time and is suffering from a Complication. They're trying to get it back before they're ruined.",
  'An Enemy is currently at a Place and is exceptionally vulnerable for some reason. A Friend wants to take advantage of that.',
  'An Enemy has promised an ally a Thing and is becoming increasingly desperate to obtain it, as the consequences for failure are dire.',
  "An Enemy has imprisoned a Friend for some reason, and if they're not rescued soon a grim fate awaits them.",
  'An Enemy has allied with another Enemy in order to obtain a Thing from a Place, yet both are preparing to betray each other and the Thing could be stolen in the chaos.',
  'An Enemy is working to weaponize a Complication against a Friend, but their attempt has somehow left open the possibility of stealing or finding a Thing.',
  'An Enemy has forced a Friend into service, but in the process the Friend has learned about how the PCs can obtain a Thing.',
  "An Enemy has just had some personal triumph that's catalyzing a flare-up of a Complication that is harming the PCs or a Friend.",
  "A Friend stole a Thing from an Enemy. The Enemy doesn't know who did it, but their flailing retaliation threatens something precious to the Friend as they search for the culprit and the Thing.",
  'A Friend carelessly fell into a peril related to a Complication, leaving them vulnerable to a threat from an Enemy.',
  "A Friend needs to be rescued from the hostile attentions of an Enemy, and they're currently hiding out at a Place dangerously close to Enemy forces.",
  "A Friend has acquired a Thing, but it's also being sought by an Enemy and they need help to get it safely away and out of their foe's reach.",
  "A Friend got lost or snared in a Place, and a rising Complication threatens to kill or ruin them if they're not rescued in time.",
  'A Friend needs help to get a Thing from an abandoned Place, but an Enemy is ahead of them and prepared to deal harshly with competitors.',
  'A Friend is not really a friend, but an Enemy agent, and is trying to lure the PCs into helping them acquire a Thing that will actually be turned over to their master.',
  'A Friend is caught up in a Complication and cannot get to a Place where they know a Thing is being kept. The PCs need to act as their agent or get them free of the Complication.',
  'A Friend has been charged with guarding or maintaining a Thing, but an Enemy has set in motion a Complication that threatens both of them.',
  "A Friend is being compelled by an Enemy's threats to sacrifice something important to them or endure some grave loss.",
  "A Friend desperately needs a Thing for their own purposes, but an Enemy stands between them and it, though the Enemy doesn't realize what's there.",
  "A Friend has obtained ownership or responsibility for a Place, but an Enemy has set up a trap or disaster there that's meant to ruin or disgrace them.",
  "A Friend has been gravely harmed by an Enemy before and fears to confront them, but a Complication looks like it's going to end up forcing them into conflict once more.",
  'A Friend has acquired a Thing and is making use of it to further their desires, but an Enemy means to spoil their efforts and rob them of the Thing.',
  'A Friend has a sure-fire map or lead to a Thing at a Place, but in actuality, the Thing is not there at all; only an Enemy or a Complication-related peril.',
  'A Friend has been snatched away by an Enemy, who is convinced they are the key to acquiring a Thing. They may or may not be right about that.',
  "A Friend has suffered a grave personal loss due to a Complication, but an Enemy offers to make good their suffering if they can bring them a Thing they're supposed to know how to get.",
  "A Friend is sick or dying, and desperately needs a Thing if they're to live. Getting it would somehow directly put them in conflict with an Enemy, however.",
  "A Friend had a Thing but they hid it at a Place. Unfortunately, that Place is now under the control of an Enemy who doesn't know what's hidden there.",
  'A Friend is trying to protect someone from the consequences of a Complication, but their efforts are being thwarted by an Enemy who profits by the current situation.',
  'A Complication threatens a Friend, who offers a way to get at a Thing to the PCs if they can help the Friend escape trouble.',
  "A Complication's flare-up is the fault of an Enemy, who stirred it up in the process of seeking a Thing.",
  'A Complication is showing a double edge, harming both an Enemy and the PCs in some way and making the former vulnerable.',
  'A Complication threatens to ruin a Friend unless a particular Thing can be found and used to save them.',
  "A Complication's activity opens the path to a lost Thing at some dangerous Place.",
  'A Complication is only getting worse until an Enemy is defeated and forced to stop their provocations.',
  'A Complication is causing problems for the PCs, but a Friend can help resolve things if they can be found at a dangerous Place.',
  'A Complication has rendered an Enemy vulnerable to the PCs if they can get their hands on a Thing.',
  'A Complication is centered at a Place that a Friend needs to get to for some reason.',
  'A Complication is causing problems for a Friend that an Enemy is taking advantage of.',
  "A Complication elsewhere is having knock-on effects that are reaching the PCs, but a Friend can help resolve it if they can hold back an Enemy that's threatening them.",
  "A Complication is being provoked by a Friend who doesn't want to do it, but is forced to do so by circumstances until an Enemy's related machinations can be stopped.",
  'A Complication just calmed down, with the lull exposing a Thing and making it accessible at an otherwise-dangerous Place. At some random near future time, however, the Complication will pick back up with a vengeance.',
  "A Complication is empowering an Enemy's plans, allowing them far more influence than they'd normally have. A Thing or Friend can stop this, if the PCs can lay hands on it or find the NPC.",
  "A Complication struck amid a struggle between an Enemy and a Friend, just before the latter's loss. If the Enemy is not defeated before the Complication dies down again, they'll win for certain.",
  "A Complication is forcing a Friend and an Enemy to work together, but it's inevitable that there will be conflict the moment it ends, and the Friend is seeking help.",
  'A Complication drove a Friend out of a Place before they could recover a Thing from there. Even though the Complication is still blocking the site, they need the Thing as quickly as possible.',
  'A Complication has robbed an Enemy of the current use of their best tool or most effective underling, and a Friend has a plan to make that loss permanent.',
  'A Complication has damaged or involved a Thing, Place, or institution that no one ever thought would become embroiled. A Friend associated with that target is in need of aid.',
  'A Complication is delicately poised between an Enemy and a Friend, targeting neither right now, but both are working to manipulate it to hit the other or escape its eventual explosion.',
  "A Thing has been lost in a dangerous Place by a Friend, and now an Enemy hastens to retrieve it. A Complication is making it hard for them to get it, but they'll win through soon.",
  'A Thing has turned out to be very dangerous to possess, and an Enemy is trying to bait the PCs or a Friend into taking or stealing it.',
  'A Thing is the crux of a savage conflict between two or more Enemies, and their fighting is stirring up a Complication.',
  "A Thing must be found if some calamity is to be avoided by the PCs or a Friend, but an Enemy stands to profit if it's never obtained.",
  'A Thing is located in a dangerous Place, and a Friend knows how to get it.',
  'A Thing is supposed to be located in a Place, but those who go there merely get caught in a Complication, though they do find out the real Place the Thing has been moved to.',
  "A Thing seems to be useful for a particular function or value, but in actuality it's got a hidden value known to a Friend who is currently hiding from an Enemy. The PCs know there's more to it, but only the Friend can tell the full truth.",
  "A Thing has been lost by a Friend and they're desperate to get it back before it's found by an Enemy.",
  "A Thing is hidden in a Place controlled by an Enemy, but they're oblivious to it.",
  "A Thing has been stolen from an Enemy by a Friend and hidden in a Place, but the Enemy's searching around there and it's too dangerous for them to try to retrieve it.",
  "A Thing is instrumental to an Enemy's plan, but the Friend who knows where to get it is in hiding.",
  'A Thing has been demanded of the Enemy by someone they fear, and their plans for getting it involve steps that will bring grave harm to a Friend.',
  "A Thing holds the key to solving or being protected from a Complication, but the Place it's at is currently very dangerous due to that Complication.",
  'A Thing is responsible for a flare-up of a Complication in a Place, and the PCs are somehow affected by it.',
  'A Thing that a Friend is responsible for obtaining or guarding will be lost to an Enemy as soon as a Complication stops hindering them, unless the PCs can spirit it away from its current dangerous Place.',
  'A Thing was being kept at a Place by an Enemy, but a Friend has figured out a way to get past their defenses.',
  'A Thing was lost in a dangerous Place long ago, but an Enemy unwittingly holds the key to finding or unlocking it.',
  'A Thing hidden in a Place is needed by two different Friends for different important reasons, but if an Enemy is overcome, one or both of those reasons will cease to trouble them.',
  'A Thing has just been obtained by a Friend, but an Enemy now pursues them for it, and the PCs are asked to help drive off the Enemy or get the Friend someplace safe with the Thing.',
  'A Thing was the lawful inheritance of a Friend, but an Enemy has seized it and a Complication prevents the Friend from obtaining it through conventional means.',
  'A Place has been overwhelmed by some danger related to a Complication, and a Friend is now trapped there.',
  'A Place has changed, becoming much more dangerous due to the influence of an Enemy. This is causing problems for a Friend.',
  'A Place has been overrun by an Enemy or their agents in an attempt to find a Thing that is supposedly located there.',
  'A Place is currently the focal point of a Complication that is threatening a Friend.',
  'A Place is being reclaimed by a Friend from its current difficulties, but an Enemy has reasons to oppose that change and is using a Complication to interfere.',
  'A Place is the destination to which a Friend must take a Thing. An Enemy means to waylay them, however.',
  "A Place is the source of an Enemy's power, and they guard it jealously. Despite this, a Friend knows of a Thing located there.",
  'A Place offers refuge from a Complication that is currently making trouble in the area, but an Enemy is preventing others from making use of it unless bribed otherwise.',
  'A Place is falling apart, but the chaos has exposed a chance to get a Thing that is being pursued by an Enemy and others.',
  'A Place is under siege by an Enemy, who is determined to take it before a rival can claim it. A Friend would face disaster if either claimed it.',
  "A Place is currently entrapping an Enemy, who is powerless to escape. They've taken a Thing from a Friend, however, and will release it only when the Friend releases them.",
  'A Place is the inherited property or responsibility of a Friend, but they lack a Thing which is critical to their successful obtaining or maintenance of the place.',
  'A Place conceals its true nature as a very different Place, and a Friend has been unfortunately taken in by it.',
  "A Place has a Thing as an integral part of it, and when an Enemy took it, a resultant Complication started that won't end until it's returned.",
  'A Place is used by an Enemy to create a Thing, the processes and events going on there utilized to produce the desired result.',
  'A Place is distant and the journey there is dangerous, but a Friend offers a Thing if the PCs can get them there safely.',
  "A Place is the seat of an Enemy's power, where they are both most fearsome and least wary. A Friend has a plan to take advantage of that.",
  "A Place is the target of a Complication, and the consequences might ruin it. A Thing is located there, and if it's not grabbed first the Complication will probably wreck or take it.",
  'A Place has been newly-established and is still fragile. A Complication threatens to destroy it.',
  'A Place is a refuge for a Friend, but an Enemy means to bait them out of it or force them to leave with a Complication.'
]

const background__goal = (tags: Background[]) => {
  const details = tags.map(tag => {
    const thread = thread__backgrounds[tag]
    return {
      friends: thread.friends.map(friend => `${friend.alias} (${tag})`),
      enemies: thread.enemies.map(enemy => `${enemy.alias} (${tag})`),
      complications: thread.complications.map(complication => `${complication} (${tag})`),
      things: thread.things.map(thing => `${thing} (${tag})`),
      places: thread.places.map(place => `${place} (${tag})`)
    }
  })
  const [bgf, bge] = window.dice.shuffle(details)
  const friend = window.dice.choice(bgf.friends)
  const enemy = window.dice.choice(bge.enemies)
  const anotherEnemy = window.dice.choice(bgf.enemies)
  const [bdc, bgt, bgp] = window.dice.shuffle([bgf, bge, bgf, bge])
  const complication = window.dice.choice(bdc.complications)
  const thing = window.dice.choice(bgt.things)
  const place = window.dice.choice(bgp.places)
  const differentPlace = window.dice.choice([bgf, bge].find(b => b !== bgp).places)
  return window.dice.spin(
    window.dice
      .choice(hooks)
      .replaceAll('another Enemy', decorateText({ label: 'another enemy', tooltip: anotherEnemy }))
      .replaceAll('Enemy', decorateText({ label: 'enemy', tooltip: enemy }))
      .replaceAll('Friend', decorateText({ label: 'friend', tooltip: friend }))
      .replaceAll('Complication', decorateText({ label: 'complication', tooltip: complication }))
      .replaceAll('Thing', decorateText({ label: 'thing', tooltip: thing }))
      .replaceAll('different Place', decorateText({ label: 'place', tooltip: differentPlace }))
      .replaceAll('real Place', decorateText({ label: 'place', tooltip: differentPlace }))
      .replaceAll('Place', decorateText({ label: 'place', tooltip: place }))
  )
}

const tags: BackgroundDetails['type'][] = ['community', 'court', 'wilderness', 'ruins']

export const background__spawn = (loc: Province) => {
  const rural = hub__isVillage(loc.hub)
  const { capital: regional } = loc
  const { civilized } = window.world.regions[loc.region]
  const categories = window.dice.sample(tags, 3)
  const used = window.world.provinces
    .map(province =>
      province.hooks?.map?.(hook => hook.background?.map(background => background.tag)).flat()
    )
    .flat()
    .reduce((acc: Record<string, number>, tag) => {
      acc[tag] = (acc[tag] || 1) + 1
      return acc
    }, {})
  loc.hooks = categories.map(category => {
    const candidates = backgrounds
      .filter(background => category === background.type)
      .map(({ tag, constraints }) => {
        let weight = 1
        weight *= constraints?.coastal && !loc.hub.coastal ? 0 : 1
        weight *= constraints?.regional && !regional ? 0 : 2
        weight *= constraints?.rural && !rural ? 0 : 1
        weight *= constraints?.urban && rural ? 0 : 1
        weight *= constraints?.tribal && civilized ? 0 : 1
        return { v: tag, w: weight / (used[tag] * 10 || 1) }
      })
    const tags = window.dice.weightedSample(candidates, 2)
    const goal = background__goal(tags)
    return {
      goal,
      type: category,
      background: tags.map(tag => {
        const { context } = thread__backgrounds[tag]
        return { tag, context: window.dice.spin(context) }
      })
    }
  })
}
