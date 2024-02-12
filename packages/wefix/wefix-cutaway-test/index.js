import { Client } from 'pg';

async function main(event) {
  const client = new Client({
    user: 'wefix_pg_db',
    host: '142.93.246.166',
    database: 'wefix_database',
    password: 'Gvxt*ScDY5',
    port: 5432,
  });

  try {
    await client.connect();

    const zip = event.digit;
    const query = 'SELECT area FROM "ZIP" z WHERE zip = $1';
    const values = [zip];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const area = result.rows[0].area;
      const response = { area };
      return {
        body: response,
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    } else {
      const response = { "area": "Invalid or unknown ZIP" };
      return {
        body: response,
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      body: { "error": "Internal server error" },
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } finally {
    await client.end();
  }
}

export { main };
