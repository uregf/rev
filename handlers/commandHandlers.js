const fs = require(`fs`);
const config = require(`../util/config.json`);
const path = require(`path`);
//const log4js = require(`log4js`);
//const elog = log4js.getLogger(`errlog`);
//const wlog = log4js.getLogger(`warn`);
//const log = log4js.getLogger(`info`);
//const AsciiTable = require(`ascii-table`);
const Discord = require(`discord.js`);
const { forEach } = require(`async`);

const commandsfolder = require('../commands');

require(`events`).EventEmitter.defaultMaxListeners = 200;

module.exports = async (client, cmndsfolderpath) => {
  await log.info(
    `\x1b[41mCOMMANDS\x1b[40m\x1b[34m --> \x1b[31mStarted Command Handler\x1b[37m`
  );

  var pathtocommandsfolder = `${cmndsfolderpath}`;
  var commandsoptions = [];
  var dirsin = []; //loaded folders in array: [ 'mod', 'tickets' ]
  var allfiles = []; //all files in array regards to folder: [ [ 'ban.js', 'mute.js' ], [ 'close.js', 'new.js' ] ]
  var sortedallfiles = []; //all files in array ['ban.js', 'mute.js', 'close.js', 'new.js']
  var tablecounter = 0; //dirsin is all the directories inside the ./commands folder
  var prefix = config.info.PREFIX; //prefix
  var recentlyRan = [];
  var table = new AsciiTable(`Loaded Commands:`);
  var activeModules = []; //present at the bottom of the commands table (Active Modules: dev, devsim, econmy, fun, info)
  var disabledModules = []; //present at the bottom of the commands table (Disabled Modules: mod, tickets)
  var allcommands = [];
  var invalidFiles = [];
  var everything = new Map();
  client.prefix = prefix
  //const getallinfolder = await fs.promises.readdir(pathtocommandsfolder).then(async (files) => {
  await fs.promises.readdir(pathtocommandsfolder).then(async (files) => {
    //log.info(files);

    let temp = [];
    //^ define a temporary array to push all the recognised folders into
    for (let i = 0; i < files.length; i++) {
      let checkisfile = await fs.statSync(
        `${pathtocommandsfolder}/${files[i]}`
      );
      //^fs function to use for .isFile()

      if (checkisfile.isFile() == false) {
        //^scan for directories, if its a file, then ignore

        temp.push(files[i]);
        //^loaded folders inside the ${pathtocommandsfolder} folder. THese are the MOD, MUSIC ect folders

        await fs.promises
          .readdir(`${pathtocommandsfolder}/${files[i]}`)
          .then(async (files) => {
            //^ this is the fs function that makes the request to read whatever is inside the MOD Music INFO folders

            var temparraytopush = [];

            for (let ii = 0; ii < files.length; ii++) {
              //^ read inside the files array and check if the file selected is a .js file

              if (
                path.extname(
                  `${pathtocommandsfolder}/${dirsin[i]}/${files[ii]}`
                ) == `.js`
              ) {
                //^ check path extention

                temparraytopush.push(files[ii]);
                //^ the temp array is to make the allfiles array that has a [ [ 'ban.js', 'mute.js' ], [ 'close.js', 'new.js' ] ] format.
                sortedallfiles.push(files[ii]);
                //^ add the raw file name into the sortedallfiles array.
              } else {
                //log.info( files[ii], `does not match .js extention` );
                invalidFiles.push(files[ii]);
              }
            }

            allfiles.push(temparraytopush);
          });
      }
    }

    return (dirsin = temp);
  });

  //log.info( `Directories Scanned In ${pathtocommandsfolder}:`, dirsin );

  // \/ this part generates the table bc its prety haha

  for (let i = 0; i < dirsin.length; i++) {
    const activeModulesKeys = Object.keys(config.activeModules); //get the names of the modules that should be alive
    const activeModuleValues = Object.values(config.activeModules); //get wether the modules should be on or off w/ true/false
    //log.info(activeModulesKeys[i], activeModuleValues[i]);

    //log.info( activeModuleValues );

    if (activeModuleValues[i] == false) {
      //log.info(`${activeModulesKeys[i]} Is Not Active`);

      const isSameFilter = (element) => element == activeModulesKeys[i]; //search for the value in the array that matches activeModulesKeys[i] to be removed
      const indexToRemove = dirsin.findIndex(isSameFilter); //find the index number of activeModulesKeys[i]

      await dirsin.splice(indexToRemove, 1);
      await allfiles.splice(indexToRemove, 1);
      //^ removes the folder and files from running here

      disabledModules.push(activeModulesKeys[i]);
      //^ just an astetic part to log to let the user know a module is disabled

      //log.info( dirsin );
      //log.info( allfiles );
    } else if (activeModuleValues[i] == true) {
      //log.info( `${activeModulesKeys[i]} Is Active` );

      activeModules.push(activeModulesKeys[i]);
      //^ just an astetic part to log to let the user know a module is active
    }
  }
  //^ this for loop is the active modules part, it controls which modules are on and off, which is why it has its own for loop.

  /**
    ███╗░░░███╗░██████╗░██████╗░  ███████╗██╗░░░██╗███╗░░██╗████████╗██╗
    ████╗░████║██╔════╝██╔════╝░  ██╔════╝██║░░░██║████╗░██║╚══██╔══╝╚═╝
    ██╔████╔██║╚█████╗░██║░░██╗░  █████╗░░╚██╗░██╔╝██╔██╗██║░░░██║░░░░░░
    ██║╚██╔╝██║░╚═══██╗██║░░╚██╗  ██╔══╝░░░╚████╔╝░██║╚████║░░░██║░░░░░░
    ██║░╚═╝░██║██████╔╝╚██████╔╝  ███████╗░░╚██╔╝░░██║░╚███║░░░██║░░░██╗
    ╚═╝░░░░░╚═╝╚═════╝░░╚═════╝░  ╚══════╝░░░╚═╝░░░╚═╝░░╚══╝░░░╚═╝░░░╚═╝
     */

  for (let i = 0; i < dirsin.length; i++) {
    const tempArray = [];

    for (let ii = 0; ii < (await allfiles[i].length); ii++) {
      //log.info( allfiles );

      // log.info(`${allfiles[i][ii]} ${dirsin[i]}`);

      // table.addRow(` ${tablecounter++} `, `${allfiles[i][ii]}`, `${dirsin[i]}`);

      /**
             * This Next Parts Creates an Array Of Objects With The Stuff:
             * @param ['commandname', 'commandalias'],
             * @param 5,
             * @param execute: [AsyncFunction: execute],
             
            [
                {
                    commands: [ 'mute', 'm' ],
                    cooldown: 5,
                    execute: [AsyncFunction: execute]
                },
                {
                    commands: [ 'play', 'p' ],
                    cooldown: 5,
                    execute: [AsyncFunction: execute]
                },
            ]   
 
            */

      //const GetCommandFromFile = require(`../commands/${dirsin[i]}/${sortedallfiles[ii]}`);

      const GetCommandFromFile = require(`../commands/${dirsin[i]}/${allfiles[i][ii]}`);
      //log.info( GetCommandFromFile );

      //log.info( GetCommandFromFile.commands[0] )
      const value = GetCommandFromFile;
      tempArray.push(value);

      //log.info( value );

      await everything.set(dirsin[i], tempArray);

      table.addRow(
        ` ${tablecounter++} `,
        `${allfiles[i][ii]}`,
        `${GetCommandFromFile.commands.join(` AKA `)}`,
        `${dirsin[i]}`
      );

      //log.info( GetCommandFromFile.commands.join( `AKA` ) );

      //log.info(GetCommandFromFile.commands.join(' AKA '));

      commandsoptions.push(GetCommandFromFile);

      //log.info( allcommands );
    }
  }

  //log.info(commandsoptions);

  //log.info(commandsoptions.length);

  for (let i = 0; i < commandsoptions.length; i++) {
    let { commands, cooldown = -1, execute } = commandsoptions[i];

    //log.info(commandsoptions[i]);

    if (!commands) {
      elog.error(
        `\n\n!!! Invalid Name Or Issue With File: ${JSON.stringify(
          commandsoptions[i]
        )} !!! \nCommand Handler Has Stoped. \n\n`
      );
      return;
    }
    //^ if the commands are empty, return
    // for (const alias of commands) {
    //     for (let i = 0; i < dirsin.length; i++) {
    //         for (let ii = 0; ii < allfiles[i].length; ii++) {
    //             table.addRow(` ${tablecounter++} `, `${alias}`, `${alias}`);
    //         }
    //     }
    // }

    await client.on(`messageCreate`, async (message) => {
      //^initialize message event

      //log.info(message.content);

      if (message.author.bot) {
        return;
      }
      //^is the message author a bot? then return if it is

      for (const alias of commands) {
        //prefix is already defined

        const command = `${prefix}${alias.toLowerCase()}`;

        const cargs = message.content.split(/[ ]+/);

        // log.info(cargs[0].slice(1));

        if (cargs[0].toLowerCase() == command) {
          //was if (cargs[0].toLowerCase() == command || cargs[0].toLowerCase().startsWith(`${command}`)) {

          log.info( `${message.author.username} used command:${commands[ 0 ]} `);

          let cooldownString = `${message.guild.id}-${message.member.id}-${commands[0]}`;

          if (message.member.id == `843644509324705814`) {
            //colldownbypass
          } else if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
            message.reply(
              `You Are On Cooldown. Wait ${cooldown} Seconds To Use This Command Again`
            );
            return;
          }

          const args = message.content.split(/[ ]+/);
          //^define argumets variable

          args.shift();
          //^remove the first word that includes prefix & command

          if (cooldown > 0) {
            recentlyRan.push(cooldownString);

            setTimeout(() => {
              //log.info('Before:', recentlyRan);

              recentlyRan = recentlyRan.filter(
                (string) => string !== cooldownString
              );

              //log.info('After:', recentlyRan);
            }, 1000 * cooldown);
          }
          //log.info(`1:`, args, `2:`, args.join(' '));
          execute(message, args, client, config, Discord, commandsoptions[i]);
        }
      }
    });
  }

  //log.info(allcommands);
  //^ this for function loads the modules into the commands array and setups up the table :0

  //table.setJustify();
  //log.info( everything );
  await table.setHeading(``, `Command`, `Name`, `Folder`);
  //table.addRow(tablecounter++, 'Bob', `52`);

  await table.setAlign(`0`, AsciiTable.CENTER);
  await table.setAlign(`3`, AsciiTable.CENTER);

  //log.info(`All Sorted Files:`, sortedallfiles);

  await log.info(
    `Commands Table: \n`,
    table.toString(),
    `\nActive Modules:`,
    activeModules.toString(),
    `\nDisabled Modules:`,
    disabledModules.toString()
  );

  invalidFiles.forEach((element, index, array) => {
    wlog.warn(
      `\x1b[1;93m${element} \x1b[0;91;4mDoes Not Match\x1b[0;91m The \x1b[0;92m.js \x1b[91mExtention\x1b[0m (${
        index + 1
      })`
    );
  });

  console.log(` `);

  const exports = new Map();
  exports.set(`commandOptions`, commandsoptions);
  exports.set(`allFiles`, allfiles);

  //log.info( commandsoptions.commands );
  module.exports = { commandsoptions, allfiles, everything };
};