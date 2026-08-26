// Auto-generated from recipes.py — the single source of truth for
// items and crafting recipes. Regenerate with:
//     python generate_recipes_data.py

const ITEMS = {
  "air": {
    "name": "Empty",
    "abbr": "",
    "bg": "#1a1a2e",
    "fg": "#555",
    "border": "#2a2a3e"
  },
  "oak_planks": {
    "name": "Oak Planks",
    "abbr": "OAK",
    "bg": "#7a5c2e",
    "fg": "#f0d090",
    "border": "#5a3c1e"
  },
  "cobble": {
    "name": "Cobblestone",
    "abbr": "COBB",
    "bg": "#5a5a5a",
    "fg": "#e0e0e0",
    "border": "#3a3a3a"
  },
  "stone": {
    "name": "Stone",
    "abbr": "STNE",
    "bg": "#8a8a8a",
    "fg": "#f0f0f0",
    "border": "#6a6a6a"
  },
  "sand": {
    "name": "Sand",
    "abbr": "SAND",
    "bg": "#c8b870",
    "fg": "#5a4820",
    "border": "#9a8a48"
  },
  "wool": {
    "name": "Wool",
    "abbr": "WOOL",
    "bg": "#e0e0e0",
    "fg": "#444",
    "border": "#bbb"
  },
  "iron": {
    "name": "Iron Ingot",
    "abbr": "IRON",
    "bg": "#b0b0b0",
    "fg": "#222",
    "border": "#808080"
  },
  "gold": {
    "name": "Gold Ingot",
    "abbr": "GOLD",
    "bg": "#d4a000",
    "fg": "#fff8e0",
    "border": "#a07800"
  },
  "diamond": {
    "name": "Diamond",
    "abbr": "DIAM",
    "bg": "#00bcd4",
    "fg": "#e0ffff",
    "border": "#008fa1"
  },
  "redstone": {
    "name": "Redstone",
    "abbr": "RDST",
    "bg": "#a00000",
    "fg": "#ffaaaa",
    "border": "#600000"
  },
  "coal": {
    "name": "Coal",
    "abbr": "COAL",
    "bg": "#1e1e1e",
    "fg": "#aaa",
    "border": "#111"
  },
  "quartz": {
    "name": "Nether Quartz",
    "abbr": "QRTZ",
    "bg": "#e8e0d8",
    "fg": "#3a3430",
    "border": "#c0b8ac"
  },
  "leather": {
    "name": "Leather",
    "abbr": "LETH",
    "bg": "#6b3410",
    "fg": "#d4905a",
    "border": "#3a1a06"
  },
  "feather": {
    "name": "Feather",
    "abbr": "FETH",
    "bg": "#e8e8d8",
    "fg": "#444",
    "border": "#bbb"
  },
  "string": {
    "name": "String",
    "abbr": "STRG",
    "bg": "#d8d8d8",
    "fg": "#333",
    "border": "#aaa"
  },
  "gunpowder": {
    "name": "Gunpowder",
    "abbr": "GNPW",
    "bg": "#4a4650",
    "fg": "#d8d0e0",
    "border": "#2a2830"
  },
  "stick": {
    "name": "Stick",
    "abbr": "STCK",
    "bg": "#4a2e10",
    "fg": "#c09060",
    "border": "#2a1a08"
  },
  "wheat": {
    "name": "Wheat",
    "abbr": "WHET",
    "bg": "#c8a020",
    "fg": "#fff5cc",
    "border": "#906800"
  },
  "flint": {
    "name": "Flint",
    "abbr": "FLNT",
    "bg": "#3a3050",
    "fg": "#b0a8d0",
    "border": "#1e1a30"
  }
};

const RECIPES = [
  {
    "id": 0,
    "result": "Crafting Table",
    "result_desc": "Used to craft everything!",
    "grid": [
      "oak_planks",
      "oak_planks",
      "air",
      "oak_planks",
      "oak_planks",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 1,
    "result": "Chest",
    "result_desc": "Stores up to 27 stacks of items.",
    "grid": [
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "air",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks"
    ]
  },
  {
    "id": 2,
    "result": "Stick",
    "result_desc": "A basic crafting ingredient.",
    "grid": [
      "air",
      "oak_planks",
      "air",
      "air",
      "oak_planks",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 3,
    "result": "Torch",
    "result_desc": "Provides light and prevents mob spawning.",
    "grid": [
      "air",
      "coal",
      "air",
      "air",
      "stick",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 4,
    "result": "Wooden Pickaxe",
    "result_desc": "Used to mine stone and coal.",
    "grid": [
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "air",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 5,
    "result": "Stone Pickaxe",
    "result_desc": "Used to mine iron and gold.",
    "grid": [
      "cobble",
      "cobble",
      "cobble",
      "air",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 6,
    "result": "Iron Pickaxe",
    "result_desc": "Used to mine diamonds and redstone.",
    "grid": [
      "iron",
      "iron",
      "iron",
      "air",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 7,
    "result": "Diamond Pickaxe",
    "result_desc": "The best pickaxe for mining.",
    "grid": [
      "diamond",
      "diamond",
      "diamond",
      "air",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 8,
    "result": "Furnace",
    "result_desc": "Used to smelt ores and cook food.",
    "grid": [
      "cobble",
      "cobble",
      "cobble",
      "cobble",
      "air",
      "cobble",
      "cobble",
      "cobble",
      "cobble"
    ]
  },
  {
    "id": 9,
    "result": "Wooden Sword",
    "result_desc": "Your first weapon against mobs.",
    "grid": [
      "air",
      "oak_planks",
      "air",
      "air",
      "oak_planks",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 10,
    "result": "Stone Sword",
    "result_desc": "A stronger sword for combat.",
    "grid": [
      "air",
      "cobble",
      "air",
      "air",
      "cobble",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 11,
    "result": "Iron Sword",
    "result_desc": "A reliable combat weapon.",
    "grid": [
      "air",
      "iron",
      "air",
      "air",
      "iron",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 12,
    "result": "Bow",
    "result_desc": "Shoots arrows at enemies from range.",
    "grid": [
      "air",
      "stick",
      "string",
      "stick",
      "air",
      "string",
      "air",
      "stick",
      "string"
    ]
  },
  {
    "id": 13,
    "result": "Arrow",
    "result_desc": "Ammunition for the bow.",
    "grid": [
      "air",
      "flint",
      "air",
      "air",
      "stick",
      "air",
      "air",
      "feather",
      "air"
    ]
  },
  {
    "id": 14,
    "result": "Bread",
    "result_desc": "Restores 5 hunger points.",
    "grid": [
      "air",
      "air",
      "air",
      "wheat",
      "wheat",
      "wheat",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 15,
    "result": "Wooden Axe",
    "result_desc": "Chops wood faster than by hand.",
    "grid": [
      "oak_planks",
      "oak_planks",
      "air",
      "oak_planks",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 16,
    "result": "Iron Helmet",
    "result_desc": "Provides head protection.",
    "grid": [
      "iron",
      "iron",
      "iron",
      "iron",
      "air",
      "iron",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 17,
    "result": "Leather Boots",
    "result_desc": "Basic foot protection.",
    "grid": [
      "air",
      "air",
      "air",
      "leather",
      "air",
      "leather",
      "leather",
      "air",
      "leather"
    ]
  },
  {
    "id": 18,
    "result": "Ladder",
    "result_desc": "Climbable surface for vertical travel.",
    "grid": [
      "stick",
      "air",
      "stick",
      "stick",
      "stick",
      "stick",
      "stick",
      "air",
      "stick"
    ]
  },
  {
    "id": 19,
    "result": "Clock",
    "result_desc": "Shows the time of day.",
    "grid": [
      "air",
      "gold",
      "air",
      "gold",
      "redstone",
      "gold",
      "air",
      "gold",
      "air"
    ]
  },
  {
    "id": 20,
    "result": "Redstone Torch",
    "result_desc": "A redstone power source.",
    "grid": [
      "air",
      "air",
      "air",
      "air",
      "redstone",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 21,
    "result": "Diamond Sword",
    "result_desc": "The strongest handheld weapon.",
    "grid": [
      "air",
      "diamond",
      "air",
      "air",
      "diamond",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 22,
    "result": "Golden Sword",
    "result_desc": "Weak, but enchants easily.",
    "grid": [
      "air",
      "gold",
      "air",
      "air",
      "gold",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 23,
    "result": "Golden Pickaxe",
    "result_desc": "Mines fast, breaks fast.",
    "grid": [
      "gold",
      "gold",
      "gold",
      "air",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 24,
    "result": "Iron Axe",
    "result_desc": "Chops wood faster than stone.",
    "grid": [
      "iron",
      "iron",
      "air",
      "iron",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 25,
    "result": "Diamond Axe",
    "result_desc": "The fastest axe there is.",
    "grid": [
      "diamond",
      "diamond",
      "air",
      "diamond",
      "stick",
      "air",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 26,
    "result": "Shears",
    "result_desc": "Shears sheep and harvests leaves.",
    "grid": [
      "air",
      "iron",
      "air",
      "iron",
      "air",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 27,
    "result": "Iron Boots",
    "result_desc": "Sturdy foot protection.",
    "grid": [
      "air",
      "air",
      "air",
      "iron",
      "air",
      "iron",
      "iron",
      "air",
      "iron"
    ]
  },
  {
    "id": 28,
    "result": "Diamond Chestplate",
    "result_desc": "The best chest armor around.",
    "grid": [
      "diamond",
      "air",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond"
    ]
  },
  {
    "id": 29,
    "result": "Fishing Rod",
    "result_desc": "Catch fish, or fish for mobs.",
    "grid": [
      "air",
      "air",
      "stick",
      "air",
      "stick",
      "string",
      "stick",
      "air",
      "string"
    ]
  },
  {
    "id": 30,
    "result": "Shield",
    "result_desc": "Blocks attacks when raised.",
    "grid": [
      "air",
      "iron",
      "air",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "air",
      "oak_planks",
      "air"
    ]
  },
  {
    "id": 31,
    "result": "Compass",
    "result_desc": "Always points to your spawn.",
    "grid": [
      "air",
      "iron",
      "air",
      "iron",
      "redstone",
      "iron",
      "air",
      "iron",
      "air"
    ]
  },
  {
    "id": 32,
    "result": "Flint and Steel",
    "result_desc": "Sets blocks \u2014 and things \u2014 on fire.",
    "grid": [
      "iron",
      "air",
      "air",
      "air",
      "flint",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 33,
    "result": "Rail",
    "result_desc": "Lays track for minecarts.",
    "grid": [
      "iron",
      "air",
      "iron",
      "iron",
      "stick",
      "iron",
      "iron",
      "air",
      "iron"
    ]
  },
  {
    "id": 34,
    "result": "Powered Rail",
    "result_desc": "Boosts (or brakes) a minecart.",
    "grid": [
      "gold",
      "air",
      "gold",
      "gold",
      "stick",
      "gold",
      "gold",
      "redstone",
      "gold"
    ]
  },
  {
    "id": 35,
    "result": "Sign",
    "result_desc": "Leaves a message for later.",
    "grid": [
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "air",
      "stick",
      "air"
    ]
  },
  {
    "id": 36,
    "result": "Boat",
    "result_desc": "Sails across water.",
    "grid": [
      "air",
      "air",
      "air",
      "oak_planks",
      "air",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "oak_planks"
    ]
  },
  {
    "id": 37,
    "result": "Piston",
    "result_desc": "Pushes blocks when powered.",
    "grid": [
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "cobble",
      "iron",
      "cobble",
      "cobble",
      "redstone",
      "cobble"
    ]
  },
  {
    "id": 38,
    "result": "Bucket",
    "result_desc": "Carries water, lava, or milk.",
    "grid": [
      "iron",
      "air",
      "iron",
      "air",
      "iron",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 39,
    "result": "Painting",
    "result_desc": "Decorates a wall.",
    "grid": [
      "stick",
      "stick",
      "stick",
      "stick",
      "wool",
      "stick",
      "stick",
      "stick",
      "stick"
    ]
  },
  {
    "id": 40,
    "result": "Item Frame",
    "result_desc": "Displays a single item on a wall.",
    "grid": [
      "stick",
      "stick",
      "stick",
      "stick",
      "leather",
      "stick",
      "stick",
      "stick",
      "stick"
    ]
  },
  {
    "id": 41,
    "result": "Bed",
    "result_desc": "Skip the night \u2014 or reset your spawn.",
    "grid": [
      "wool",
      "wool",
      "wool",
      "oak_planks",
      "oak_planks",
      "oak_planks",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 42,
    "result": "TNT",
    "result_desc": "Explosive. Handle with care.",
    "grid": [
      "gunpowder",
      "sand",
      "gunpowder",
      "sand",
      "gunpowder",
      "sand",
      "gunpowder",
      "sand",
      "gunpowder"
    ]
  },
  {
    "id": 43,
    "result": "Stone Bricks",
    "result_desc": "A sturdy building block.",
    "grid": [
      "stone",
      "stone",
      "air",
      "stone",
      "stone",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 44,
    "result": "Stonecutter",
    "result_desc": "Cuts stone into precise shapes.",
    "grid": [
      "air",
      "iron",
      "air",
      "stone",
      "stone",
      "stone",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 45,
    "result": "Stone Pressure Plate",
    "result_desc": "Triggers when stepped on.",
    "grid": [
      "air",
      "air",
      "air",
      "stone",
      "stone",
      "air",
      "air",
      "air",
      "air"
    ]
  },
  {
    "id": 46,
    "result": "Quartz Block",
    "result_desc": "A smooth, decorative building block.",
    "grid": [
      "quartz",
      "quartz",
      "air",
      "quartz",
      "quartz",
      "air",
      "air",
      "air",
      "air"
    ]
  }
];

// Guardrail: two recipes sharing an identical grid would be genuinely
// ambiguous (the live "what does this craft?" preview could only ever
// show one of them). Fail loudly at load time instead of silently
// shipping a broken puzzle.
(function checkForDuplicateGrids() {
  const seen = new Map();
  for (const r of RECIPES) {
    const key = r.grid.join(",");
    if (seen.has(key)) {
      throw new Error(
        `Duplicate recipe grid: "${seen.get(key)}" and "${r.result}" craft from the exact same 3x3 layout.`
      );
    }
    seen.set(key, r.result);
  }
})();
