const ServiceRouter = artifacts.require("ServiceRouter");

contract('ServiceRouter', async (accounts) => {
  
  it('should set the publisher\'s name', async () => {
    const instance = await ServiceRouter.deployed();
    const name = await instance.publisher.call();
    assert.equal(name, 'Robby', "instance publisher should be ServicePublisher");
  });

  it('should allow the owner to add a service address entry', async () => {
    const instance = await ServiceRouter.deployed();
    await instance.addService(accounts[0], 'v2');
    assert.equal(await instance.getServiceAddress('v2'), accounts[0], 'address of v2 entry should be set to the provided address');
  });

  it('should allow the owner to overwrite a service address entry', async () => {
    const instance = await ServiceRouter.deployed();
    await instance.addService(accounts[1], 'v2');
    assert.strictEqual(await instance.getServiceAddress('v2'), accounts[1], 'address of v2 entry should be set to the provided address');
    assert.notStrictEqual(await instance.getServiceAddress('v2'), accounts[0], 'address of v2 entry should no longer be equal to address[0]');
  })

  it('should error if a non-owner attempts to add a service', async () => {
    const instance = await ServiceRouter.deployed();
    try {
      await instance.addService(accounts[3], 'v3', {from: accounts[1]});
      throw new Error('expected error didn\'t throw')
    } catch (error) {
      assert(error.message.includes('only contract owner can add a new service address'), 'error should have included "only contract owner can add a new service address"')
    }
  })


  // it('should send coin correctly', async () => {
  //   const instance = await ServiceRouter.deployed();

  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];

  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await instance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await instance.getBalance.call(accountTwo)).toNumber();

  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await instance.sendCoin(accountTwo, amount, { from: accountOne });

  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await instance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await instance.getBalance.call(accountTwo)).toNumber();


  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});
