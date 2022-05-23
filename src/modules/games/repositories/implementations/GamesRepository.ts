import { getRepository, Repository } from 'typeorm';

import { Game } from '../../entities/Game';
import { User } from './../../../users/entities/User';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.createQueryBuilder("game")
      .where(`game.title ILIKE '%${param}%'`)
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(id) FROM games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany<User>();
  }
}
