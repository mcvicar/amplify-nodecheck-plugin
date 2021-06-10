async function run(context) {
  // print out the help message of your plugin
  context.print.info('👋  The Amplify to Node Checker Plugin 👋 ');
  context.print.info('This is a simple plugin to check your javascript syntax before it gets pushed/published');
  context.print.info("It'll try to find all your JS files in backend/function/*/src and run node --check e.g.");
  context.print.info('node --check amplify/backend/function/*/src/*.js` before a push.');
  context.print.info('');
  context.print.info('See https://github.com/mcvicar/amplify-nodecheck-plugin for more details');
}

module.exports = {
  run,
};
