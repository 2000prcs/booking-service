// shuts the memory server down
module.exports = async function() {
  console.log('Teardown mongod');
  await global.__MONGOD__.stop();
};

