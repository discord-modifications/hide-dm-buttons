const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const DMsList = getModule(m => m.default?.displayName == 'ConnectedPrivateChannelsList', false);

module.exports = class HideDMButtons extends Plugin {
   startPlugin() {
      inject('hide-dm-buttons', DMsList, 'default', (args, res) => {
         let Arguments = args[0];
         if (Arguments?.children) {
            Arguments.children = [Arguments?.children?.find(i => i?.toString().includes('"friends"'))];
         }

         return args;
      }, true);

      DMsList.default.displayName = 'ConnectedPrivateChannelsList';
   }

   pluginWillUnload() {
      uninject('hide-dm-buttons');
   }
};