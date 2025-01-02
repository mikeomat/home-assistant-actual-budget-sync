import * as api from '@actual-app/api';
import * as categories from './categories';
import * as  transactions from './transactions';
import { AppConfig } from './types';

const config = require('../config/config.json') as AppConfig;
start();

async function initialize() {
  await api.init({
    // Budget data will be cached locally here, in subdirectories for each file.
    dataDir: './data',
    // This is the URL of your running server
    serverURL: config.server.url,
    // This is the password you use to log into the server
    password: config.server.password
  });
}

async function shutdown() {
  await api.sync();
  await api.shutdown();
}

async function start() {
  await initialize();

  for (const syncConfig of config.sync) {
    console.info(`Started syncing ${syncConfig.name}`);
    try {
      const fromBudget = config.budgets[syncConfig.fromBudget];
      const toBudget = config.budgets[syncConfig.toBudget];

      if (syncConfig.categories.enable) {
        await categories.syncCategories(fromBudget, toBudget, syncConfig);
      } else {
        console.info('Skipping categories sync');
      }

      if (syncConfig.transactions.enable) {
        await transactions.syncTransactions(fromBudget, toBudget, syncConfig)
      } else {
        console.info('Skipping transactions sync');
      }
    
    } catch (e) {
      console.error(e);
    }
    console.info(`Finished syncing ${syncConfig.name}`);
  }

  await shutdown();
}