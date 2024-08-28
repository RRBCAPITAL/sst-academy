import { sql } from "@vercel/postgres";

export async function Handler(req, { params }) {

const likes = 100;
const { rows } = await sql`SELECT * FROM posts WHERE likes > ${likes};`;
}