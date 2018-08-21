import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

export default class FireCommand implements IBotCommand {
    private readonly CMD_REGEXP = /(пичот|пожар|подгорело|пригорело|пукан)(?:[ \.,!]|$)/im
    private readonly IMG_URL = 'https://uproxx.files.wordpress.com/2015/08/buttspray.gif'

    public getHelp(): IBotCommandHelp {
        return { caption: '', description: 'Реакция на пичот-пожар-подгорело-пригорело-пукан.' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        answer.setTextOnly(this.IMG_URL)
    }
}