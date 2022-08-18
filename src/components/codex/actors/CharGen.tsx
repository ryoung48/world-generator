import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField
} from '@mui/material'
import { range } from 'd3'
import { Refresh } from 'mdi-material-ui'
import React from 'react'

import { actor__spawn } from '../../../models/npcs/actors/spawn'
import { Cousin } from '../../../models/npcs/actors/spawn/relations/cousins'
import { Sibling } from '../../../models/npcs/actors/spawn/relations/sibling'
import { Relation } from '../../../models/npcs/actors/spawn/types'
import { npc__randomGender } from '../../../models/npcs/actors/stats/appearance/gender'
import { Actor } from '../../../models/npcs/actors/types'
import { lang__first, lang__last } from '../../../models/npcs/species/languages/words/actors'
import { location__hub } from '../../../models/regions/locations'
import { location__demographics } from '../../../models/regions/locations/actors/demographics'
import { view__context } from '../../context'
import { StyledSelect } from '../common/input/Select'
import { CodexTitle } from '../common/text/title'

export function CharGen() {
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const { state, dispatch } = view__context()
  const avatar = window.world.actors[state.avatar]
  const location = window.world.locations[state.codex.location]
  const nation = window.world.regions[state.codex.nation]
  const hub = location__hub(location)
  const { commonCultures } = location__demographics(hub)
  const cultures = Object.entries(commonCultures)
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .filter(([_, percent]) => percent > 0.01)
    .map(([culture, percent]) => {
      const { name } = window.world.cultures[parseInt(culture)]
      return {
        name: `${name} (${(percent * 100).toFixed(2)}%)`,
        idx: parseInt(culture)
      }
    })
  const [gender, _setGender] = React.useState(npc__randomGender())
  const [culture, setCulture] = React.useState(cultures[0].idx)
  const { language, species } = window.world.cultures[culture]
  const [first, setFirst] = React.useState(lang__first(language, gender))
  const [last, setLast] = React.useState(lang__last(language))
  const disabledLast = language?.surnames?.patronymic
  const randomNames = (_gender: typeof gender) => {
    setFirst(lang__first(language, _gender))
    setLast(lang__last(language))
  }
  const setGender = (val: typeof gender) => {
    _setGender(val)
    randomNames(val)
  }
  return (
    <div>
      <Button
        onClick={() =>
          !avatar ? setOpen(true) : dispatch({ type: 'update codex', payload: { target: avatar } })
        }
      >
        PC
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <CodexTitle
            title='Character Creation'
            subtitle={`${hub.name} (${hub.type}), ${nation.name}`}
          ></CodexTitle>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Grid container spacing={3} pt={1}>
            <Grid item xs={5}>
              <TextField
                spellCheck={false}
                label='First:'
                value={first}
                onChange={event => setFirst(event.currentTarget.value)}
              ></TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                spellCheck={false}
                label={'Last:'}
                value={disabledLast ? 'Patronymic Surname:' : last}
                disabled={disabledLast}
                onChange={event => setLast(event.currentTarget.value)}
              ></TextField>
            </Grid>
            <Grid item xs={5}>
              <StyledSelect
                label='Gender:'
                selected={gender}
                setSelected={val => setGender(val as typeof gender)}
                items={['male', 'female'].map(val => ({ label: val, value: val }))}
              ></StyledSelect>
            </Grid>
            <Grid item xs={5}>
              <StyledSelect
                label='Culture:'
                selected={culture}
                setSelected={val => {
                  setCulture(parseInt(val))
                  setGender(npc__randomGender())
                }}
                items={cultures.map(val => ({ label: val.name, value: val.idx }))}
                hint={species}
              ></StyledSelect>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <IconButton color='primary' onClick={() => randomNames(gender)}>
            <Refresh></Refresh>
          </IconButton>
          <Button
            onClick={() => {
              const startingLevel = 1
              const ages = [20, 40]
              const avatar = actor__spawn({
                occupation: { key: 'mercenary' },
                location: hub,
                culture: window.world.cultures[culture],
                gender,
                first,
                last,
                living: true,
                unbound: true,
                venerable: true,
                level: startingLevel,
                ages
              })
              const party: Actor[] = [avatar]
              range(4).forEach(() =>
                party.push(
                  actor__spawn({
                    location: window.world.locations[avatar.location.residence],
                    occupation: { key: 'mercenary' },
                    living: true,
                    unbound: true,
                    venerable: true,
                    level: startingLevel,
                    relation: window.dice.weightedChoice<() => Relation>([
                      {
                        v: () => {
                          const sibling = window.dice.choice(party)
                          console.log(`spawning sibling of ${sibling.name}`)
                          return new Sibling({ ref: sibling, locationLocked: true })
                        },
                        w: 0.05
                      },
                      {
                        v: () => {
                          const cousin = window.dice.choice(party)
                          console.log(`spawning cousin of ${cousin.name}`)
                          return new Cousin({ ref: cousin, locationLocked: true })
                        },
                        w: 0.05
                      },
                      { v: () => undefined, w: 0.9 }
                    ])(),
                    ages
                  })
                )
              )
              const relations = party.map(({ idx }) => ({ actor: idx, type: 'party' as const }))
              relations.forEach(({ actor }) => {
                const member = window.world.actors[actor]
                member.relations = [...member.relations, ...relations]
              })
              dispatch({ type: 'set avatar', payload: { avatar } })
              dispatch({ type: 'update codex', payload: { target: avatar } })
              setGender(npc__randomGender())
              handleClose()
            }}
            size='small'
          >
            Begin Journey
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
