## Course Progress

- Section 1 
            ✅ Nest Setup configurations
            ✅ Users Module 
            ✅ CRUD users
            <!-- ###################################### -->
            git tag section-1
            <!-- ###################################### --> 
- Section 2 
            ⏳Pipes(Transformation + Validation)
            Built-in pipes  // ( 9 types)&...that comes  before fields in dtos
            Binding pipes //@Param('id', new ParseUUIDPipe())
            Class validator // Dtos
            Custom pipes //validation.pipe.ts
            Schema based validation //at entity
            Binding validation pipes //we apply at controller
            Global scoped pipes // we apply at main
            The built-in ValidationPipe 
            Transformation use case // we apply at dtos and in ...
            Providing defaults
            <!-- ###################################### -->
            ex:
               @UsePipes(ValidationPipe)//validation pipe on route level
                  <!-- ###################################### -->
            ex:
               @UsePipes(ValidationPipe)//validation pipe on controller level
               <!-- ###################################### -->
            ex:
              Create(@Body(ValidationPipe) CreateUserDto: CreateUserDto): UserEntity {//validation pipes make nest see the rules in dtos
             }
            <!-- ###################################### -->
             ex: 
             in create-user.dto.ts & user.controller.ts
             @Length(3, 150,{groups:['create']})//بنستفيد بردو من group في حته localalization
            @Length(6, 150,{groups:['update']})//علشان تطبق نحذف الglobal pipes and go to route controller  make group
            readonly username: string;
            <!-- ###################################### -->
            ValidationPipe:
                whitelist: true, // يشيل أي field مش موجود في DTO
                forbidNonWhitelisted: true, // يرمي error لو فيه fields زيادة
                transform: true, // مهم لو بتتعامل مع types
            <!-- ###################################### -->
            git tag section-2
            <!-- ###################################### -->
            - Section 3 
            <!-- ###################################### -->
                  Providers
                  Services
                  Dependency injection(DI),(DIC),(IOC)
                  Scopes
                  Custom providers
                  Optional providers
                  Property-based injection
                  Provider registration
                  Manual instantiation
          <!-- ###################################### -->
🧠 أولاً: المشكلة الأساسية (ليه DI أصلاً؟)
تخيل عندك كود زي ده:

class UserService {
  private repo = new UserRepository();
  findAll() {
    return this.repo.findAll();
  }
}
❌ المشكلة:
UserService مربوط (tightly coupled) بـ UserRepository
صعب تعمل:
Testing
Replace implementation
Scale architecture

🔄 الحل: Inversion of Control (IoC)

بدل ما الكلاس هو اللي ينشئ dependencies بنفسه
نخلي حد تاني (Container) هو اللي يدير ده

👉 يعني: "Don't call dependencies… let them be provided to you"

💉 Dependency Injection (DI)

هو طريقة تطبيق IoC
بدل: private repo = new UserRepository();

نكتب: constructor(private repo: UserRepository) {}

🚀 كده Nest هو اللي: ينشئ UserRepository ويحطه في UserService
🏗️ NestJS DI Architecture (تحت الهود)

Nest عنده حاجة اسمها: IoC Container (Dependency Injection Container)
وده مسؤول عن:
إنشاء instances
تخزينها
حقنها في الأماكن المطلوبة
📦 Providers (أهم مفهوم)

أي حاجة Nest يقدر يعمل لها Inject اسمها Provider
مثال:

@Injectable()
export class UserService {}
🔑 إزاي Nest يعرف يعمل Inject؟

عن طريق:
1. @Injectable()
بتقول لـ Nest:
الكلاس ده ممكن يتحقن

2. Reflection (metadata)
Nest بيقرأ constructor:
constructor(private repo: UserRepository)

ويفهم:
محتاج instance من UserRepository

    <!-- ###################################### -->
            git tag section-3
    <!-- ###################################### -->
- Section-4 
        --Providers in Deep
        --constructor-based injection,ex  Constructor(){}
        --providers: ex [UsersService],This called "The Standard Provider"
        --Provider registration
        --Custom providers#
  What happens when your requirements go beyond those offered by Standard providers? Here are a few examples:

  You want to create a custom instance instead of having Nest instantiate (or return a cached instance of) a class
  You want to re-use an existing class in a second dependency
  You want to override a class with a mock version for testing
  Value providers: useValue
 #--Custom providers#
          ---Value providers: useValue
          ---Non-class-based provider tokens
          ---Class providers: useClass
          ---Factory providers: useFactory
          ---Alias providers: useExisting
          ---Non-service based providers
          ---Export custom provider
<!--##########################################-->
          ----async providers
          ----Injection scopes 
                    Provider scope
                    Usage
                    Controller scope
                    Scope hierarchy
                    Request provider
                    Inquirer provider
                    Performance
                    Durable providers
  
<!-- ###################################### -->
🧩 Modules = Scope للـ DI

كل حاجة في Nest شغالة جوه Module:

@Module({
  providers: [UserService, UserRepository],
})
export class UserModule {}

📌 مهم:
أي provider لازم يكون registered في module
🔁 Dependency Graph (شجرة الاعتمادات)

Nest بيبني Graph زي:
UserController
   ↓
UserService
   ↓
UserRepository

وبعدين:

ينشئهم بالترتيب
ويحفظهم في container
🧪 Lifecycle (إزاي instance بيتعمل؟)
Default Scope = Singleton
@Injectable()
export class UserService {}

✔️ بيتعمل instance واحدة بس طول عمر التطبيق

Scopes تانية:
1. Request Scope
@Injectable({ scope: Scope.REQUEST })
instance جديدة لكل request
2. Transient
@Injectable({ scope: Scope.TRANSIENT })
instance جديدة كل مرة يتم inject فيها
🔥 أنواع الـ Injection
1. Constructor Injection (الأشهر)
constructor(private userService: UserService) {}
2. Custom Injection Token

مفيد لما:

مش عايز تربط بكلاس معين
عايز abstraction
{
  provide: 'USER_REPO',
  useClass: UserRepository,
}

Inject:

constructor(@Inject('USER_REPO') private repo: any) {}
3. useValue
{
  provide: 'API_KEY',
  useValue: '123456',
}
4. useFactory (Advanced)
{
  provide: 'DB_CONNECTION',
  useFactory: () => {
    return createConnection();
  },
}
5. useExisting
{
  provide: 'ALIAS_SERVICE',
  useExisting: UserService,
}
🔄 Circular Dependency (مشكلة شهيرة)
UserService → AuthService
AuthService → UserService

💥 يحصل crash

الحل:
constructor(
  @Inject(forwardRef(() => AuthService))
  private authService: AuthService
) {}
🧪 Testing + DI (قوة حقيقية)
const module = await Test.createTestingModule({
  providers: [
    UserService,
    {
      provide: UserRepository,
      useValue: mockRepo,
    },
  ],
}).compile();

🚀 تقدر تستبدل أي dependency بسهولة

🧠 Mental Model مهم جداً

فكر في Nest كأنه:

Runtime System بيبني Objects Graph ويديرها عنك

مش مجرد Framework APIs.

⚠️ أخطاء شائعة
❌ 1. نسيان إضافة provider في module
providers: []
❌ 2. استخدام class بدون @Injectable()
❌ 3. خلط بين interface و injection
constructor(private repo: IUserRepo) {} // ❌

✔️ لازم Token:

constructor(@Inject('IUserRepo') private repo: IUserRepo) {}
🔥 Summary (ركز فيها)
IoC = نقل التحكم للـ container
DI = طريقة حقن dependencies
Providers = أي حاجة Nest يقدر injectها
Module = scope للـ DI
Default = Singleton
تقدر تتحكم في injection بـ tokens و factories
<!-- ###################################### -->
         git tag section-4
         git push origin --tags
 <!-- ####################################-->
 section-5
 <!-- ####################################-->
Interceptors
Basics
Execution context
Call handler
Aspect interception
Binding interceptors
Response mapping
Exception mapping
Stream overriding
More operators
<!-- ####################################-->
🧠 أولاً: يعني إيه Interceptor؟
تخيل request داخل على API:

Request → Controller → Service → Response
الـ Interceptor بيقف في النص كده:

Request → Interceptor → Controller → Service → Interceptor → Response

➡️ يعني يقدر:

يشتغل قبل التنفيذ
ويشتغل بعد التنفيذ
وده مفهوم جاي من حاجة اسمها AOP (Aspect-Oriented Programming)
<!-- ####################################-->
🎯 استخداماته الأساسية

Interceptors بتستخدم في:

✅ قبل التنفيذ
Logging
Authentication tweaks
Measuring time

✅ بعد التنفيذ
تعديل response
إخفاء بيانات (زي password)
format response

✅ advanced
caching
error handling
timeout

<!-- ####################################-->
⚙️ الشكل الأساسي
@Injectable()
export class MyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // قبل
    console.log('Before');

    return next.handle().pipe(
      // بعد
      tap(() => console.log('After')),
    );
  }
}
🔥 أهم جزئين تفهمهم
1. ExecutionContext

ده بيديك معلومات عن:

request
response
handler

مثال:

const req = context.switchToHttp().getRequest();
console.log(req.url);
2. CallHandler
next.handle()

⚠️ دي أهم نقطة:

لو مستدعيتش handle()
→ ال controller مش هيشتغل ❌
لو استدعيتها
→ يكمل عادي ✅
<!-- ####################################-->
RxJS مهم جدًا
map → تعديل response
tap → side effects
catchError → error handling
timeout → timeout

🔥 Real Life Architecture (مهم جدًا)

في المشاريع الكبيرة:

تستخدم Interceptors لـ:
✅ Response format
✅ Logging
✅ Security masking
✅ Performance tracking

🧠 الخلاصة

Interceptors = middleware ذكي جدًا:

قبل	بعد	override
✔️	✔️	✔️
<!-- ######################################-->
.

🧠 أولاً: يعني إيه RxJS؟

RxJS = Reactive Extensions for JavaScript

ببساطة:
👉 مكتبة بتتعامل مع streams (تدفق بيانات) بدل values عادية

🎯 الفرق بين Promise و RxJS
🔹 Promise
const data = await fetchData();
value واحدة بس
async مرة واحدة
🔹 Observable (RxJS)
observable.subscribe(data => console.log(data));
ممكن يطلع أكتر من value
تقدر تتحكم فيه (cancel, retry, transform...)
🔥 أهم حاجة: Observable

ده الأساس في RxJS

import { Observable } from 'rxjs';

const obs = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
✅ تشغيله
obs.subscribe(value => console.log(value));

📌 الناتج:

1
2
3
⚙️ Operators (أهم جزء)

دي functions بتعدل على الـ stream

✅ 1. map (أهم واحد)
import { map } from 'rxjs/operators';

next.handle().pipe(
  map(data => ({ data }))
);

📌 في Nest:

{
  "data": {...}
}
✅ 2. tap (لـ logging)
import { tap } from 'rxjs/operators';

tap(() => console.log('Done'))

📌 بيعمل side effect بس

✅ 3. catchError
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

catchError(err => throwError(() => new Error('Custom error')))
✅ 4. timeout
import { timeout } from 'rxjs/operators';

timeout(5000)

📌 يرمي error لو الطلب طول

✅ 5. of (create observable سريع)
import { of } from 'rxjs';

return of({ message: 'cached' });
🔥 أهم استخدام RxJS في NestJS
👇 في Interceptors
intercept(context: ExecutionContext, next: CallHandler) {
  return next.handle().pipe(
    map(data => ({
      success: true,
      data,
    })),
  );
}
🧩 Flow مهم تفهمه
next.handle() → Observable → pipe() → operator → response
🚨 نقطة مهمة جدًا
next.handle()

➡️ دي بترجع Observable
مش data مباشرة

🔥 مثال واقعي (كاش)
intercept(context: ExecutionContext, next: CallHandler) {
  const isCached = true;

  if (isCached) {
    return of({ data: 'cached response' });
  }

  return next.handle();
}
💡 ليه NestJS بيستخدم RxJS؟

لأنه بيسمح بـ:

streaming
التحكم في async flows
chaining logic بسهولة
⚠️ هل لازم تتعمق في RxJS؟

بصراحة 👇

❌ مش محتاج تبقى expert
✅ بس لازم تفهم:

Observable
pipe()
map
tap
catchError
🔥 الخلاصة
RxJS = async powerful tool
Observable = stream
pipe = pipeline
operators = transformations
 <!-- ####################################-->
git tag section-5
git push origin --tags
 <!-- ####################################-->
