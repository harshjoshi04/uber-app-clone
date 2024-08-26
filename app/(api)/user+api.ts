import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE}`);
    const { name, email, clerk_id } = await req.json();

    if (!name || !email || !clerk_id)
      return Response.json(
        { error: "Missing Required field " },
        { status: 400 }
      );
    const response =
      await sql`INSERT INTO users(name,email,clerk_id) values(${name},${email},${clerk_id})`;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
