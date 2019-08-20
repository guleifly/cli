#!/usr/bin/env node

const program = require("commander");
const download=require("download-git-repo");
const handlebars=require("handlebars");
const fs=require("fs");
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
// program.version('1.0.0', '-v, --version')
//     .command('init <name>')
//     .action((name) => {
//         console.log(name);
//     });
// program.parse(process.argv);
program.version("1.0.2", "-v, --version,-V").command("init <name>").action(name=>{
    if(!fs.existsSync(name)){
        const spinner = ora('正在下载模板...');
        spinner.start();
        download('direct:https://github.com/guleifly/vue-templete.git', name, {clone: true}, (err) => {
            if(err){
                spinner.fail();
                console.log(symbols.error, chalk.red(err));
            }else{
                let fileName=`${name}/package.json`;
                if(fs.existsSync(fileName)){
                    const content = fs.readFileSync(fileName).toString();
                    const result = handlebars.compile(content)({name});
                    fs.writeFileSync(fileName, result);
                }
                console.log(symbols.success, chalk.green('项目初始化完成'));
                process.exit(0)
            }
        });
    }else{
        console.log(symbols.error, chalk.red('项目已存在'));
    }

});
program.parse(process.argv)
