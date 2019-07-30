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
    const { language } = await Inquirer.prompt({
      name: 'language',
      message: 'Which language will you check?',
      type: 'list',
      choices: glob
        .sync('i18n/*/')
        .map(directory => directory.slice(5, -1))
        .filter(languages.hasCode)
        .map<string>(languages.toName as any)
    })
    const fileNameList = glob.sync(`i18n/${languages.toCode(language)}/**/*.json`, { nodir: true, nounique: true })
    console.log(Chalk`\n${language} has {bold ${fileNameList.length.toString()}} translations\n`)

    const hasTranslation = !!fileNameList.length
    if (hasTranslation) {
      fileNameList.forEach(fileName => console.log(`- http://localhost:${process.env.PORT}/${fileName.slice(5)}\n`))
    }
  }
})
