---
title: 'CSS Container Queries are finally here'
publishedAt: 2022-07-19
type: note
tags: ['CSS', 'Web Platform']
---

CSS Container Queries let you style elements based on their **parent container's size**, not the viewport. This is a game changer for reusable components.

```css
.card-wrapper {
  container-type: inline-size;
}

.card {
  font-size: 1rem;
}

@container (min-width: 400px) {
  .card {
    font-size: 1.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

Now the card adapts to wherever it's placed — not just the screen width. Browser support is now solid across all modern browsers (Chrome 105+, Firefox 110+, Safari 16+).
