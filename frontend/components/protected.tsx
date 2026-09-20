import { logoutAction } from "@/actions/login";
import { Button } from "./ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
