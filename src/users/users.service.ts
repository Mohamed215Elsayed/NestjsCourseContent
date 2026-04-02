import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    /*########################*/
    private readonly users: UserEntity[] = [];
    /*########################*/
    findUsers(): UserEntity[] {
        return this.users;
    }
    /*########################*/
    findUserById(id: string): UserEntity {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    /*########################*/
    createUser(@Body() createUserDto: CreateUserDto): UserEntity {
        const newUser: UserEntity = {
            ...createUserDto,
            id: uuidv4()
        };
        this.users.push(newUser);
        return newUser;
    }
    /*########################*/
    updateUser(id: string, @Body() updateUserDto: UpdateUserDto): UserEntity {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updateUserDto,
        };

        return this.users[userIndex];
    }
    /*########################*/
    deleteUser(id: string): void {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(userIndex, 1);
    }
    /*########################*/
}
