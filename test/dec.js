class Boy {
  @speak('中文')      // 可以放在class类的内部或者外部
  run(){
    console.log("I can speak " + this.language);
    console.log("I can run");
  }
}

function speak(language){
  return function(target, key, descriptor){   // 被装饰器装饰的对象, 所修饰的方法_run(), 描述内部的配置项
    console.log(target);
    console.log(key);
    console.log(descriptor);
    target.language = language

    return descriptor;
  }
}

const luck = new Boy()

luck.run()
