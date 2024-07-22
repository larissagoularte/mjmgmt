import { sha256, getCookieKeyValue } from './utils';
import { CFP_COOKIE_MAX_AGE, CFP_COOKIE_KEY } from './constants';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const { pathname, searchParams } = url;
  const error = searchParams.get('error');
  const cookie = request.headers.get('cookie') || '';
  const cookieKeyValue = await getCookieKeyValue(env.CFP_PASSWORD);

  if (cookie.includes(cookieKeyValue) || !env.CFP_PASSWORD) {
    // Correct hash in cookie or no password set.
    return await context.next();
  } else {
    // No cookie or incorrect hash in cookie. Redirect to login.
    return new Response(getTemplate({ redirectPath: pathname, withError: error === '1' }), {
      headers: {
        'content-type': 'text/html'
      }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const password = formData.get('password');
  const redirect = formData.get('redirect') || '/';
  const hashedPassword = await sha256(password);
  const hashedCfpPassword = await sha256(env.CFP_PASSWORD);

  if (hashedPassword === hashedCfpPassword) {
    // Valid password. Redirect to home page and set cookie with auth hash.
    const cookieKeyValue = await getCookieKeyValue(env.CFP_PASSWORD);

    return new Response('', {
      status: 302,
      headers: {
        'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
        'Cache-Control': 'no-cache',
        'Location': redirect
      }
    });
  } else {
    // Invalid password. Redirect to login page with error.
    return new Response('', {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache',
        'Location': `${redirect}?error=1`
      }
    });
  }
}

function getTemplate({ redirectPath, withError }) {
  return `
    <!doctype html>
    <html lang="en" data-theme="dark">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Password Protected Site</title>
        <meta name="description" content="This site is password protected.">
        <link rel="shortcut icon" href="https://picocss.com/favicon.ico">
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
        <style>
          body > main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: calc(100vh - 7rem);
            padding: 1rem 0;
            max-width: 600px;
          }
          .error {
            background: white;
            border-radius: 10px;
            color: var(--del-color);
            padding: 0.5em 1em;
          }
          h2 { color: var(--color-h2); }
        </style>
      </head>
      <body>
        <main>
          <article>
            <hgroup>
              <h1>Password</h1>
              <h2>Please enter your password for this site.</h2>
            </hgroup>
            ${withError ? `<p class="error">Incorrect password, please try again.</p>` : ''}
            <form method="post" action="/api/login">
              <input type="hidden" name="redirect" value="${redirectPath}" />
              <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required autofocus>
              <button type="submit" class="contrast">Login</button>
            </form>
          </article>
        </main>
      </body>
    </html>
  `;
}
