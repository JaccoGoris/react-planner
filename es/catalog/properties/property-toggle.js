import React from 'react'
import PropTypes from 'prop-types'
import { FormLabel, Button } from '../../components/style/export'
import PropertyStyle from './shared-property-style'

export default function PropertyToggle(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state

  var update = function update(val) {
    if (configs.hook) {
      return configs
        .hook(val, sourceElement, internalState, state)
        .then(function (_val) {
          return onUpdate(_val)
        })
    }

    return onUpdate(val)
  }

  return React.createElement(
    'table',
    { className: 'PropertyToggle', style: PropertyStyle.tableStyle },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: PropertyStyle.firstTdStyle },
          React.createElement(FormLabel, null, configs.label)
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            Button,
            {
              onClick: function onClick(e) {
                return update(!value)
              },
              size: 'small',
            },
            configs.actionName
          )
        )
      )
    )
  )
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired,
}
