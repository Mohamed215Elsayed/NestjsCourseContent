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
- Section 4
git push origin --tags