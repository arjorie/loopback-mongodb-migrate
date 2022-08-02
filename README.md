# loopback-mongodb-migrate

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install MongoDBMigrateComponent using `npm`;

```sh
$ [npm install | yarn add] loopback-mongodb-migrate
```

## Basic Use

Configure and load MongoDBMigrateComponent in the application constructor
as shown below.

```ts
import { MongoDBMigrateComponent, MongoDBMigrateComponentBindings } from 'loopback-mongodb-migrate';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    this.configure(MongoDBMigrateComponentBindings.COMPONENT).to({
      DB_BACKUP_DIR: <MONGODB_BACKUP_DIR>,
      DATASOURCE_URL: <MONGODB_URL>,
    });
    this.component(MongoDBMigrateComponent);
    // ...
  }
  // ...
}
```
