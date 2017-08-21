import test from 'ava'
import { reducer } from '../src'

[
  {
    subject: 'action type is `@@online-status/CHANGE`',
    type: '@@online-status/CHANGE',
    state: false,
    payload: true,
    expected: true,
  },
  {
    subject: 'action type is not `@@online-status/CHANGE`',
    type: 'SOME_ACTION',
    state: false,
    payload: true,
    expected: false,
  },
  {
    subject: 'action type is `@@online-status/CHANGE`, initialState: undefined',
    type: '@@online-status/CHANGE',
    payload: true,
    expected: true,
  },
].forEach(({ subject, type, state, payload, expected }) => {
  test(`reducer / ${subject}`, t => {
    t.is(typeof reducer, 'function')
    t.is(reducer(state, { type, payload }), expected)
  })
})
