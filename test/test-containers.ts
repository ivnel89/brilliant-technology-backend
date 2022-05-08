import Redis from 'ioredis';
import {
  GenericContainer,
  PostgreSqlContainer,
  StartedTestContainer,
  Wait,
} from 'testcontainers';

export class TestContainers {
  private dbContainer: StartedTestContainer;
  private redisContainer: StartedTestContainer;
  private redisClient;

  private _dbConfig = {
    DB_NAME: "postgres", 
    DB_USERNAME: "postgres", 
    DB_PASSWORD: "test",
    DB_PORT: undefined,
    DB_HOST: undefined
  }
  private _redisConfig = {
    REDIS_HOST: undefined,
    REDIS_PORT: undefined
  }

  get dbConfig(){
    return this._dbConfig;
  }

  get redisConfig(){
    return this._redisConfig;
  }

  async start() {
    const { DB_NAME, DB_USERNAME, DB_PASSWORD } = this._dbConfig;
    this.dbContainer = await new PostgreSqlContainer()
      .withPassword(DB_PASSWORD)
      .withUsername(DB_USERNAME)
      .withDatabase(DB_NAME)
      .withWaitStrategy(
        Wait.forLogMessage('database system is ready to accept connections'),
      )
      .withStartupTimeout(180_000)
      .withExposedPorts(5432)
      .start();

      this.redisContainer = await new GenericContainer('redis')
      .withExposedPorts(6379)
      .withName('redis')
      .withWaitStrategy(Wait.forLogMessage('Ready to accept connections'))
      .start();
  
      this.redisClient = new Redis({
        host: this.redisContainer.getHost(),
        port: this.redisContainer.getMappedPort(6379),
      });

      this._dbConfig.DB_PORT = this.dbContainer.getMappedPort(5432).toString();
      this._dbConfig.DB_HOST = this.dbContainer.getHost();

      this._redisConfig.REDIS_PORT = this.redisContainer.getMappedPort(6379).toString();
      this._redisConfig.REDIS_HOST = this.redisContainer.getHost();
    }

  async stop() {
    await this.dbContainer.stop();
    await this.redisClient.quit();
    await this.redisContainer.stop();
  }
}
