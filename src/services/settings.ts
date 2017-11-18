export class SettingsService {
  private altBeckgorund = false;

  setBackgorund(isAlt: boolean) {
    this.altBeckgorund = isAlt;
  }

  isAltBackground() {
    return this.altBeckgorund;
  }
}
