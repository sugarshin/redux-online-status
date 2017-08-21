import test from 'ava'
import { change, CHANGE } from '../src'

test('action type', t => {
  t.is(CHANGE, '@@online-status/CHANGE')
})

test('action creator', t => {
  t.is(typeof change, 'function')
  t.deepEqual(change(true), {
    type: '@@online-status/CHANGE',
    payload: true,
  })
})
