import { Injectable } from '@nestjs/common';
import { UserType } from '@/users/types/user.type';

@Injectable()
export class UsersService {
  private usersMockData: Array<Object> = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 25,
    },
    {
      id: 3,
      name: 'Jim Doe',
      age: 35,
    },
    {
      id: 4,
      name: 'Jack Doe',
      age: 28,
    },
    {
      id: 5,
      name: 'Jill Doe',
      age: 32,
    },
  ];
  getUsers() {
    return this.usersMockData;
  }
  createUser(userInput: UserType) {
    this.usersMockData.push(userInput);
    return this.usersMockData;
  }
}
