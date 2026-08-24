from flask import Flask, jsonify, request
from flask_cors import CORS
from recipes import RECIPES, ITEMS
from datetime import date

app = Flask(__name__)
app.json.sort_keys = False  # preserve ITEMS' category order — Flask alphabetizes by default
CORS(app)


def get_daily_recipe():
    """Return a deterministic daily recipe based on today's date."""
    day_index = date.today().toordinal()
    return RECIPES[day_index % len(RECIPES)]


def _bounding_box(grid):
    """(min_row, max_row, min_col, max_col) of non-air cells, or None if empty."""
    cells = [(i // 3, i % 3) for i, v in enumerate(grid) if v != "air"]
    if not cells:
        return None
    rows = [r for r, _ in cells]
    cols = [c for _, c in cells]
    return min(rows), max(rows), min(cols), max(cols)


def _normalize(grid):
    """
    Shift a grid's contents to the top-left corner of their own bounding box.

    Minecraft's shaped recipes match by relative arrangement, not absolute
    position — e.g. the Crafting Table's 2x2 pattern is valid in any of its
    4 possible corners of the 3x3 grid. Two grids holding the same shape at
    different positions normalize to the identical 9-cell layout, so
    comparing normalized grids makes position within the grid irrelevant.
    """
    box = _bounding_box(grid)
    if box is None:
        return ["air"] * 9
    min_r, _, min_c, _ = box
    normalized = ["air"] * 9
    for i, item in enumerate(grid):
        if item == "air":
            continue
        r, c = i // 3, i % 3
        normalized[(r - min_r) * 3 + (c - min_c)] = item
    return normalized


@app.route("/api/recipe", methods=["GET"])
def get_recipe():
    """Return today's recipe target (result only, not the grid)."""
    recipe = get_daily_recipe()
    return jsonify({
        "id":          recipe["id"],
        "result":      recipe["result"],
        "result_desc": recipe["result_desc"],
    })


@app.route("/api/items", methods=["GET"])
def get_items():
    """Return all available items and their display metadata."""
    return jsonify(ITEMS)


@app.route("/api/recipes/all", methods=["GET"])
def get_all_recipes():
    """Return all recipe grids so the frontend can do live matching."""
    return jsonify([
        {"result": r["result"], "grid": r["grid"]}
        for r in RECIPES
    ])


@app.route("/api/guess", methods=["POST"])
def check_guess():
    """
    Evaluate a player's guess against today's recipe.

    Request body:
        {
            "recipe_id": int,
            "guess": [str, str, ...str]   // 9 item IDs
        }

    Response:
        {
            "feedback": ["correct"|"present"|"absent", ...],  // 9 values
            "correct":  bool
        }

    Matching is translation-invariant: a guess counts as correct if its
    shape matches the recipe's shape anywhere within the 3x3 grid, not
    only at the recipe's stored (arbitrary) canonical position.
    """
    data = request.get_json()
    recipe_id = data.get("recipe_id")
    guess = data.get("guess")  # list of 9 item IDs

    # Validate
    if recipe_id is None or guess is None or len(guess) != 9:
        return jsonify({"error": "Invalid request. Provide recipe_id and a 9-item guess array."}), 400

    # Find the recipe
    recipe = next((r for r in RECIPES if r["id"] == recipe_id), None)
    if recipe is None:
        return jsonify({"error": f"Recipe id {recipe_id} not found."}), 404

    target = recipe["grid"]
    norm_target = _normalize(target)
    norm_guess  = _normalize(guess)
    is_correct  = norm_guess == norm_target

    if is_correct:
        # A genuine win — every filled slot (and every matching blank) is green.
        feedback = ["correct"] * 9
    else:
        feedback = ["absent"] * 9
        box = _bounding_box(guess)
        if box is not None:
            min_r, _, min_c, _ = box
            for i in range(9):
                if guess[i] == "air":
                    continue
                r, c = i // 3, i % 3
                norm_idx = (r - min_r) * 3 + (c - min_c)
                if norm_guess[norm_idx] == norm_target[norm_idx]:
                    feedback[i] = "correct"   # right item, right spot in the shape
                elif norm_guess[norm_idx] in norm_target:
                    feedback[i] = "present"   # right item, wrong spot in the shape
                else:
                    feedback[i] = "absent"    # item not in the recipe

    return jsonify({
        "feedback": feedback,
        "correct":  is_correct,
    })


@app.route("/api/solution", methods=["POST"])
def get_solution():
    """Reveal the full solution grid (called after game over)."""
    data = request.get_json()
    recipe_id = data.get("recipe_id")
    recipe = next((r for r in RECIPES if r["id"] == recipe_id), None)
    if recipe is None:
        return jsonify({"error": "Recipe not found."}), 404
    return jsonify({"grid": recipe["grid"]})


if __name__ == "__main__":
    print("Craftdle backend running at http://localhost:5000")
    app.run(debug=True, port=5000)
