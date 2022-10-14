// ==================================================
// Simple & Visually Distinct Colors Generator
//
// Description:
//   Generate palettes of optimally distinct colors.
// Note:
//   Some of the color names (like blue or green) don't match up to typical HTML or RGB conventions.
// Sections:
//   - 20 Distinct Colors
//   - Built-in Functions
//   - Exported Functions
// References:
//   - [List of 20 Simple, Distinct Colors by Sasha Trubetskoy](https://sashamaps.net/docs/resources/20-colors/)
//   - [Kelly's 22 Colors of Maximum Contrast](https://artshacker.com/wp-content/uploads/2014/12/Kellys-22-colour-chart.jpg)
//   - [Visually Distinct Colors Generator](https://mokole.com/palette.html)
// ==================================================

// ==================================================
// 20 Distinct Colors
// ==================================================

const DISTINCT_COLORS = [
  {
    id: 1,
    name: "red",
    hex: "#e6194b",
    rgb: [230, 25, 75],
    cmyk: [0, 100, 66, 0],
  },
  {
    id: 2,
    name: "green",
    hex: "#3cb44b",
    rgb: [60, 180, 75],
    cmyk: [75, 0, 100, 0],
  },
  {
    id: 3,
    name: "yellow",
    hex: "#ffe119",
    rgb: [255, 225, 25],
    cmyk: [0, 25, 95, 0],
  },
  {
    id: 4,
    name: "blue",
    hex: "#4363d8",
    rgb: [0, 130, 200],
    cmyk: [100, 35, 0, 0],
  },
  {
    id: 5,
    name: "orange",
    hex: "#f58231",
    rgb: [245, 130, 48],
    cmyk: [0, 60, 92, 0],
  },
  {
    id: 6,
    name: "purple",
    hex: "#911eb4",
    rgb: [145, 30, 180],
    cmyk: [35, 70, 0, 0],
  },
  {
    id: 7,
    name: "cyan",
    hex: "#42d4f4",
    rgb: [70, 240, 240],
    cmyk: [70, 0, 0, 0],
  },
  {
    id: 8,
    name: "magenta",
    hex: "#f032e6",
    rgb: [240, 50, 230],
    cmyk: [0, 100, 0, 0],
  },
  {
    id: 9,
    name: "lime",
    hex: "#bfef45",
    rgb: [210, 245, 60],
    cmyk: [35, 0, 100, 0],
  },
  {
    id: 10,
    name: "pink",
    hex: "#fabed4",
    rgb: [250, 190, 212],
    cmyk: [0, 24, 100, 2],
  },
  {
    id: 11,
    name: "teal",
    hex: "#469990",
    rgb: [0, 128, 128],
    cmyk: [100, 0, 0, 50],
  },
  {
    id: 12,
    name: "lavender",
    hex: "#dcbeff",
    rgb: [220, 190, 255],
    cmyk: [14, 25, 100, 0],
  },
  {
    id: 13,
    name: "brown",
    hex: "#9a6324",
    rgb: [170, 110, 40],
    cmyk: [0, 35, 75, 33],
  },
  {
    id: 14,
    name: "beige",
    hex: "#fffac8",
    rgb: [255, 250, 200],
    cmyk: [5, 10, 30, 0],
  },
  {
    id: 15,
    name: "maroon",
    hex: "#800000",
    rgb: [128, 0, 0],
    cmyk: [0, 100, 100, 50],
  },
  {
    id: 16,
    name: "mint",
    hex: "#aaffc3",
    rgb: [170, 255, 195],
    cmyk: [33, 0, 23, 0],
  },
  {
    id: 17,
    name: "olive",
    hex: "#808000",
    rgb: [128, 128, 0],
    cmyk: [0, 0, 100, 50],
  },
  {
    id: 18,
    name: "apricot",
    hex: "#ffd8b1",
    rgb: [255, 215, 180],
    cmyk: [0, 15, 30, 0],
  },
  {
    id: 19,
    name: "navy",
    hex: "#000075",
    rgb: [0, 0, 128],
    cmyk: [100, 100, 0, 50],
  },
  {
    id: 20,
    name: "grey",
    hex: "#a9a9a9",
    rgb: [128, 128, 128],
    cmyk: [0, 0, 0, 50],
  },
];

// ==================================================
// Built-in Functions
// ==================================================

function deepFreeze(object) {
  // Retrieve the property names defined on object.
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self.
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  // Freeze self.
  return Object.freeze(object);
}

// ==================================================
// Exported Functions
// ==================================================

export const palette = (count) => {
  let allColors = [];

  const repeat = Math.ceil(count / DISTINCT_COLORS.length);
  for (let i = 0; i < repeat; i++) {
    allColors = allColors.concat(DISTINCT_COLORS);
  }

  return deepFreeze(allColors.slice(0, count));
};
