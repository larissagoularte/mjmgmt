import { onRequestPost } from './auth';

export async function onRequest(context) {
  return await onRequestPost(context);
}
