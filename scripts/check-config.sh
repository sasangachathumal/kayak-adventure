#!/usr/bin/env bash
set -e

echo "▶ Config & bindings"
npx wrangler types
npx wrangler deploy --dry-run

echo "▶ KV round-trip"
npx wrangler kv key put __check ok --binding kayak_CMS_KV --remote --preview false
test "$(npx wrangler kv key get __check --binding kayak_CMS_KV --remote --preview false)" = "ok" && echo "  KV read OK"
npx wrangler kv key delete __check --binding kayak_CMS_KV --remote --preview false

echo "▶ R2 round-trip"
printf ok > /tmp/__check.txt
npx wrangler r2 object put kayak-adventure-gallery/__check.txt --file=/tmp/__check.txt --remote
npx wrangler r2 object get kayak-adventure-gallery/__check.txt --file=/tmp/__out.txt --remote
npx wrangler r2 object delete kayak-adventure-gallery/__check.txt --remote
echo "  R2 read/write OK"

echo "▶ Secrets (names only)"
npx wrangler secret list

echo "✅ All config checks passed"