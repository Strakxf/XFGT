import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

export default class KekCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^(kek|кек)(?: |$)/im
    private _variants: string[]

    public getHelp(): IBotCommandHelp {
        return { caption: 'kek / кек', description: 'Выводит случайный ответ на кек.' }
    }

    public init(bot: IBot, dataPath: string): void {
        this._variants = require(`${dataPath}`) as string[]
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        answer.setTextOnly(this._variants[getRandomInt(0, this._variants.length - 1)])
    }
}