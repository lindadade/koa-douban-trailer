const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.log(sth + '用了' + time + ' 毫秒')
    resolve()
  }, time)
})

const doAync = (sth, time, cb) => {
  setTimeout(() => {
    console.log(sth + '用了' + time + ' 毫秒')
    cb && cb()
  }, time)
}

const doElse = (sth) => {
  console.log(sth)
}

const Scott = { doSync, doAync }
const Meizi = { doSync, doAync, doElse }

;(async () => {
  // 同步阻塞
  console.log('case 1: 妹子来到门口');
  await Scott.doSync('Scott 刷牙',1000)
  console.log('啥也没干，一直等')
  await Meizi.doSync('妹子洗澡',2000)
  console.log('妹子去忙别的了')


  //
  console.log('case 3: 妹子来到门口并按下通知开关')
  Scott.doAync('Scott 刷牙', 1000, () => {
    console.log('卫生间通知妹子来洗澡');
    Meizi.doAync('妹子洗澡', 2000)
  })
  Meizi.doElse('妹子去忙别的了 ')
})()
