import { Button } from "./ui/button";
import { signOut } from "@/auth";
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirect: true, redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
