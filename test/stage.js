const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}    // 事件相关的线索

const yy = new EE()

yy.on('event', () => {    // 设置一个监听函数event  下面触发event则立即执行
  console.log('出大事了!');
})
                      // 进入定时器回调阶段
setTimeout(() => {    // 7.
  console.log('0 毫秒后带起执行的定时器回调');
}, 0)

setTimeout(() => {    // 7.1 还没到期触发  先下一个阶段 11
  console.log('100 毫秒后带起执行的定时器回调');
}, 100)

setTimeout(() => {    // 7.2 还没到期触发  先下一个阶段 12
  console.log('200 毫秒后带起执行的定时器回调');
}, 200)

readFile('../package.json', 'utf-8', data => {  // 8. 进入读操作回调
  console.log('完成文件 1 读操作的回调');
})

readFile('../README.md', 'utf-8', data => { // 9. 进入读操作回调
  console.log('完成文件 2 读操作的回调');
})

setImmediate(() => {    // 10.time阶段的立即执行函数
  console.log('immediate 立即回调');
})

process.nextTick(() => {    // 1. 优先级  先执行这个
  console.log('process.nextTick 的第一次回调');
})

Promise.resolve()   // 2. 仅次于nextTick()优先级
  .then(() => {
    yy.emit('event')  // 3. 事件回调

    process.nextTick(() => {
      console.log('process.nextTick 的第二次回调'); // 6. Promise循环体结束后  依然优先执行nextTick()
    })

    console.log('Promise 的第一次回调');  // 4. Promise中内容
  })
  .then(() => {
    console.log('Promise 的第二次回调');  // 5. then()
  })
