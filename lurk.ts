import fetch, { Request } from 'node-fetch'
import * as qs from 'querystring'
import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'

interface IWikiList { [key: string]: { fullurl: string } }

export default class LurkCommand implements IBotCommand {
    private readonly API_URL = 'https://lurkmore.to/api.php?action=query&prop=info&inprop=url&format=json&titles='
    private readonly CMD_REGEXP = /^\/(lurk|l|лурк|л)(?: |$)/im
    private readonly TIMEOUT = 5000
    private _bot: IBot

    public getHelp(): IBotCommandHelp {
        return {
            caption: '/lurk /l /лурк /л {ключевые слова}',
            description: 'Поиск по lurkmore.'
        }
    }

    public init(bot: IBot, dataPath: string): void {
        this._bot = bot
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        const matches = msg.match(this.CMD_REGEXP)!
        const keywords = msg.substr(matches[0].length).trim()
        if (!keywords) {
            answer.setTextOnly('укажи ключевые слова')
            return
        }
        try {
            const response = await fetch(`${this.API_URL}${qs.escape(keywords)}`, { timeout: this.TIMEOUT })
            const rawData = await response.json()
            if (rawData) {
                const list = rawData.query.pages as IWikiList
                const pages = Object.keys(list)
                if (pages.length === 0 || pages[0] === '-1') {
                    answer.setTextOnly('Нет данных')
                } else {
                    answer.setTextOnly(list[pages[0]].fullurl)
                }
            } else {
                answer.setTextOnly('Нет данных')
            }
        } catch (ex) {
            this._bot.logger.warn(ex)
            answer.setTextOnly('Нет данных')
        }
    }
}