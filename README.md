# ⛏ Craftable — Minecraft Recipe Wordle

Guess the Minecraft crafting recipe in 10 attempts!
Like Wordle, but for a 3×3 crafting table.

A static site — no server, no database, no build step required to just play.
Every recipe ships to the browser and all guess-checking runs client-side,
so it can be hosted anywhere that serves static files, for free. An optional
serverless backend (`backend/`) adds Daily-mode streaks and a public
"players today" count — the game is fully playable without it.

---

## 📁 Project Structure

```
minecraft-wordle/
├── index.html                 ← Game UI
├── style.css                  ← Minecraft-themed styling
├── recipes-data.js            ← Generated item + recipe data (do not hand-edit)
├── script.js                  ← Game logic, rendering, interactions
├── stats-config.js            ← STATS_API_BASE — set after deploying backend/ (optional)
├── recipes.py                 ← Maintained source of truth for recipes.js
├── generate_recipes_data.py   ← Regenerates recipes-data.js from recipes.py
├── assets/items/               ← Item icon images
├── backend/                    ← Optional: streaks + daily player count (see below)
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

## 🔥 Optional: Streaks & Daily Player Count

By default `stats-config.js` has `STATS_API_BASE = null`, which disables
this entirely — no stats button, no "players today" line, everything else
plays exactly as if this section didn't exist. Turning it on requires an
AWS account (free tier).

**What it costs**: Lambda and DynamoDB are within AWS's *Always Free* tier
at this project's scale (1M Lambda requests/month, 25GB + 25 provisioned
RCU/WCU on DynamoDB — both perpetual, not a 12-month trial). API Gateway is
free for your first 12 months, then a fraction of a cent per request after
— negligible unless this gets Stardewdle-level traffic.

**What it does**: records each *Daily*-mode result (win or loss) to compute
a per-player streak, and increments a public per-day counter. Random mode
never touches it — streaks are a daily-puzzle concept. Player identity is
just a random ID stored in `localStorage`, not an account.

### Deploying

Requires the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
and an AWS account.

```bash
cd backend
sam build
sam deploy --guided
```

Answer the prompts (stack name, region — accept the defaults for
everything else). When it finishes, copy the `ApiUrl` output value into
`stats-config.js`:

```js
const STATS_API_BASE = "https://abc123xyz.execute-api.us-east-1.amazonaws.com";
```

Commit and redeploy the frontend — the 🔥 stats button and "players today"
line will now appear.

To change which site is allowed to call the API (CORS), redeploy with:
```bash
sam deploy --parameter-overrides AllowedOrigin=https://your-domain-here
```

### Backend structure

```
backend/
├── template.yaml           ← SAM template: 1 Lambda + 2 DynamoDB tables + HTTP API
└── src/
    ├── index.mjs            ← Lambda handler (routes: POST /result, GET /stats, GET /today-count)
    ├── streak-logic.mjs     ← Pure streak math, no AWS SDK — unit-testable on its own
    └── package.json         ← AWS SDK v3 dependencies
```

## 🔧 VS Code Tips

- Install **Live Server** to serve `index.html` with hot-reload while editing.
- `generate_recipes_data.py` only needs a plain Python 3 install — no pip
  packages required.
