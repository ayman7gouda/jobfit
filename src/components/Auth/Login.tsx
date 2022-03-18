import { signIn } from 'next-auth/react';

export const Login = ({ csrfToken }: { csrfToken: string }) => (
  <form
    method="post"
    onSubmit={(e) => {
      e.preventDefault();
      signIn("credentials", {
        username: "jsmith",
        password: "1234",
      });
    }}
    // action="/api/auth/callback/credentials"
  >
    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    <label>
      Username
      <input name="username" type="text" />
    </label>
    <br />
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <br />
    <button type="submit">Sign in</button>
  </form>
);
