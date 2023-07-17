import { PluginOptions } from '../interfaces/plugin.interface.ts'

/**
 * ##### Default plugin class on which every plugin will be build on
 */
export default abstract class Plugin {
  public _el: HTMLElement | undefined
  private _name: string
  public _options: PluginOptions

  /**
   * Plugin constructor method
   */
  public constructor() {
    this._name = this.constructor.name
    this._options = this.constructor.options
  }

  /**
   * Method to get plugin name
   */
  get name(): string {
    return this._name
  }

  /**
   * Method to get plugin element
   */
  get el(): HTMLElement {
    if (this._el === undefined) throw new Error('Element is not defined')

    return this._el
  }

  /**
   * Method to get plugin options
   */
  get options(): PluginOptions {
    if (this._options === undefined)
      throw new Error(`Options for the plugin "${this._name}" are not defined`)

    return this._options
  }

  /**
   * Method to initialize plugin
   */
  initPlugin() {
    throw new Error(
      `The "initPlugin" method for the plugin "${this._name}" is not defined.`
    )
  }
}
