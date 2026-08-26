# ⛏ Craftable — Minecraft Recipe Wordle

Guess the Minecraft crafting recipe in 10 attempts!
Like Wordle, but for a 3×3 crafting table.

A fully static site — no server, no database, no build step. Every recipe
ships to the browser and all guess-checking runs client-side, so it can be
hosted anywhere that serves static files, for free.

---

## 📁 Project Structure

```
minecraft-wordle/
├── index.html                 ← Game UI
├── style.css                  ← Minecraft-themed styling
├── recipes-data.js            ← Generated item + recipe data (do not hand-edit)
├── script.js                  ← Game logic, rendering, interactions
├── recipes.py                 ← Maintained source of truth for recipes.js
├── generate_recipes_data.py   ← Regenerates recipes-data.js from recipes.py
├── assets/items/               ← Item icon images
└── README.md
```

---

## 🚀 Running it

There's nothing to install or start. Any static file server works:

```bash
cd minecraft-wordle
python -m http.server 8080
```

Then open http://localhost:8080. Or just double-click `index.html` — it
works directly from disk too (`file://`), since there's no backend to reach.

---

## 🎮 How to Play

1. The **target item** is shown at the top — figure out its crafting recipe.
2. Click a **slot** in the 3×3 grid to select it.
3. Click an **item** from the inventory to place it in the selected slot.
4. Once your arrangement matches a real recipe, hit **Craft & Submit**.
5. Colour feedback appears on each slot:

| Colour | Meaning |
|--------|---------|
| 🟩 **Green** | Correct item in the correct spot in the shape |
| 🟨 **Yellow** | Item IS in the recipe, but in the wrong spot |
| ⬛ **Grey** | Item is not used in this recipe |

Matching is translation-invariant, same as real Minecraft: a shape like the
Crafting Table's 2×2 block counts as correct in any of its 4 valid corners
of the grid, not just one fixed position.

6. You have **10 attempts**. A new recipe unlocks every day (at your local
   midnight, same as Wordle).

---

## ➕ Adding New Recipes

Recipes and items are maintained in `recipes.py` (comments, categories,
readable dict literals), **not** in `recipes-data.js` directly — that file
is generated and gets overwritten.

1. Edit `recipes.py`. Each recipe looks like:

   ```python
   {
       "id": 47,
       "result": "Bookshelf",
       "result_desc": "Used for enchanting.",
       "grid": [
           "oak_planks", "oak_planks", "oak_planks",
           "wool",       "wool",       "wool",
           "oak_planks", "oak_planks", "oak_planks",
       ],
   },
   ```

   The `grid` is a flat list of 9 item IDs in row-major order:
   ```
   0 1 2
   3 4 5
   6 7 8
   ```
   Use `"air"` for empty slots. A guardrail rejects any recipe whose grid is
   identical to another's — this fails loudly instead of shipping an
   unguessable puzzle.

2. Regenerate the shipped data file:

   ```bash
   python generate_recipes_data.py
   ```

New items need an icon — see `script.js`'s `ITEM_IMAGES` map and
`assets/items/Minecraft_Items_latest_AllVisible/` for the icon pack every
item and crafting result draws from.

---

## 🔧 VS Code Tips

- Install **Live Server** to serve `index.html` with hot-reload while editing.
- `generate_recipes_data.py` only needs a plain Python 3 install — no pip
  packages required.
