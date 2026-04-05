import { Injectable, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { APP_NAME, USER_HABITS, USER_HABITSCOMPLEX,AliasedLoggerService } from "./user.constants";
//################
class mockUsersService {
  /* mock implementation*/
  findUsers() {
    return ["user 1", "user 2"]
  }
};
//################
abstract class ConfigService {
  //abstract logic
}
class DevelopmentConfigService extends ConfigService {
  //implemention
}
class ProductionConfigService extends ConfigService { }
//################
@Injectable()
class USER_HABITS_Factory {
  getHabits(): string[] {
    return ['eat', "sleep", "married", "code complex fn"]
  }
}
//##################
@Injectable()
class LoggerService {
  /* implementation details */
  constructor(private readonly usersService:UsersService){}
}
//Alias providers: useExisting
const loggerAliasProvider = {
  provide: AliasedLoggerService,
  useExisting: LoggerService,
};
//################
//ex asynchronous providers.
// The syntax for this is to use async/await with the useFactory
@Injectable()
class DatabaseConnection{
  async ConnectToDB():Promise<string>{
    return await Promise.resolve("DB conectted successfully");
  }
}
//##################
@Module({
  imports: [],
  controllers: [UsersController],
  // ####################Provider registration []
  providers: [
    UsersService,
    //################
    USER_HABITS_Factory,
    //################
    LoggerService,//can be accessed by the class or the alias
    loggerAliasProvider,
    //################
    DatabaseConnection,
    //################
    //custom provider (Value providers: useValue)
    {
      provide: APP_NAME,
      useValue: "Nest Demo API",//String Token / Injection Token
    },
    //################
    //custom provider (class providers: useClass)
    // الشكل ده مفيد لما تبدأ تعمل abstraction أو swapping implementations
    // its example also on "Non-service based providers"
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    //################
    //Factory based  Provider simple fn
    {
      provide: USER_HABITS,
      useFactory: () => ['eat', "sleep", "married", "code simple fn"]
    },
    //################
    //Factory based  Provider complex fn + async provider
    {
      provide: USER_HABITSCOMPLEX,
      useFactory: async(userHabitsInstance: USER_HABITS_Factory,dbConn:DatabaseConnection) =>{
        const dbStatus = await dbConn.ConnectToDB();
        console.log(dbStatus)
        return userHabitsInstance.getHabits();
      },
      inject: [USER_HABITS_Factory,DatabaseConnection]//providerName
    },
    //################
  ],
  exports: [USER_HABITS],//Export custom provider token
  
})
//################
export class UsersModule { }
//################

