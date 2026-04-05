import { Body, Inject, Injectable, LoggerService, NotFoundException, Scope } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { APP_NAME, USER_HABITS ,USER_HABITSCOMPLEX,AliasedLoggerService} from './user.constants';

// @Injectable({ scope: Scope.REQUEST})//ين كل المستخدمينRequest → نسخة لكل Request
// @Injectable({ scope: Scope.TRANSIENT})//Transient → نسخة لكل استخدام
// @Injectable({ scope: Scope.DEFAULT})//=@Injectable()//Default → Shared بين كل المستخدمين
@Injectable()
export class UsersService {
    /*########################*/
    constructor(@Inject(APP_NAME) private readonly appName: string,
     @Inject(USER_HABITS) private readonly userHabits: string[],
     @Inject(USER_HABITSCOMPLEX) private readonly userHabitsComplex:string[],
    //  @Inject(AliasedLoggerService)private readonly aliasedProvider:string,
    ) {
        console.log(this.appName);
        console.log(this.userHabits);
        console.log(this.userHabitsComplex);
        // console.log(this.aliasedProvider)
        console.log("app is initailized");
    }
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
