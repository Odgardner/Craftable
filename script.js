/* ═══════════════════════════════════════════════════════════
   CRAFTDLE — script.js
   Fully static: RECIPES/ITEMS come from recipes-data.js, all
   game logic (daily puzzle, guess checking) runs client-side.
   Handles: game state, rendering, interactions
═══════════════════════════════════════════════════════════ */

const MAX_ATTEMPTS = 10;

// ── Item emoji / icon map (client-side display) ─────────────
const ITEM_EMOJIS = {
  air:        "",
  oak_planks: "🪵",
  cobble:     "🪨",
  iron:       "⛏",
  gold:       "🥇",
  diamond:    "💎",
  stick:      "🥢",
  coal:       "🔥",
  string:     "🧵",
  flint:      "🪨",
  wheat:      "🌾",
  feather:    "🪶",
  leather:    "🟤",
  redstone:   "🔴",
  wool:       "🐑",
  sand:       "🏜",
};

const RESULT_EMOJIS = {
  "Crafting Table":    "🔨",
  "Chest":             "📦",
  "Stick":             "🥢",
  "Torch":             "🔦",
  "Wooden Pickaxe":    "⛏",
  "Stone Pickaxe":     "⛏",
  "Iron Pickaxe":      "⛏",
  "Diamond Pickaxe":   "⛏",
  "Furnace":           "🔥",
  "Wooden Sword":      "⚔",
  "Stone Sword":       "⚔",
  "Iron Sword":        "⚔",
  "Bow":               "🏹",
  "Arrow":             "➡",
  "Bread":             "🍞",
  "Wooden Axe":        "🪓",
  "Iron Helmet":       "🪖",
  "Leather Boots":     "👢",
  "Ladder":            "🪜",
  "Clock":             "🕐",
  "Redstone Torch":    "🔦",
  "Diamond Sword":     "⚔",
  "Golden Sword":      "⚔",
  "Golden Pickaxe":    "⛏",
  "Iron Axe":          "🪓",
  "Diamond Axe":       "🪓",
  "Shears":            "✂",
  "Iron Boots":        "👢",
  "Diamond Chestplate":"🦺",
  "Fishing Rod":       "🎣",
  "Shield":            "🛡",
  "Compass":           "🧭",
  "Flint and Steel":   "🔥",
  "Rail":              "🛤",
  "Powered Rail":      "🛤",
  "Sign":              "🪧",
  "Boat":              "🛶",
  "Piston":            "🔳",
  "Bucket":            "🪣",
  "Painting":          "🖼",
  "Item Frame":        "🖼",
  "Bed":               "🛏",
  "TNT":                "🧨",
  "Stone Bricks":       "🧱",
  "Stonecutter":        "🪚",
  "Stone Pressure Plate": "⬜",
  "Quartz Block":       "🧊",
  "Leather Leggings":   "👖",
  "Iron Leggings":      "👖",
  "Golden Leggings":    "👖",
  "Diamond Leggings":   "👖",
  "Leather Helmet":     "🪖",
  "Golden Helmet":      "🪖",
  "Diamond Helmet":     "🪖",
  "Leather Chestplate": "🦺",
  "Iron Chestplate":    "🦺",
  "Golden Chestplate":  "🦺",
  "Golden Boots":       "👢",
  "Diamond Boots":      "👢",
  "Iron Block":         "🔲",
  "Gold Block":         "🔲",
  "Diamond Block":      "🔲",
  "Coal Block":         "🔲",
  "Redstone Block":     "🔲",
  "Cobblestone Wall":   "🧱",
  "Jukebox":            "🎵",
  "Note Block":         "🎵",
};

// Every icon in the game — ingredients and crafting results alike —
// comes from this one downloaded pack, no other PNGs.
const ASSET_BASE = "./assets/items/Minecraft_Items_latest_AllVisible/";

const ITEM_IMAGES = {
  oak_planks: `${ASSET_BASE}oak_planks.png`,
  cobble:     `${ASSET_BASE}cobblestone.png`,
  iron:       `${ASSET_BASE}iron_ingot.png`,
  gold:       `${ASSET_BASE}gold_ingot.png`,
  diamond:    `${ASSET_BASE}diamond.png`,
  stick:      `${ASSET_BASE}stick.png`,
  coal:       `${ASSET_BASE}coal.png`,
  string:     `${ASSET_BASE}string.png`,
  flint:      `${ASSET_BASE}flint.png`,
  wheat:      `${ASSET_BASE}wheat.png`,
  feather:    `${ASSET_BASE}feather.png`,
  leather:    `${ASSET_BASE}leather.png`,
  redstone:   `${ASSET_BASE}redstone.png`,
  wool:       `${ASSET_BASE}white_wool.png`,
  sand:       `${ASSET_BASE}sand.png`,
  gunpowder:  `${ASSET_BASE}gunpowder.png`,
  stone:      `${ASSET_BASE}stone.png`,
  quartz:     `${ASSET_BASE}quartz.png`,
};

// ── Shape matching ────────────────────────────────────────────
// Minecraft's shaped recipes match by relative arrangement, not absolute
// position — e.g. the Crafting Table's 2x2 pattern is valid in any of its
// 4 possible corners of the 3x3 grid. Normalizing a grid to the top-left
// corner of its own bounding box makes position within the grid irrelevant:
// two grids holding the same shape at different positions normalize to the
// identical 9-cell layout.
function boundingBox(grid) {
  let minR = 3, maxR = -1, minC = 3, maxC = -1;
  grid.forEach((item, i) => {
    if (item === "air") return;
    const r = Math.floor(i / 3), c = i % 3;
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    if (c < minC) minC = c;
    if (c > maxC) maxC = c;
  });
  return maxR === -1 ? null : { minR, maxR, minC, maxC };
}

function normalizeGrid(grid) {
  const box = boundingBox(grid);
  const out = Array(9).fill("air");
  if (!box) return out;
  grid.forEach((item, i) => {
    if (item === "air") return;
    const r = Math.floor(i / 3), c = i % 3;
    out[(r - box.minR) * 3 + (c - box.minC)] = item;
  });
  return out;
}

function gridsEqual(a, b) {
  return a.every((v, i) => v === b[i]);
}

// ── Game logic (fully client-side — RECIPES/ITEMS from recipes-data.js) ──

// The daily puzzle rolls over at the player's own local midnight, same
// convention real Wordle uses — there's no server to define a shared
// "today," and the full recipe list already ships to the client anyway.
function getDailyRecipe() {
  const now = new Date();
  const dayIndex = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  return RECIPES[dayIndex % RECIPES.length];
}

function checkGuess(recipeId, guess) {
  const recipe = RECIPES.find((r) => r.id === recipeId);
  const target = recipe.grid;
  const normTarget = normalizeGrid(target);
  const normGuess  = normalizeGrid(guess);
  const isCorrect  = gridsEqual(normGuess, normTarget);

  if (isCorrect) {
    return { feedback: Array(9).fill("correct"), correct: true };
  }

  const feedback = Array(9).fill("absent");
  const box = boundingBox(guess);
  if (box) {
    for (let i = 0; i < 9; i++) {
      if (guess[i] === "air") continue;
      const r = Math.floor(i / 3), c = i % 3;
      const normIdx = (r - box.minR) * 3 + (c - box.minC);
      if (normGuess[normIdx] === normTarget[normIdx]) {
        feedback[i] = "correct";   // right item, right spot in the shape
      } else if (normTarget.includes(normGuess[normIdx])) {
        feedback[i] = "present";   // right item, wrong spot in the shape
      }
    }
  }
  return { feedback, correct: false };
}

function getSolutionGrid(recipeId) {
  return RECIPES.find((r) => r.id === recipeId).grid;
}

// ── Game state ──────────────────────────────────────────────
const state = {
  recipeId:      null,
  targetResult:  "",
  targetDesc:    "",
  items:         {},
  currentGrid:   Array(9).fill("air"),
  selectedSlot:  null,
  selectedItem:  null,
  attempts:      [],
  gameOver:      false,
  won:           false,
  currentMatch:  null,
};

let allRecipes = [];

// ── Utility ─────────────────────────────────────────────────
function $(id)   { return document.getElementById(id); }
function $$(sel) { return document.querySelectorAll(sel); }

let toastTimer = null;
function showToast(msg, type = "") {
  const el = $("toast");
  el.textContent = msg;
  el.className = "toast" + (type ? ` ${type}-toast` : "");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = "toast hidden"; }, 2800);
}

// ── Initialisation ──────────────────────────────────────────
function init() {
  $("max-attempts").textContent = MAX_ATTEMPTS;

  state.items        = ITEMS;
  const recipe        = getDailyRecipe();
  state.recipeId     = recipe.id;
  state.targetResult = recipe.result;
  state.targetDesc   = recipe.result_desc;
  allRecipes         = RECIPES;
  allRecipes.forEach((r) => { r.normGrid = normalizeGrid(r.grid); });

  renderTarget();
  renderCraftingGrid();
  renderPalette();
  updateSubmitBtn();

  $("help-btn").addEventListener("click", () => {
    $("help-modal").classList.remove("hidden");
  });
  $("modal-close-btn").addEventListener("click", () => {
    $("help-modal").classList.add("hidden");
  });
  $("help-modal").addEventListener("click", (e) => {
    if (e.target === $("help-modal")) $("help-modal").classList.add("hidden");
  });

  $("clear-btn").addEventListener("click", clearGrid);
  $("submit-btn").addEventListener("click", submitGuess);
}

// ── Render helpers ──────────────────────────────────────────

// Vanilla item-ID overrides for results whose icon isn't a plain
// snake_case of the name (modern MC splits these by wood type/colour).
const RESULT_IMAGE_OVERRIDES = {
  "Sign": "oak_sign",
  "Boat": "oak_boat",
  "Bed":  "white_bed",
};
function resultImagePath(result) {
  const id = RESULT_IMAGE_OVERRIDES[result]
    || result.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return `${ASSET_BASE}${id}.png`;
}

// Fills `container` with the result's real item icon; falls back to the
// emoji glyph automatically if that particular PNG isn't in the pack.
function renderResultIcon(container, result) {
  container.innerHTML = "";
  const img = document.createElement("img");
  img.src       = resultImagePath(result);
  img.alt       = result;
  img.className = "item-img result-img";
  img.onerror   = () => {
    container.innerHTML = `<span>${RESULT_EMOJIS[result] || "🔨"}</span>`;
  };
  container.appendChild(img);
}

function renderTarget(reveal = false) {
  if (reveal) {
    renderResultIcon($("target-icon"), state.targetResult);
    $("target-name").textContent = state.targetResult;
    $("target-desc").textContent = state.targetDesc;
  } else {
    $("target-icon").textContent = "";
    $("target-name").textContent = "";
    $("target-desc").textContent = "Figure out the recipe!";
  }
}

function renderCraftingGrid() {
  const grid = $("crafting-grid");
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement("div");
    slot.className = "slot interactive";
    slot.dataset.index = i;
    slot.setAttribute("role", "gridcell");
    slot.setAttribute("aria-label", `Slot ${i + 1}`);

    const indexLabel = document.createElement("div");
    indexLabel.className = "item-index";
    indexLabel.textContent = i + 1;
    slot.appendChild(indexLabel);

    const abbrEl = document.createElement("div");
    abbrEl.className = "item-abbr";
    slot.appendChild(abbrEl);

    slot.addEventListener("click", () => handleSlotClick(i));
    grid.appendChild(slot);
  }

  refreshGridVisuals();
}

function refreshGridVisuals() {
  const slots = $$(".crafting-grid .slot");
  slots.forEach((slot, i) => {
    const itemId = state.currentGrid[i];
    const item   = state.items[itemId];

    const indexLabel = slot.querySelector(".item-index");
    slot.innerHTML = "";
    if (indexLabel) slot.appendChild(indexLabel);

    if (itemId !== "air" && item && ITEM_IMAGES[itemId]) {
      const img = document.createElement("img");
      img.src       = ITEM_IMAGES[itemId];
      img.alt       = item.name;
      img.className = "item-img";
      slot.appendChild(img);
    }

    slot.classList.toggle("selected", state.selectedSlot === i);
  });

  updateLiveResult();
}

function updateLiveResult() {
  const resultSlot = $("result-slot");
  const normCurrent = normalizeGrid(state.currentGrid);
  const match = allRecipes.find(r => gridsEqual(r.normGrid, normCurrent));
  state.currentMatch = match || null;

  resultSlot.innerHTML = `<div class="result-icon"${match ? ` title="${match.result}"` : ""}></div>`;
  if (match) {
    renderResultIcon(resultSlot.querySelector(".result-icon"), match.result);
  }
}

function renderPalette() {
  const palette = $("item-palette");
  palette.innerHTML = "";

  Object.entries(state.items).forEach(([id]) => {
    if (id === "air") return;
    const btn = makePaletteItem(id);
    btn.title = state.items[id].name;
    palette.appendChild(btn);
  });
}

function makePaletteItem(id) {
  const btn = document.createElement("div");
  btn.className      = "palette-item";
  btn.dataset.itemId = id;

  if (ITEM_IMAGES[id]) {
    const img = document.createElement("img");
    img.src       = ITEM_IMAGES[id];
    img.alt       = state.items[id]?.name || id;
    img.className = "item-img palette-img";
    btn.appendChild(img);
  }

  btn.addEventListener("click", () => handlePaletteClick(id));
  return btn;
}

function renderHistory() {
  const section = $("history-section");
  section.innerHTML = "";

  state.attempts.forEach((attempt, idx) => {
    const row = document.createElement("div");
    row.className = "history-attempt";

    const label = document.createElement("div");
    label.className = "history-label";
    label.textContent = `#${idx + 1}`;
    row.appendChild(label);

    const hGrid = document.createElement("div");
    hGrid.className = "history-grid";

    attempt.guess.forEach((itemId, slotIdx) => {
      const slot = document.createElement("div");
      slot.className = `slot ${attempt.feedback[slotIdx]}`;

      const item = state.items[itemId];
      if (item && itemId !== "air" && ITEM_IMAGES[itemId]) {
        const img = document.createElement("img");
        img.src       = ITEM_IMAGES[itemId];
        img.alt       = item.name;
        img.className = "item-img";
        slot.appendChild(img);
      }

      slot.style.animationDelay = `${slotIdx * 60}ms`;
      slot.classList.add("flip");
      hGrid.appendChild(slot);
    });

    row.appendChild(hGrid);
    section.appendChild(row);
  });
}

function updateSubmitBtn() {
  // Mirrors a real crafting table: you can't take anything out of an
  // empty output slot, so submitting requires the grid to actually
  // match some recipe's shape — not just have items placed in it.
  $("submit-btn").disabled = !state.currentMatch || state.gameOver;
}

// ── Interaction handlers ────────────────────────────────────

function handleSlotClick(index) {
  if (state.gameOver) return;

  if (state.selectedItem !== null) {
    placeItem(index, state.selectedItem);
    return;
  }

  if (state.selectedSlot === index) {
    state.currentGrid[index] = "air";
    state.selectedSlot = null;
  } else {
    state.selectedSlot = index;
  }

  refreshGridVisuals();
  updateSubmitBtn();
}

function handlePaletteClick(itemId) {
  if (state.gameOver) return;

  $$(".palette-item").forEach(el => {
    el.classList.toggle("palette-selected", el.dataset.itemId === itemId);
  });

  state.selectedItem = itemId;

  if (state.selectedSlot !== null) {
    placeItem(state.selectedSlot, itemId);
    advanceSlot();
  }
}

function placeItem(index, itemId) {
  state.currentGrid[index] = itemId;
  refreshGridVisuals();
  updateSubmitBtn();
}

function advanceSlot() {
  const startIdx = (state.selectedSlot === null) ? 0 : state.selectedSlot + 1;
  for (let i = startIdx; i < 9; i++) {
    if (state.currentGrid[i] === "air") {
      state.selectedSlot = i;
      refreshGridVisuals();
      return;
    }
  }
  state.selectedSlot = null;
  refreshGridVisuals();
}

function clearGrid() {
  state.currentGrid  = Array(9).fill("air");
  state.selectedSlot = null;
  state.selectedItem = null;
  $$(".palette-item").forEach(el => el.classList.remove("palette-selected"));
  refreshGridVisuals();
  updateSubmitBtn();
}

// ── Submit & evaluate ───────────────────────────────────────
function submitGuess() {
  if (state.gameOver) return;

  if (!state.currentMatch) {
    showToast("This arrangement doesn't craft anything!", "error");
    return;
  }

  $("submit-btn").disabled = true;

  const result = checkGuess(state.recipeId, state.currentGrid);

  state.attempts.push({
    guess:    [...state.currentGrid],
    feedback: result.feedback,
  });

  $("attempt-num").textContent = Math.min(state.attempts.length + 1, MAX_ATTEMPTS);

  renderHistory();

  if (result.correct) {
    state.gameOver = true;
    state.won      = true;
    setTimeout(() => showGameOver(true), 1200);
  } else if (state.attempts.length >= MAX_ATTEMPTS) {
    state.gameOver = true;
    setTimeout(() => showGameOver(false), 1200);
  } else {
    clearGrid();
    const remaining = MAX_ATTEMPTS - state.attempts.length;
    showToast(`Not quite! ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`);
    updateSubmitBtn();
  }
}

// ── Game Over ───────────────────────────────────────────────
function showGameOver(won) {
  renderTarget(true);

  const solutionGrid = getSolutionGrid(state.recipeId);

  $("gameover-icon").textContent  = won ? "🏆" : "💀";
  $("gameover-title").textContent = won ? "You Win!" : "Game Over";
  $("gameover-msg").textContent   = won
    ? `You crafted it in ${state.attempts.length} attempt${state.attempts.length === 1 ? "" : "s"}! 🌲`
    : `The answer was: ${state.targetResult}`;

  const grid = $("solution-grid");
  grid.innerHTML = "";
  if (solutionGrid) {
    solutionGrid.forEach(itemId => {
      const cell = document.createElement("div");
      cell.className = "solution-cell";
      const item = state.items[itemId];
      if (item && itemId !== "air" && ITEM_IMAGES[itemId]) {
        const img = document.createElement("img");
        img.src       = ITEM_IMAGES[itemId];
        img.alt       = item.name;
        img.className = "item-img";
        cell.appendChild(img);
      }
      grid.appendChild(cell);
    });
  }

  renderResultIcon($("solution-result-icon"), state.targetResult);
  $("solution-result-name").textContent = state.targetResult;

  $("gameover-overlay").classList.remove("hidden");

  $("gameover-close-btn").addEventListener("click", () => {
    $("gameover-overlay").classList.add("hidden");
  });
}

// ── Boot ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);