import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

import Chalk from 'chalk'
import Inquirer from 'inquirer'
import glob from 'glob'

import { languages } from './languages'

const PREFIX = Chalk`{green ?} {bold select}`

const getCommand = async () => {
  const { command } = await Inquirer.prompt({
    type: 'list',
    name: 'command',
    prefix: PREFIX,
    choices: Object.keys(commands)
  })
  return command.toLowerCase()
}

const commands: Record<string, () => void | Promise<void>> = {
  async translations() {
    const ROOT = 'i18n'
    const languageList = glob
      .sync(`${ROOT}/*/`)
      .map(directory => directory.slice(ROOT.length + 1, -1))
      .filter(languages.hasCode)
      .map<string>(languages.toName as any)
    const { language } = await Inquirer.prompt({
      type: 'list',
      name: 'language',
      prefix: PREFIX,
      choices: languageList
    })
    const fileNameList = glob.sync(`i18n/${languages.toCode(language)}/**/*.json`, { nodir: true, nounique: true })
    console.log(Chalk`\n{bold ${language}} has {bold ${fileNameList.length.toString()}} translations`)

    if (fileNameList.length) {
      const message = fileNameList.map(fileName => `\n- http://localhost:${process.env.PORT}/${fileName.slice(5)}`).join('')
      console.log(message)
    }
  }
}

void (async () => {
  console.clear()
  while (true) {
    const command = await getCommand()
    await commands[command]()
    console.log()
  }
})()
