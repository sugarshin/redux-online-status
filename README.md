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
import createOnlineStatusEnhancer from 'redux-online-status'

const store = createStore(
  rootReducer,
  initialState,
  compose(
    createOnlineStatusEnhancer(),
    applyMiddleware(...middlewares)
  )
)

// reducer
import { combineReducers } from 'redux'
import { reducer as online } from 'redux-online-status'
import { reducer as notifications } from 'react-notification-system-redux'

export default combineReducers({
  online,
  notifications,
})

// container component
import React, { PureComponent } from 'react'
import NotificationSystem, { warning, hide } from 'react-notification-system-redux'
import { connect } from 'react-redux'

@connect(({ notifications, online }) => ({ notifications, online }))
export default class Notifications extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.online === true && nextProps.online === false) {
      warning({ uid: 'OFFLINE', message: 'Your computer seems to be offline.', autoDismiss: 0, dismissible: false })
    }
    if (this.props.online === false && nextProps.online === true) {
      hide('OFFLINE')
    }
  }
  render() {
    return <NotificationSystem notifications={this.props.notifications} />
  }
}
```
## License

[MIT][license-url]

© sugarshin

[circleci-image]: https://circleci.com/gh/sugarshin/redux-online-status.svg?style=svg&circle-token=df31f8d6b23e90a5f8bab6b03c50c3fdcdbab6c5
[circleci-url]: https://circleci.com/gh/sugarshin/redux-online-status
[codecov-image]: https://codecov.io/gh/sugarshin/redux-online-status/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sugarshin/redux-online-status
[npm-image]: https://img.shields.io/npm/v/redux-online-status.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/redux-online-status
[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
