#!/usr/bin/env bash
set -e

echo "▶ Config & bindings"
npx wrangler types

echo "▶ Local KV round-trip"
npx wrangler kv key put __check ok --binding kayak_CMS_KV --local --preview
npx wrangler kv key get __check --binding kayak_CMS_KV --local --preview
npx wrangler kv key delete __check --binding kayak_CMS_KV --local --preview

npx wrangler kv key put __check ok --binding kayak_CMS_KV --local --preview false
npx wrangler kv key get __check --binding kayak_CMS_KV --local --preview false
npx wrangler kv key delete __check --binding kayak_CMS_KV --local --preview false

echo "▶ Local R2 round-trip"
printf ok > /tmp/__check.txt
npx wrangler r2 object put kayak-adventure-gallery/__check.txt --file=/tmp/__check.txt --local
npx wrangler r2 object delete kayak-adventure-gallery/__check.txt --local

echo "✅ Local config OK"