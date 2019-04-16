const UsersData = [
  {
    id: 1,
    email: 'martinsoluwaseun47@gmail.com',
    firstname: 'Martins',
    lastname: 'Obayomi',
    password: 'user1pw',
    type: 'staff', // client or staff
    isAdmin: true // must be a staff user account
  },
  {
    id: 2,
    email: 'anthony.a@gmail.com',
    firstname: 'Anthony',
    lastname: 'Olanrewaju',
    password: 'user2pw',
    type: 'staff', // client or staff
    isAdmin: false // must be a staff user account
  },
  {
    id: 3,
    email: 'franca@gmail.com',
    firstname: 'Fransisca',
    lastname: 'Amoke',
    password: 'user3pw',
    type: 'client', // client or staff
    isAdmin: false // must be a staff user account
  },
  {
    id: 4,
    email: 'emmatexi@gmail.com',
    firstname: 'Emmanuel',
    lastname: 'Ebuka',
    password: 'user4pw',
    type: 'client', // client or staff
    isAdmin: false // must be a staff user account
  }];

export default UsersData;
