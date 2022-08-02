# mongodb-migrate

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install MongoDBMigrateComponent using `npm`;

```sh
$ [npm install | yarn add] mongodb-migrate
```

## Basic Use

Configure and load MongoDBMigrateComponent in the application constructor
as shown below.

```ts
import {MongoDBMigrateComponent, MongoDBMigrateComponentOptions, DEFAULT_MONGODB_MIGRATE_OPTIONS} from 'mongodb-migrate';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts: MongoDBMigrateComponentOptions = DEFAULT_MONGODB_MIGRATE_OPTIONS;
    this.configure(MongoDBMigrateComponentBindings.COMPONENT).to(opts);
      // Put the configuration options here
    });
    this.component(MongoDBMigrateComponent);
    // ...
  }
  // ...
}
```
