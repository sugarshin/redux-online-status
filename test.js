import test from 'ava'
import { spy, stub } from 'sinon'
import createEnhancer, * as OnlineStatus from './src'

test('default import is a function', t => {
  t.is(typeof createEnhancer, 'function')
})

;[
  {
    subject: 'is not browser env',
    window: undefined,
    expected: true,
  },
  {
    subject: 'returns true',
    window,
    expected: true,
  },
].forEach(({ subject, window: win, expected }) => {
  test(`getOnLine / ${subject}`, t => {
    t.is(OnlineStatus.getOnLine(win), expected)
  })
})

test('action type', t => {
  t.is(OnlineStatus.CHANGE, '@@online-status/CHANGE')
})

test('action creator', t => {
  t.is(typeof OnlineStatus.change, 'function')
  t.deepEqual(OnlineStatus.change(true), {
    type: '@@online-status/CHANGE',
    payload: true,
  })
})

;[
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
    t.is(typeof OnlineStatus.reducer, 'function')
    t.is(OnlineStatus.reducer(state, { type, payload }), expected)
  })
})

;[
  {
    subject: 'current online: true',
    current: true,
    next: true,
    dispatchCalled: false,
  },
  {
    subject: 'current online: false',
    current: true,
    next: false,
    dispatchCalled: true,
  },
].forEach(({ subject, current: online, next: onLine, dispatchCalled }) => {
  test(`defaultCreateEventListener / ${subject}`, t => {
    const dispatch = spy()
    const getState = stub().returns({ online })
    const mockStore = { dispatch, getState }
    const mockEvent = { target: { navigator: { onLine } } }
    const listener = OnlineStatus.defaultCreateEventListener(mockStore)
    t.is(typeof OnlineStatus.defaultCreateEventListener, 'function')
    t.is(typeof listener, 'function')
    listener(mockEvent)
    t.true(getState.called)
    t.is(dispatch.called, dispatchCalled)
  })
})

;[
  {
    subject: 'Bind to `online` , `offline` event',
    createEventListenerCalled: true,
  },
  // TODO:
  // {
  //   subject: '`window` isn\'t declared',
  //   createEventListenerCalled: false,
  // }
].forEach(({ subject, createEventListenerCalled }) => {
  test(`createEnhancer ${subject}`, t => {
    const mockCreateStore = spy()
    const mockCreateEventListener = spy()
    createEnhancer({ createEventListener: mockCreateEventListener })(mockCreateStore)()
    t.true(mockCreateStore.called)
    t.true(createEventListenerCalled)
  })
})
