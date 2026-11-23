import type { Comparator, ID, Predicate, SortDirection } from "./types";

/** Generic: find an item by id. */
export function findById<T extends { id: ID }>(items: T[], id: ID): T | undefined {
  return items.find((item) => item.id === id);
}

/** Generic: group items by a key. */
export function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/** Generic: sort by a property without mutating the input. */
export function sortBy<T, K extends keyof T>(
  items: T[],
  key: K,
  direction: SortDirection = "asc"
): T[] {
  const factor = direction === "asc" ? 1 : -1;
  const cmp: Comparator<T> = (a, b) => {
    const x = a[key];
    const y = b[key];
    if (x < y) return -1 * factor;
    if (x > y) return 1 * factor;
    return 0;
  };
  return [...items].sort(cmp);
}

/** Generic: count items matching a predicate. */
export function countWhere<T>(items: T[], predicate: Predicate<T>): number {
  return items.filter(predicate).length;
}

/** Generic: next id for any list of id-bearing items. */
export function nextId<T extends { id: ID }>(items: T[]): ID {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;
}

/** Narrowing helper: unknown -> string[] */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}
