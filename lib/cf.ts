import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { CloudflareEnv } from './types';

export async function getEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as CloudflareEnv;
}