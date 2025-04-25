export class User {
    constructor(
      public id: string,
      public name: string,
      public email: string,
    ) {
      if (!name || email.length < 5) throw new Error('Invalid name o email');
    }
  }
  