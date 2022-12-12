import { createPool, Pool } from "mariadb";

let globalPool: Pool | undefined = undefined;

export async function db(): Promise<Pool> {
  if (globalPool) {
    return globalPool;
  }

  globalPool = await createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "wnab",
    connectionLimit: 10,
  });

  return globalPool;
}
