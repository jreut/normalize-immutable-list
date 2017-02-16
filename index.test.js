const normalizr = require('normalizr')
const Entity = normalizr.schema.Entity
const Immutable = require('immutable')
const fromJS = Immutable.fromJS

const bar = new Entity('bars')
const foo = new Entity('foos', { bars: [ bar ] })

const data = {
  id: 7,
  bars: [
    { id: 1 },
    { id: 2 },
  ],
}
const normalized = normalizr.normalize(data, foo)
const denormalizer = entities => normalizr.denormalize(data.id, foo, entities)

test('vanilla object', () => {
  const denormalized = denormalizer(normalized.entities)
  expect(denormalized).toEqual(data)
})

test('Immutable Map', () => {
  const immutable = fromJS(normalized)
  const denormalized = denormalizer(immutable.get('entities')).toJS();
  expect(denormalized).toEqual(data)
})
