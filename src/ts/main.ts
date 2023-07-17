// import scss files
import './../scss/main.scss'

// import plugin manager
import PluginManager from './plugin-system/plugin.manager'
const pluginManager = new PluginManager();

// import ts plugins
import CalculateTipPlugin from './plugins/calculate-tip.plugin'

// register ts plugins
pluginManager.registerPlugin(CalculateTipPlugin, '#app')
