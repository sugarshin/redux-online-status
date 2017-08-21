import test from 'ava'
import { spy } from 'sinon'
import createEnhancer from '../src'

test('default import is a function', t => {
  t.is(typeof createEnhancer, 'function')
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
