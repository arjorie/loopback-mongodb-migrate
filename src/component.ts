import { ExecuteMigrationService } from './services';
import {
  Component,
  bind,
  ContextTags,
  CoreBindings,
  Application,
  inject,
  config,
} from '@loopback/core';
import { RepositoryComponent } from "@loopback/repository";
import { MongoDBMigrateComponentBindings } from './keys'
import { Migrations } from "./models";
import { MigrationRepository } from './repositories';
import { DEFAULT_MONGODB_BACKUP_OPTIONS, MongoDbBackUpOptions } from './types';

// Configure the binding for MongoDBMigrateComponent
@bind({ tags: { [ContextTags.KEY]: MongoDBMigrateComponentBindings.COMPONENT.key } })
export class MongoDBMigrateComponent implements Component, RepositoryComponent {
  models = [Migrations];
  repositories = [MigrationRepository];
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config()
    options: MongoDbBackUpOptions = DEFAULT_MONGODB_BACKUP_OPTIONS,
  ) {
    this.application
      .bind(MongoDBMigrateComponentBindings.MONGODB_BACKUP_OPTIONS)
      .to(options);

    this.application
      .bind(MongoDBMigrateComponentBindings.MIGRATION_SERVICE)
      .toClass(ExecuteMigrationService);
  }
}
