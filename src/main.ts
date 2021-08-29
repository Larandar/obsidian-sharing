import { Plugin } from 'obsidian'
import TranspilerService from './modules/transpiler/transpiler.service'
import {
    DEFAULT_SETTINGS,
    SharePluginSettings,
    ShareSettingTab,
} from './plugin.settings'

export default class SharePlugin extends Plugin {
    settings: SharePluginSettings

    transpilerService: TranspilerService

    async onload() {
        console.log('loading plugin')

        await this.loadSettings()

        this.transpilerService = new TranspilerService()

        this.addCommand({
            id: 'run-transpiler',
            name: 'Run Transpiler',
            callback: async () => {
                this.transpilerService.updateSourceMap(this.app)
                let files = this.transpilerService.filesToTranspile(this.app)
                for (let file of files) {
                    const targetContent =
                        await this.transpilerService.transpile(this.app, file)

                    const targetDestination = this.transpilerService.srcMap.get(
                        file.path
                    ) // ??

                    await this.app.vault.create(
                        targetDestination,
                        targetContent.toString()
                    )
                }
            },
        })

        this.addSettingTab(new ShareSettingTab(this.app, this))
    }

    onunload() {}

    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        )
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}
