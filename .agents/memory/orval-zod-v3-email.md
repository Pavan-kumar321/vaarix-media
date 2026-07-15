---
name: Orval zod codegen incompatible with format:email under zod v3
description: OpenAPI `format: email` fields break the orval-generated zod client when the workspace pins zod v3.
---

Orval's zod client generator (v8.21) emits `zod.email()` as a top-level free function call for
string fields with `format: email`. That free-function form only exists in zod v4's API surface.
This workspace's catalog pins `zod: ^3.25.76`, so `import * as zod from 'zod'` resolves to the v3
namespace, and `zod.email is not a function` fails `tsc --build` right after codegen.

**Why:** discovered while building the Vaarix Media lead-capture form — the OpenAPI spec had
`email: { type: string, format: email }`, and `pnpm --filter @workspace/api-spec run codegen`
failed at the `typecheck:libs` step with `Property 'email' does not exist on type ... "zod"`.

**How to apply:** when writing an OpenAPI spec for this workspace's orval+zod codegen pipeline,
do not use `format: email` (or likely other `format:`-driven zod method shortcuts that orval maps
to v4-only free functions). Use a plain `type: string` (optionally `minLength: 1`) and, if runtime
email validation is needed, add it by hand in the route handler or client form schema instead of
relying on the generated zod schema.
