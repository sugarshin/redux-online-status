# redux-online-status

[![CircleCI][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

Online status enhancer for [Redux](http://redux.js.org/).

```bash
yarn add redux-online-status

# or

npm i redux-online-status
```

## Usage

example with [react-notification-system-redux](https://github.com/gor181/react-notification-system-redux).

```js
// store
import { createStore, applyMiddleware, compose } from 'redux'
import createOnlineEnhancer from 'redux-online-status'

const store = createStore(
  rootReducer,
  initialState,
  compose(
    createOnlineEnhancer(),
    applyMiddleware(...middlewares)
  )
)

// reducer
import { combineReducers } from 'redux'
import { reducer as online } from 'redux-online-status'

export default combineReducers({
  online,
})

// Container component
import React, { PureComponent } from 'react'
import ReactNotificationSystem, { show, hide } from 'react-notification-system-redux'
import { connect } from 'react-redux'

const OFFLINE = 'OFFLINE'

@connect(({ notifications, online }) => ({ notifications, online }))
export default class NotificationSystem extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.online === true && nextProps.online === false) {
      show({ uid: OFFLINE, message: 'Your computer seems to be offline.' })
    }
    if (this.props.online === false && nextProps.online === true) {
      hide(OFFLINE)
    }
  }
  render() {
    return <ReactNotificationSystem notifications={this.props.notifications} />
  }
}
```
## License

[MIT][license-url]

© sugarshin

[circleci-image]: https://circleci.com/gh/sugarshin/redux-online-status/tree/master.svg
[circleci-url]: https://circleci.com/gh/sugarshin/redux-online-status/tree/master
[codecov-image]: https://codecov.io/gh/sugarshin/redux-online-status/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sugarshin/redux-online-status
[npm-image]: https://img.shields.io/npm/v/redux-online-status.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/redux-online-status
[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
