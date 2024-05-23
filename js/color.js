class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  getStringAverageColorHex() {
    const r = Math.round(this.red).toString(16).padStart(2, "0");
    const g = Math.round(this.green).toString(16).padStart(2, "0");
    const b = Math.round(this.blue).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
}

class AverageColor extends Color {
  constructor(red, green, blue, count) {
    super(red, green, blue);
    this.count = count;
  }

  addColor(red, green, blue) {
    this.count++;
    this.red = this.#calcNewAverage(this.red, red, this.count);
    this.green = this.#calcNewAverage(this.green, green, this.count);
    this.blue = this.#calcNewAverage(this.blue, blue, this.count);
  }

  #calcNewAverage(oldAvg, newColor, count) {
    if (count === 0) return;
    return Math.round(oldAvg * ((count - 1) / count) + newColor * (1 / count));
  }
}
