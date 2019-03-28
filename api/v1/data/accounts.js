const Accounts = [
  {
    id: 1,
    accountNumber: 22399029393,
    createdOn: new Date(),
    owner: 2, // user id
    type: 'Current', // savings or current
    status: 'Active', // draft, active or dormant
    balance: 350.05
  },
  {
    id: 2,
    accountNumber: 22399029393,
    createdOn: new Date(),
    owner: 2, // user id
    type: 'Current', // savings or current
    status: 'Active', // draft, active or dormant
    balance: 1050.55
  },
  {
    id: 3,
    accountNumber: 22399029393,
    createdOn: new Date(),
    owner: 3, // user id
    type: 'Savings', // savings or current
    status: 'Draft', // draft, active or dormant
    balance: 255.55
  },
  {
    id: 4,
    accountNumber: 22399029393,
    createdOn: new Date(),
    owner: 4, // user id
    type: 'Current', // savings or current
    status: 'Dormant', // draft, active or dormant
    balance: 700.75
  }];

export default Accounts;
