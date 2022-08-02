import {
  Application,
  bind,
  BindingScope,
  config,
  CoreBindings,
  filterByTag,
  inject
} from "@loopback/core";
import { DefaultCrudRepository, juggler } from "@loopback/repository";
import debugFactory from "debug";
import { MongoDBMigrateComponentBindings } from "../keys";
import { Migrations } from "../models";
import { MongoDBMigrateComponentOptions } from "../types";

const debug = debugFactory("mongodb-migrate:");
debug.enabled = true;

@bind({ scope: BindingScope.APPLICATION })
export class MigrationRepository extends DefaultCrudRepository<
  Migrations,
  typeof Migrations.prototype.id
> {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: Application,
    @inject(filterByTag("datasource"), { optional: true })
    dataSources: juggler.DataSource[] = [],
    @config({ fromBinding: MongoDBMigrateComponentBindings.COMPONENT, optional: true })
    migrationConfig: MongoDBMigrateComponentOptions = {}
  ) {
    let dataSource: juggler.DataSource;

    const { dataSourceName } = migrationConfig;

    if (dataSourceName) {
      debug("Custom datasource name: %s", dataSourceName);

      const bindingKey = `datasources.${dataSourceName}`;

      debug("Datasource binding key: %s", bindingKey);
      try {
        dataSource = app.getSync<juggler.DataSource>(bindingKey);
      } catch {
        throw new Error(`Did not find data source with name ${dataSourceName}`);
      }
    } else {
      dataSource = dataSources[0];
    }

    if (!dataSource) throw new Error("Did not find any data source");

    debug("Datasource used for storing applied migrations: %s", dataSource.name);

    debug("Migration model class name: %s", Migrations.name);

    super(Migrations, dataSource);
  }
}