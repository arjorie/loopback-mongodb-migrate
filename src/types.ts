import { Class, Model, Repository } from "@loopback/repository";
import * as path from 'path';

// eslint-disable-next-line
export type RepositoryModules = Record<string, any>;

/**
 * Application interface used for getting repository
 */
export interface Application {
  getRepository(val: Class<Repository<Model>>): Promise<RepositoryModules>;
};


/**
* Interface defining the component's options object
*/
export interface MongoDBMigrateComponentOptions {
  // Add the definitions here
  dataSourceName?: string;
}

/**
* Default options for the component
*/
export const DEFAULT_MONGODB_MIGRATE_OPTIONS: MongoDBMigrateComponentOptions = {
  // Specify the values here
  dataSourceName: 'MigrationDb',
};

/**
 * ExecuteMigrationService interface
 */
export interface IMigrationService {
  migrate(args: string[], repositories: RepositoryModules): Promise<void>;
  generateMigrationFile(filename: string): Promise<void>;
  appendTimestampToFilename(ilename: string, extension: string | null): string;
  sortFiles(toMigrateFiles: string[]): void;
  executeMigration(action: string, repositories: RepositoryModules | null, isTest: boolean, doBackUp: boolean): Promise<void>;
  getRepositories(app: Application, Repositories: object): Promise<RepositoryModules>;
  backupMongoDb(): Promise<boolean>;
}

export type RepoKeyValuePair = Record<string, Class<Repository<Model>>>;

export interface MongoDbBackUpOptions {
  DB_BACKUP_DIR?: string,
  ROOT_DIR?: string,
  DATASOURCE_URL: string,
};

export const DEFAULT_MONGODB_BACKUP_OPTIONS: MongoDbBackUpOptions = {
  DB_BACKUP_DIR: '../db-backup',
  ROOT_DIR: path.resolve('.'),
  DATASOURCE_URL: 'mongodb://127.0.0.1:27017/mongodbName?retryWrites=true&w=majority',
};
