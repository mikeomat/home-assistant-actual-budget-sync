import * as api from '@actual-app/api';
import { BudgetConfig } from './types';

export async function loadBudget(budget: BudgetConfig) {
    console.debug(`Loading budget ${budget.syncId.substring(0, 8)}`);
    if (budget.password) {
        await api.downloadBudget(budget.syncId, { password: budget.password });
    } else {
        await api.downloadBudget(budget.syncId);
    }
}