import { UserDisplay } from "@/components/user";
import { LogoutButton } from "@/components/protected";
import { getSessionToken } from "@/lib/session";
import { fetchProtectedData } from "@/lib/backend";

export default async function Page() {
  const token = await getSessionToken();
  const data = token ? await fetchProtectedData(token) : null;

  return (
    <main>
      <h1>protected</h1>
      <div>
        <UserDisplay />
      </div>
      <div>
        {data ? (
          <>
            <p>{data.message}</p>
            <ul>
              {data.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Failed to load protected data.</p>
        )}
      </div>
      <div>
        <LogoutButton />
      </div>
    </main>
  );
}
