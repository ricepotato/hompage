import { getSession } from "@/lib/session";

export async function UserDisplay() {
  const session = await getSession();
  const username = session?.username ?? "";

  return (
    <div>
      <p>{`username: ${username}`}</p>
    </div>
  );
}
