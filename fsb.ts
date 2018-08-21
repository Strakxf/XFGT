import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt, getUserString } from '../utils'

export default class FsbCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/(fsb|фсб|гебня|гэбня)(?: |$)/im
    private _bot: IBot

    public getHelp(): IBotCommandHelp {
        return { caption: '/fsb /фсб /гебня /гэбня', description: 'Назначить агента фсб.' }
    }

    public init(bot: IBot, dataPath: string): void {
        this._bot = bot
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        const users = this._bot.onlineUsers
        const user = users[getRandomInt(0, users.length - 1)]
        answer.setTextOnly(`Агентом кровавой гэбни назначен ${getUserString(user)}`)
    }
}