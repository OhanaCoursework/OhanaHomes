export const Islands = [
  "Maui",
  "O'ahu",
  "Hawai'i",
  "Kaua'i",
  "Moloka",
  "Lāna'i",
  "Ni'hau",
  "Kaho'olawe",
];

export class Island {
  static Maui = new Island("Maui", "maui");
  static Oahu = new Island("O'ahu", "o'ahu");
  static Hawaii = new Island("Hawai'i", "hawai'i");
  static Kauai = new Island("Kaua'i", "kaua'i");
  static Moloka = new Island("Moloka", "moloka");
  static Lānai = new Island("Lāna'i", "lāna'i");
  static Nihau = new Island("Ni'hau", "ni'hau");
  static Kahoolawe = new Island("Kaho'olawe", "kaho'olawe");

  constructor(uiText, value) {
    this.uiText = uiText;
    this.value = value;
  }

  toString() {
    return `Island.${this.value}`;
  }
}
