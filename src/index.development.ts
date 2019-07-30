import dotenv from 'dotenv'

dotenv.config()

import Chalk from 'chalk'
import Inquirer from 'inquirer'
import glob from 'glob'

import { server } from './server'
import { languages } from './languages'

server.listen(process.env.PORT, async () => {
  console.clear()
  console.log(Chalk`{green Compiled successfully!}\n`)
  console.log(Chalk`You can now view {bold erenfest-server-i18n} in the browser\n`)
  console.log(Chalk`  {bold Local}: http://localhost:${process.env.PORT!}/\n`)

  while (true) {
    const ROOT = 'i18n'
    const languageList = glob
      .sync(`${ROOT}/*/`)
      .map(directory => directory.slice(ROOT.length + 1, -1))
      .filter(languages.hasCode)
      .map<string>(languages.toName as any)
    const { language } = await Inquirer.prompt({
      name: 'language',
      message: 'Which language will you check?',
      type: 'list',
      choices: languageList
    })
    const fileNameList = glob.sync(`i18n/${languages.toCode(language)}/**/*.json`, { nodir: true, nounique: true })
    console.log(Chalk`\n${language} has {bold ${fileNameList.length.toString()}} translations\n`)

    const hasTranslation = !!fileNameList.length
    if (hasTranslation) {
      fileNameList.forEach(fileName => console.log(`- http://localhost:${process.env.PORT}/${fileName.slice(5)}\n`))
    }
  }
})
