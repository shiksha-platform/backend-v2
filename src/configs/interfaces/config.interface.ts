export interface ConfigInterface {
  configId?: string
  module?: string
  key?: string
  value?: string
  context?: string
  contextId?: string
  canOverride?: boolean
  overrideBy?: [string]
  isPublic?: boolean
  }