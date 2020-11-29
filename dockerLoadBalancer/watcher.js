const fs = require('fs');


class Watcher{
      constructor(dirname) {
        this.dirname = dirname;
        this.watcher=null;
        this.dictionary={
            performance:false,
            output:false,
            result:false
        };
        this.counter=0;
      }
       watch(){
        watcher=fs.watch(this.dirname, function (event, filename) {
            console.log('event is: ' + event);
            if (filename) {
                console.log(this.dirname);
                console.log('filename provided: ' + filename);
            } else {
                console.log('filename not provided');
            }
        });
       }
         
       unwatch(){
        this.watcher.close();
      }
}

let watcher=new Watcher("UserCode");
watcher.watch();
module.exports=watcher;