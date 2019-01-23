const shell = require('shelljs');
const inquirer = require('inquirer');

const Promps = {
  ciType: [
    {
      type: 'list',
      name: 'type',
      message: '请选择本次提交的类型:',
      choices: [
        {
          name: '✨  引入新特性',
          value: ':sparkles:',
        },
        {
          name: '🎨  优化代码的结构/格式',
          value: ':art:',
        },
        {
          name: '🐛  修复 bug',
          value: ':bug:',
        },
        {
          name: '⚡️  提升性能',
          value: ':zap:',
        },
        {
          name: '🔥  删除代码或文件',
          value: ':new:',
        },
        {
          name: '💄  更新界面和样式文件',
          value: ':lipstick:',
        },
        {
          name: '🔧  更改配置文件',
          value: ':wrench:',
        },
        {
          name: '🚧  工作进行中',
          value: ':construction:',
        },
        {
          name: '🚑 重要补丁',
          value: ':ambulance:',
        },
        {
          name: '📝  撰写文档',
          value: ':memo:',
        },
        {
          name: '✅  增加测试',
          value: ':white_check_mark:',
        },
        {
          name: '📦  更新打包文件',
          value: ':package:',
        },
        {
          name: '🎉  初次提交',
          value: ':tada:',
        },
        {
          name: '🔖  发布/版本标签',
          value: ':bookmark:',
        },
        {
          name: '🚀  部署功能',
          value: ':rocket:',
        },
        {
          name: '💚 修复CI构建问题',
          value: ':green_heart:',
        },
        {
          name: '👷  CI编译系统',
          value: ':construction_worker:',
        },
        {
          name: '🌐  国际化与本地化',
          value: ':globe_with_meridians:',
        },
      ],
    },
  ],
  ciMsg: {
    type: 'input',
    name: 'msg',
    message: '请输入提交文本:',
    validate: function(value) {
      if (value) {
        return true;
      }
      return '文本必须输入!';
    },
  },
  comptName: {
    type: 'input',
    name: 'name',
    message: '请输入组件名称:',
    validate: function(value) {
      if (/^[\-a-z]+$/.test(value)) {
        return true;
      }
      return '组件名称只能包含小写字母和横杠(-)!';
    },
  },
  compConfig: [
    {
      type: 'confirm',
      name: 'needConfig',
      message: '是否需要组件配置文件(普通组件不需要)',
      default: false,
    },
  ],
};

async function gitCommit() {
  let { type } = await inquirer.prompt(Promps.ciType);
  let { msg } = await inquirer.prompt(Promps.ciMsg);

  shell.exec(`git commit -m "${type} ${msg}"`, function() {
    console.log(`\n提交脚本: git commit -m "${type} ${msg}"`);
  });
}

gitCommit();
