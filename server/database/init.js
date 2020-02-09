const mongoose = require('mongoose')
const db = 'mongodb://localhost/trailer'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'lin'
  })
  if (!user) {
    const user = new User({
      username: 'lin',
      email: 'lin@123.com',
      password: '123',
      role: 'admin'
    })

    await user.save()
  }
}

exports.connect = () => {
  let maxConnect = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnect++
      if (maxConnect < 3) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接失败~')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnect++
      if (maxConnect < 3) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接失败~')
      }
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected Successfully!')
    })
  })
}
