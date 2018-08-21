import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'

export default class KillCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/(kill|убить)(?: |$)/im
    private _bot: IBot

    public getHelp(): IBotCommandHelp {
        return { caption: '/kill /убить {цель}', description: 'Угрожает цели.' }
    }

    public init(bot: IBot, dataPath: string): void {
        this._bot = bot
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        const cmdMatches = msg.match(this.CMD_REGEXP)!
        const userName = msg.substr(cmdMatches[0].length).trim()
        answer.setTextOnly(userName ? `заказ принят. ${userName} - умри, жывотнайе!` : 'тут нет таких.')
    }
}