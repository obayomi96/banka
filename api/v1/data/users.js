const UsersData = [
  {
    id: 1,
    email: 'martinsoluwaseun47@gmail.com',
    firstName: 'Martins',
    lastName: 'Obayomi',
    password: 'user1pw',
    type: 'admin', // client or staff
    isAdmin: true // must be a staff user account
  },
  {
    id: 2,
    email: 'anthony.a@gmail.com',
    firstName: 'Anthony',
    lastName: 'Olanrewaju',
    password: 'user2pw',
    type: 'staff', // client or staff
    isAdmin: false // must be a staff user account
  },
  {
    id: 3,
    email: 'franca@gmail.com',
    firstName: 'Fransisca',
    lastName: 'Amoke',
    password: 'user3pw',
    type: 'client', // client or staff
    isAdmin: false // must be a staff user account
  },
  {
    id: 4,
    email: 'emmatexi@gmail.com',
    firstName: 'Emmanuel',
    lastName: 'Ebuka',
    password: 'user4pw',
    type: 'client', // client or staff
    isAdmin: false // must be a staff user account
  }];

export default UsersData;
