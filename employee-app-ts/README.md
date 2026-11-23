# Employee Management App: TypeScript Migration

## 1. Setup (Requirements 1–3)
```bash
npm install --save-dev typescript @types/react @types/react-dom
npx tsc --init          # creates tsconfig.json
```
Conversion steps: rename `.js` → `.ts` and `.jsx` → `.tsx`, then fix errors file by file (types first, utils, services, then components).
Run `npm run typecheck` (`tsc --noEmit`) until there are zero errors.

## 2. Key tsconfig.json options
| Option | Why |
|---|---|
| `strict: true` | Enables `noImplicitAny`, `strictNullChecks`, etc. |
| `jsx: "react-jsx"` | Lets `.tsx` files compile JSX without importing React |
| `noUnusedLocals/Parameters` | Catches dead code |
| `noImplicitReturns` | Every code path must return |
| `isolatedModules` | Needed for Vite/Babel-style bundlers; requires `import type` |
| `include: ["src"]` | Only compile source files |

## 3. Requirements map
| # | Requirement | Where |
|---|---|---|
| 4 | Employee interface | `src/types.ts` |
| 5 | Department interface | `src/types.ts` |
| 6 | Types for employee functions | `AddEmployeeFn`, `UpdateEmployeeFn`, … in `types.ts` |
| 7 | Param and return types | every function in `employeeService.ts`, `utils.ts` |
| 8 | Union for status | `EmployeeStatus = "active" \| "on-leave" \| "terminated"` |
| 9 | Reusable aliases | `ID`, `ISODateString`, `Predicate<T>`, `Comparator<T>`, `NewEmployee`, `EmployeeUpdate` |
| 10 | Optional properties | `phone?`, `address?`, `Department.location?`, optional `department` prop |
| 11 | Generic utilities | `findById`, `groupBy`, `sortBy`, `countWhere`, `nextId` in `utils.ts` |
| 12 | No unnecessary `any` | `unknown` + type guard in `parseEmployees` / `isEmployee` |
| 13 | Type narrowing | `describeStatus` (switch + `never`), `validateEmployee` (`Result<T>` discriminated union), `isEmployee`, `main.tsx` null check, `address &&` in card |
| 14 | Zero compile errors | `npm run typecheck` passes |

## 4. Concepts used (quick reference)
- **Type inference**: `const activeCount = countWhere(...)` is inferred as `number`.
- **Explicit annotations**: function params and exported return types.
- **Union vs intersection**: `EmployeeStatus | "all"` (union); intersection example: `type EmployeeWithDept = Employee & { department: Department }`.
- **Interface vs type**: use `interface` for object shapes (extendable), `type` for unions, function types and utility compositions.
- **Enums and alternatives**: we used a string-literal union instead of `enum` because it has no runtime cost, works with plain JSON, and gives the same autocomplete. Use `as const` objects if you need runtime values:
  ```ts
  const STATUS = { Active: "active", OnLeave: "on-leave" } as const;
  type Status = typeof STATUS[keyof typeof STATUS];
  ```
- **`any` vs `unknown`**: `any` turns off checking; `unknown` forces you to narrow before use (see `parseEmployees`).
- **Type assertions** (`as`): used sparingly, e.g. `e.target.value as Employee["status"]`. An assertion is a promise to the compiler, not a runtime check, so prefer type guards.
- **Props typing**: every component has an `XxxProps` interface.

## 5. Benefits of TypeScript in larger applications
1. **Bugs caught at compile time**: typos (`emp.slary`), wrong argument types, and `undefined` access are flagged before the app runs.
2. **Self-documenting code**: `Employee` and `Department` describe the data shape; new developers don't have to guess what an object contains.
3. **Safer refactoring**: rename a field or add a status and the compiler lists every place that breaks (the `never` check in `describeStatus` forces you to handle new statuses).
4. **Better tooling**: autocomplete, inline docs, go-to-definition and rename-symbol work reliably.
5. **Safer component contracts**: props are checked at every call site, so passing the wrong prop or forgetting a required one fails the build.
6. **Explicit handling of null/undefined**: `strictNullChecks` forces you to deal with optional data (`department?.name ?? "Unassigned"`).
7. **Easier teamwork**: types act as a contract between developers, between frontend and API, and between modules.
8. **Scales with the codebase**: the bigger the project, the more value from automated checking instead of manual testing or memory.

**Trade-offs:** a build step, a learning curve, and some extra code. Types disappear at runtime, so external data (APIs, localStorage) still needs runtime validation (type guards or libraries like Zod).
