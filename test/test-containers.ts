import {
  PostgreSqlContainer,
  StartedTestContainer,
  Wait,
} from 'testcontainers';

export class TestContainers {
  private dbContainer: StartedTestContainer;
  private _dbConfig = {
    DB_NAME: "postgres", 
    DB_USERNAME: "postgres", 
    DB_PASSWORD: "test",
    DB_PORT: undefined,
    DB_HOST: undefined
  }

  get dbConfig(){
    return this._dbConfig;
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
      
      this._dbConfig.DB_PORT = this.dbContainer.getMappedPort(5432).toString();
      this._dbConfig.DB_HOST = this.dbContainer.getHost();

    }

  async stop() {
    await this.dbContainer.stop();
  }
}
