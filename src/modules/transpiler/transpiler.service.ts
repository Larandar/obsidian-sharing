import { App, TFile } from 'obsidian'
import { injectable } from 'tsyringe'

@injectable()
export default class TranspilerService {
    public srcMap: Map<string, string> = new Map<string, string>()

    public updateSourceMap(app: App) {
        this.srcMap.clear()

        let files = app.vault.getFiles()

        files.forEach((f) => {
            // TODO add all the posibilities or find something clever
            // NOTE FileManager.generateMarkdownLink could help
            this.srcMap.set(f.basename, f.path)
        })
    }

    public filesToTranspile(app: App): TFile[] {
        // NOTE: you can use .filter here to remove files
        return app.vault.getFiles()
    }

    /**
     *
     */
    public async transpile(app: App, srcFile: TFile): Promise<String> {
        const srcContent: string = await app.vault.read(srcFile)

        // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        let transpiledContent = srcContent
            .replace(
                /\[\[(?<link>[^[\]]*]])/,
                (substring, link) => `[${link}](${this.srcMap.get(link)})`
            )
            .replace(/\r\n/, '\n')
        // ...

        return transpiledContent
    }
}
