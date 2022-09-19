import {Entity, model, property} from '@loopback/repository';

@model()
export class Migrations extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  filename: string;

  @property({
    type: 'date',
    required: true,
  })
  dateMigrated: string;

  constructor(data?: Partial<Migrations>) {
    super(data);
  }
}

export interface MigrationsRelations {
  // describe navigational properties here
}

export type MigrationsWithRelations = Migrations & MigrationsRelations;
