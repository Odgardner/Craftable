# ⛏ Craftdle — Minecraft Recipe Wordle

Guess the Minecraft crafting recipe in 10 attempts!  
Like Wordle, but for a 3×3 crafting table.

---

## 📁 Project Structure

```
minecraft-wordle/
├── app.py            ← Flask REST API server
├── recipes.py         ← All recipe + item data
├── index.html          ← Game UI
├── style.css           ← Minecraft-themed styling
├── script.js           ← Game logic & API calls
├── assets/items/       ← Item icon images
├── requirements.txt
└── README.md
```

---

## 🚀 Setup & Running

### 1. Install Python dependencies

```bash
cd minecraft-wordle
pip install -r requirements.txt
```

### 2. Start the backend

```bash
python app.py
```

The server starts at **http://localhost:5000**

### 3. Open the frontend

Open `index.html` in your browser directly, **or** use the
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
VS Code extension for auto-reload on save.

> ⚠️ The frontend must be able to reach `http://localhost:5000` — keep the
> Python server running while playing.

---

## 🎮 How to Play

1. The **target item** is shown at the top — figure out its crafting recipe.
2. Click a **slot** in the 3×3 grid to select it (highlighted in gold).
3. Click an **item** from the palette to place it in the selected slot.
4. Fill all 9 slots, then hit **⚒ Craft & Submit**.
5. Colour feedback appears on each slot:

| Colour | Meaning |
|--------|---------|
| 🟩 **Green** | Correct item in the correct slot |
| 🟨 **Yellow** | Item IS in the recipe, but in the wrong slot |
| ⬛ **Grey** | Item is not used in this recipe |

6. You have **10 attempts**. A new recipe unlocks every day!

---

## 🧩 Available Items

| ID | Name |
|----|------|
| `oak_planks` | Oak Planks |
| `cobble` | Cobblestone |
| `iron` | Iron Ingot |
| `gold` | Gold Ingot |
| `diamond` | Diamond |
| `stick` | Stick |
| `coal` | Coal |
| `string` | String |
| `flint` | Flint |
| `wheat` | Wheat |
| `feather` | Feather |
| `leather` | Leather |
| `redstone` | Redstone |
| `wool` | Wool |
| `sand` | Sand |

---

## ➕ Adding New Recipes

Edit `recipes.py`. Each recipe looks like:

```python
{
    "id": 21,
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
Use `"air"` for empty slots.

---

## 🛠 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/recipe` | Today's target item (no solution) |
| `GET`  | `/api/items` | All item definitions |
| `POST` | `/api/guess` | Submit a guess, get colour feedback |
| `POST` | `/api/solution` | Reveal the full solution grid |

### POST `/api/guess`
```json
// Request
{ "recipe_id": 1, "guess": ["oak_planks","oak_planks","oak_planks","oak_planks","air","oak_planks","oak_planks","oak_planks","oak_planks"] }

// Response
{ "feedback": ["correct","correct","correct","correct","correct","correct","correct","correct","correct"], "correct": true }
```

---

## 🔧 VS Code Tips

- Install the **Python** extension to get IntelliSense in `app.py`.
- Install **Live Server** to serve `index.html` with hot-reload.
- Open the integrated terminal and split it: one pane for `python app.py`,
  one for editing files.
