export class Island {
  static Maui = new Island("Maui", "maui");
  static Oahu = new Island("O'ahu", "o'ahu");
  static Hawaii = new Island("Hawai'i", "hawai'i");
  static Kauai = new Island("Kaua'i", "kaua'i");
  static Molokai = new Island("Moloka'i", "moloka'i");
  static Lānai = new Island("Lāna'i", "lāna'i");
  static Niihau = new Island("Ni'ihau", "ni'ihau");
  static Kahoolawe = new Island("Kaho'olawe", "kaho'olawe");

  constructor(uiText, value) {
    this.uiText = uiText;
    this.value = value;
  }

  static getAllValues() {
    return Object.keys(Island).map((island) => Island[island]);
  }
}
