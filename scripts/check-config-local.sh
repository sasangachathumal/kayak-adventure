#!/usr/bin/env bash
set -e

echo "▶ Checking local .dev.vars..."
if [ ! -f ".dev.vars" ]; then
  echo "❌ Error: .dev.vars file is missing in the project root."
  echo "   Please create it using .dev.vars.example as a template."
  exit 1
fi

if ! grep -q "ADMIN_SECRET=" .dev.vars; then
  echo "❌ Error: ADMIN_SECRET is missing in .dev.vars"
  exit 1
fi

if ! grep -q "AUTH_SECRET=" .dev.vars; then
  echo "❌ Error: AUTH_SECRET is missing in .dev.vars"
  exit 1
fi
echo "  .dev.vars secrets found OK"

echo "▶ Checking wrangler.jsonc..."
if [ ! -f "wrangler.jsonc" ]; then
  echo "❌ Error: wrangler.jsonc is missing"
  exit 1
fi

echo "▶ Generating local Worker types..."
npx wrangler types

echo "✅ All local configuration checks passed"
