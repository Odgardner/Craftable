"""
Regenerates recipes-data.js from recipes.py.

recipes.py is the maintained source of truth — it's easier to read and edit
as commented Python dict/list literals. The game itself is a static site and
never imports recipes.py directly; recipes-data.js is what actually ships.

Run this after any edit to recipes.py:
    python generate_recipes_data.py
"""

import json
from recipes import ITEMS, RECIPES

with open("recipes-data.js", "w", encoding="utf-8") as f:
    f.write("// Auto-generated from recipes.py — the single source of truth for\n")
    f.write("// items and crafting recipes. Regenerate with:\n")
    f.write("//     python generate_recipes_data.py\n\n")
    f.write("const ITEMS = ")
    f.write(json.dumps(ITEMS, indent=2))
    f.write(";\n\n")
    f.write("const RECIPES = ")
    f.write(json.dumps(RECIPES, indent=2))
    f.write(";\n\n")
    f.write(
        "// Guardrail: two recipes sharing an identical grid would be genuinely\n"
        "// ambiguous (the live \"what does this craft?\" preview could only ever\n"
        "// show one of them). Fail loudly at load time instead of silently\n"
        "// shipping a broken puzzle.\n"
        "(function checkForDuplicateGrids() {\n"
        "  const seen = new Map();\n"
        "  for (const r of RECIPES) {\n"
        "    const key = r.grid.join(\",\");\n"
        "    if (seen.has(key)) {\n"
        "      throw new Error(\n"
        "        `Duplicate recipe grid: \"${seen.get(key)}\" and \"${r.result}\" craft from the exact same 3x3 layout.`\n"
        "      );\n"
        "    }\n"
        "    seen.set(key, r.result);\n"
        "  }\n"
        "})();\n"
    )

print(f"Wrote recipes-data.js with {len(ITEMS)} items and {len(RECIPES)} recipes.")
