import React from 'react'

import { MixpanelProvider, mixpanel } from '.'

const isEnable = options =>
  (process.env.NODE_ENV === `production` || options.enableOnDevMode) &&
  options.apiToken

const getOptions = pluginOptions => {
  const defaultsOptions = {
    apiToken: null,
    enableOnDevMode: true,
    debug: false,
  }
  const options = { ...defaultsOptions, ...pluginOptions }
  return { ...options, isEnable: isEnable(options) }
}

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  const options = getOptions(pluginOptions)
  if (options.isEnable && options.pageViews) {
    const mixpanelEvent = options.pageViews[location.pathname]
    if (mixpanelEvent) {
      mixpanel.track(mixpanelEvent, location)
    }
  }
}

exports.wrapRootElement = ({ element }, pluginOptions) => (
  <MixpanelProvider options={getOptions(pluginOptions)}>
    {element}
  </MixpanelProvider>
)
