import { Pool } from 'pg';

const pool = new Pool({
  user: 'press_start',       
  host: '100.89.127.21',           
  database: 'press_start',   
  password: 'press_start',   
  port: 5432,                  
});

export default pool;