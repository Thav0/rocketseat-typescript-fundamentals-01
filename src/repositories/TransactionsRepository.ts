import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(value => value.type === 'income')
      .reduce((previousItem, currentItem) => {
        return previousItem + currentItem.value;
      }, 0);

    const outcome = this.transactions
      .filter(value => value.type === 'outcome')
      .reduce((previousItem, currentItem) => {
        return previousItem + currentItem.value;
      }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const { total } = this.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('teste');
    }
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
