

## Installation

```bash
$  nest new project-name
```

## Running the app

```bash

# watch mode
$ yarn run start:dev

```

## Project SetUp

#Add to main.ts
```bash
app.enableCors();
app.setGlobalPrefix('api');

```

## Database SetUp

#Add to main.ts
```bash
 yarn add -D prisma
 yarn add -D @prisma/client
npx prisma init



```

#Add to .env
 ```bash

 DATABASE_URL="mysql://root:@localhost:3306/nest"

 ```


#Add to schema.prisma
 ```bash


datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}


model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
 ```



##Config setup:

```bash
yarn add @nestjs/config
```
#Add to app.module.ts in modules
```bash
ConfigModule.forRoot({isGlobal: true})
```

##Create database Module:

```bash

nest g module database
nest g service database

```

# In database.sertice.ts
```bash

export class DatabaseService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }
}



```

## in database.module.ts add:
@Global() 





##Authentication using JWT

```bash

 nest g module auth
 nest g service auth
 nest g controller auth

 nest g module users
 nest g service users
 ```

##Resetting Migration tables

```bash
# delete all the migrations from prisma folder

npx prisma migrate dev --name init


 ```
