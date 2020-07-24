const path = require('path')
const fs = require('fs')

module.exports = {
  prompts () {
    return [
      {
        name: 'singular',
        message: 'Singular name',
        filter: val => {
          return {
            lowercase: val.toLowerCase(),
            uppercase: val.toUpperCase(),
            titlecase: val.charAt(0).toUpperCase() + val.slice(1),
            toString: () => val
          }
        }
      },
      {
        name: 'plural',
        message: 'Plural name',
        filter: val => {
          return {
            lowercase: val.toLowerCase(),
            uppercase: val.toUpperCase(),
            titlecase: val.charAt(0).toUpperCase() + val.slice(1),
            toString: () => val
          }
        }
      },
      {
        name: 'singular_endpoint',
        messsage: 'Singular endpoint'
      },
      {
        name: 'plural_endpoint',
        messsage: 'Plural endpoint'
      },
      {
        name: 'location',
        message: 'Where should this duck be created',
        default: 'src/ducks',
        store: true
      }
    ]
  },
  actions () {
    return [
      {
        type: 'add',
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          'DUCK_NAME': `${this.answers.plural.lowercase}.js`
        }
      }
    ]
  },
  async completed () {
    const oldPath = path.join(process.cwd(), `${this.answers.plural.lowercase}.js`)
    const newPath = path.join(process.cwd(), this.answers.location, `${this.answers.plural.lowercase}.js`)
    fs.rename(oldPath, newPath, err => {
      if (err) console.error(err)
    })
  }
}
