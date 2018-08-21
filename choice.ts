import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

export default class ChoiceCommand implements IBotCommand {
    private readonly CMD_REGEXP = / или /gi

    public getHelp(): IBotCommandHelp {
        return { caption: '{1} или {2}', description: 'Выбирает случайный вариант 1 или 2.' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        this.CMD_REGEXP.lastIndex = 0
        return this.CMD_REGEXP.test(msg)
    }
    public async process(msg: string, answer: IBotMessage): Promise<void> {
        const matches = msg.replace('?', '').split(this.CMD_REGEXP)
        answer.setTextOnly(matches[getRandomInt(0, matches.length - 1)])
    }
}