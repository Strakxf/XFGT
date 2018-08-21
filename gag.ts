import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import * as qs from 'querystring'
import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

export default class GagCommand implements IBotCommand {
    private readonly API_URL = 'https://9gag.com/search?query='
    private readonly CMD_REGEXP = /^\/(gag)(?: |$)/im
    private readonly TIMEOUT = 5000
    private _bot: IBot

    public getHelp(): IBotCommandHelp {
        return {
            caption: '/gag ключевые слова',
            description: 'Показ картинки c 9gag. Если не указаны ключевые слова - буду искать сиськи.'
        }
    }

    public init(bot: IBot, dataPath: string): void {
        this._bot = bot
    }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage): Promise<void> {
        const cmdMatches = msg.match(this.CMD_REGEXP)!
        const keywords = msg.substr(cmdMatches[0].length).trim()
        try {
            const url = `${this.API_URL}${qs.escape(keywords ? keywords : 'boobs')}`
            const response = await fetch(url, { timeout: this.TIMEOUT })
            const html = await response.text()
            const $ = cheerio.load(html)
            const posts = $('article')
            if (posts.length > 0) {
                const url2 = posts[getRandomInt(0, posts.length - 1)].attribs['data-entry-url']
                const response2 = await fetch(url2, { timeout: this.TIMEOUT })
                const html2 = await response2.text()
                const $2 = cheerio.load(html2)
                answer.addField($2('.badge-item-title').text(), url2)
                answer.setImage($2('head>link[rel="image_src"]').attr('href'))
            } else {
                answer.setTextOnly('Нет данных')
            }
        } catch (ex) {
            this._bot.logger.warn(ex)
            answer.setTextOnly('Нет данных')
        }
    }
}