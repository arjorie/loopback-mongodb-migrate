import {BindingKey, CoreBindings} from '@loopback/core';
import {MongoDBMigrateComponent} from './component';
import {IMigrationService, MongoDbBackUpOptions} from './types';

/**
 * Binding keys used by this component.
 */
export namespace MongoDBMigrateComponentBindings {
  export const COMPONENT = BindingKey.create<MongoDBMigrateComponent>(
    `${CoreBindings.COMPONENTS}.MongoDBMigrateComponent`,
  );
  export const MIGRATION_SERVICE = BindingKey.create<IMigrationService>(
    `${CoreBindings.COMPONENTS}.MigrationService`,
  );
  export const MONGODB_BACKUP_OPTIONS = BindingKey.create<MongoDbBackUpOptions>(
    'MONGODB_BACKUP_OPTIONS',
  );
}
