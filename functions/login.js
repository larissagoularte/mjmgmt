import { handleAuthPostRequest } from './auth';

export async function onRequest(context) {
  return await handleAuthPostRequest(context);
}
