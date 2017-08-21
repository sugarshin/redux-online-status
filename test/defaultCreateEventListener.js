import test from 'ava'
import { spy, stub } from 'sinon'
import enhancer, { defaultCreateEventListener } from '../src'

test('defaultCreateEventListener is function', t => {
  t.is(typeof defaultCreateEventListener, 'function')
})

test.afterEach.always(() => {
  enhancer.__ResetDependency__('getOnLine')
})

test('defaultCreateEventListener / current online: true, next onLine: false', t => {
  enhancer.__Rewire__('getOnLine', stub().returns(false))
  const dispatch = spy()
  const getState = stub().returns({ online: true })
  const mockStore = { dispatch, getState }
  const listener = defaultCreateEventListener(mockStore)
  t.is(typeof listener, 'function')
  listener()
  t.true(getState.called)
  t.true(dispatch.called)
})

test('defaultCreateEventListener / current online: true, next onLine: true', t => {
  enhancer.__Rewire__('getOnLine', stub().returns(true))
  const dispatch = spy()
  const getState = stub().returns({ online: true })
  const mockStore = { dispatch, getState }
  const listener = defaultCreateEventListener(mockStore)
  t.is(typeof listener, 'function')
  listener()
  t.true(getState.called)
  t.false(dispatch.called)
})
