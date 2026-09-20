import { UserDisplay } from "@/components/user";
import { LogoutButton } from "@/components/protected";

export default async function Page() {
  return (
    <main>
      <h1>protected</h1>
      <div>
        <UserDisplay />
      </div>
      <div>
        <LogoutButton />
      </div>
    </main>
  );
}
