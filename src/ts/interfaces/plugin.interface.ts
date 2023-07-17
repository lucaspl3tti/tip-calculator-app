import Plugin from '../plugin-system/plugin.class.ts'

/**
 * ##### Define default plugin interfaces
 */
// Interface for plugin options Object
export interface PluginOptions {
  [key: string]: any
}

// Interface for element create options
export interface ElementCreateOptions {
  id?: string
  classes?: string | string[]
  text?: string
  dataset?: object
  [key: string]: any
}

// Interface for items in the plugin queue
export interface PluginQueueItem {
  [index: string]: new () => Plugin
}

// Interface for plugin queue
export interface PluginQueue {
  [index: string]: PluginQueueItem
}
