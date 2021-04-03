const puppeteer = require('puppeteer')

// const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`
const url =`http://api.douban.com/v2/movie/${item.doubanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

  ; (async () => {
    console.log('Start......')

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      dumpio: false
    })

    const page = await browser.newPage()
    await page.goto(url, {
      waitUntil: 'networkidle2'
    })

    await sleep(1000)

    await page.waitForSelector('.more')

    for (let i = 0; i < 1; i++) {
      await sleep(1000)
      await page.click('.more')
    }

    const result = await page.evaluate(() => {
      var $ = window.$
      var items = $('.list-wp a')
      var links = []

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

    process.send({ result })
    process.exit(0)
  })()
