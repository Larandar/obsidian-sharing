import { App, PluginSettingTab } from 'obsidian'
import { SharePlugin } from './src/main'

export interface SharePluginSettings {
    jenkins: {
        outputRoot: string
    }
}

export const DEFAULT_SETTINGS: SharePluginSettings = {
    jenkins: {
        outputRoot: 'vault.share/',
    },
}

export class ShareSettingTab extends PluginSettingTab {
    plugin: SharePlugin

    constructor(app: App, plugin: SharePlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        let { containerEl } = this
        containerEl.empty()
    }
}
