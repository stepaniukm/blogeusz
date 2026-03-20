---
title: "TypeScript's `satisfies` operator for type validation without widening"
publishedAt: 2022-07-25
type: note
tags: ['TypeScript']
---

The `satisfies` operator (TS 4.9+) lets you validate that a value matches a type **without changing the inferred type** of the value.

```typescript
type Color = 'red' | 'green' | 'blue';
type Palette = Record<string, Color | [number, number, number]>;

// With `as`: type is widened to Palette, losing specifics
const palette1 = {
  red: [255, 0, 0],
  green: 'green',
} as Palette;

// With `satisfies`: validated against Palette, but retains precise types
const palette2 = {
  red: [255, 0, 0],
  green: 'green',
} satisfies Palette;

// palette2.red is inferred as [number, number, number], not Color | [number, number, number]
palette2.red.at(0); // ✅ works
palette2.green.toUpperCase(); // ✅ works
```

Use `satisfies` whenever you want type-checking without the type narrowing that `as` or explicit annotation brings.
