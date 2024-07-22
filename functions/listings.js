import { handleAuthRequest } from './auth';

export async function onRequest(context) {
  const response = await handleAuthRequest(context);
  if (response) {
    return response;
  }

  // Your logic for handling the listings request
  return new Response('List of listings', { status: 200 });
}
