import * as api from '@actual-app/api';
import { BudgetConfig } from './types';

export async function loadBudget(budget: BudgetConfig) {
    console.debug(`Loading budget`);
    if (budget.password) {
        await api.downloadBudget(budget.syncId, { password: budget.password });
    } else {
        await api.downloadBudget(budget.syncId);
    }
    console.debug(`Budget loaded`);
}