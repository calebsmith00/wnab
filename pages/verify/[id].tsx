import { NextPageContext } from "next";
import jwt from "jsonwebtoken";
import sql from "../../lib/database";

interface JwtPayload {
  userID: string;
}

export default function VerifyPage() {
  return <div></div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const id = ctx.query.id;
  if (!id || typeof id !== "string")
    return {
      props: {},
    };

  try {
    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret) return { props: {} };

    const verified: JwtPayload = jwt.verify(id, secret) as JwtPayload;

    if (!verified || !verified.userID) return { props: {} };

    await sql`UPDATE public.users SET verified = true WHERE id = ${verified.userID}`;
  } catch (e: any) {
    console.log(e.toString());
  }

  return {
    props: {},
  };
}
