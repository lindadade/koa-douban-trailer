const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

~(async () => {
  console.log('Start visit the target page')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'

  })
  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 2; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    let $ = window.$
    let items = $('.list-wp a')
    let links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = Number(it.find('.rate').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })
  browser.close()

  process.send({result})
  process.exit(0)
 })()

//
// const puppeteer = require('puppeteer')
//
// const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`
//
// const sleep = time => new Promise(resolve => {
//   setTimeout(resolve, time)
// })
//
// ~(async () => {
//   console.log('Start visit the target page')
//
//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox'],  // 不开启沙箱模式
//     dumpio: false
//   })
//
//   const page = await browser.newPage()
//
//   await page.goto(url, {        // 访问url
//     waitUntil: 'networkidle2'   // 等待网络空闲时再释放控制权
//   })
//
//   await sleep(2000)  // 为了让网页测地加载完，再等两秒钟
//
//   await page.waitForSelector('.more')  // 再次等待能选中带class=more的dom元素
//
//   for (let i = 0; i <= 1; i++) {
//     await sleep(2000)
//     await page.click('.more')  // 点一次“加载更多”
//   }
//
//   const result = await page.evaluate(() => {
//     // evaluate 在页面里执行JS脚本
//     let $ = window.$
//     let items = $('.list-wp a') // 拿到list-wp类里的所有a
//     let links = []
//
//     // 如果items不为空再遍历
//     if (items.length >= 1) {
//       items.each((index, item) => {
//         let it = $(item)
//         let doubanId = it.find('div').data('id')
//         let title = it.find('.title').text()
//         let rate = Number(it.find('.rate').text())
//         let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
//
//         links.push({
//           doubanId,
//           title,
//           rate,
//           poster
//         })
//       })
//     }
//
//     return links
//   })
//
//   browser.close()
//
//   console.log(result)
// })()
