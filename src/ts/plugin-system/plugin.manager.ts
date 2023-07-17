import Plugin from './plugin.class.ts'
import { PluginQueue} from '../interfaces/plugin.interface.ts'

/**
 * ##### Plugin Manager used to easily register and initialize plugins
 */
export default class PluginManager {
  private pluginQueue: PluginQueue
  private documentLoaded: boolean

  /**
   * Plugin manager constructor method
   */
  constructor() {
    this.pluginQueue = {}
    this.documentLoaded = false

    document.addEventListener('DOMContentLoaded', () => this.initPlugins())
  }

  /**
   * Function to register a given plugin
   */
  registerPlugin(PluginCallback: new () => Plugin, selector: string): void {
    if (this.documentLoaded) return

    if (this.pluginQueue[PluginCallback.name] === undefined)
      this.pluginQueue[PluginCallback.name] = {}

    this.pluginQueue[PluginCallback.name][selector] = PluginCallback
  }

  /**
   * Function to initialize all registered plugins
   */
  public initPlugins(): void {
    if (this.documentLoaded) return
    this.documentLoaded = true

    for (let pluginName in this.pluginQueue) {
      let pluginQueueItem = this.pluginQueue[pluginName]

      for (let pluginSelector in pluginQueueItem) {
        this.initPlugin(pluginSelector, pluginQueueItem[pluginSelector])
      }
    }
  }

  /**
   * Function to initialize one plugin
   */
  public initPlugin(
    pluginSelector: string,
    PluginCallback: new () => Plugin,
  ): void {
    let elements = document.querySelectorAll(pluginSelector)

    elements.forEach((element: Element) => {
      const plugin = new PluginCallback()
      plugin._el = element as HTMLElement

      plugin.initPlugin()
    })
  }
}
