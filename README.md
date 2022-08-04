# loopback-mongodb-migrate

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install MongoDBMigrateComponent using `npm`;

```sh
$ npm install loopback-mongodb-migrate
```

## Basic Use in Code

Configure and load MongoDBMigrateComponent in the application constructor
as shown below.

`project/src/application.ts`
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

Configure in migrate file

`project/src/migrate.ts`
```ts
import {
    IExecuteMigrationService,
    RepositoryModules,
    MongoDBMigrateComponentBindings,
    Application,
} from 'loopback-mongodb-migrate';
import { App } from './application';
import * as Repositories from './repositories';

export async function migrate(args: string[]) {
    const app = new App();
    await app.boot();

    // get migration service
    const migrationService = app
        .getSync<IExecuteMigrationService>(MongoDBMigrateComponentBindings.MIGRATION_SERVICE);

    // get all repositories for migration access
    const repositories: RepositoryModules = await migrationService
        .getRepositories(app as Application, Repositories);

    // execute migration
    await migrationService
        .migrate(args, repositories);

    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0);
}

migrate(process.argv).catch(err => {
    console.error('Cannot migrate database schema', err);
    process.exit(1);
});

```

## Migration Usage

### Create Migration File

To create a migration file, type the following:

```sh
$ npm run migrate create <migration-name>
```
where the `<migration-name>` is the name of the migration file

**Example:** `npm run migrate create initial-data`

migration file will be generated inside `project-folder/src/migrations/`. Note that when running the command `npm run migrate <cmds...>` loopback automatically rebuilds the project. If in case it did not rebuild, you must rebuild it manually.

### Run Migration Up

To run a migration, type the following:

```sh
$ npm run migrate up
```
This will run all migrations that are not yet executed sorted from oldest to latest
Note that this will run only whats inside the `up` method of the migration file

### Run Migration Down

If you have created a query for reverting your previous migration,
make sure to put it inside the `down` function.
_We are still working on running migration `down` even if the migration already executed_

To revert a migration, type the following:

```sh
$ npm run migrate down
```
This will run all migrations that are not yet executed sorted from oldest to latest
Note that this will run only whats inside the `down` method of the migration file

### Run Migration in Test Mode

If you want to run a migration but don't want to mark it as migrated, you can use the `test:true` keyword

```sh
$ npm run migrate up test:true
```
This will run all migrations that are not yet executed sorted from oldest to latest
Note that migrations will not be marked as migrated. Any changes to your database will be executed so be careful and test it to a test database instead.

### Backup Database before running Migration

If you want to backup your database before running a migration, you can use the `backup:true` keyword

```sh
$ npm run migrate up backup:true
```
This backup your database before running the migration.
