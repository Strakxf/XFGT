import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'

export default class HelpCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/(help|помощь)(?: |$)/im
    private _bot: IBot

    public getHelp(): IBotCommandHelp {
        return { caption: '/help /помощь', description: 'Эта команда.' }
    }

    public init(bot: IBot, dataPath: string): void {
        this._bot = bot
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        answer.setTitle('Список поддерживаемых команд:')
        for (const cmd of this._bot.commands) {
            const help = cmd.getHelp()
            if (help.caption) {
                answer.addField(help.caption, help.description)
            }
        }
    }
}