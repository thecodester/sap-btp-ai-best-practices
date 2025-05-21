import Storage from "../common/storage";

const isBrowser = typeof window !== "undefined";

export default class WebStorage extends Storage {
  constructor(location: string) {
    super(location);
    this.initStorage();
  }

  protected initStorage(): void {
    if (isBrowser) {
      this.read();
    }
  }

  protected read(): Storage {
    if (!isBrowser) return this;

    const storedUsage = localStorage.getItem(this.location);
    if (null === storedUsage || undefined === storedUsage) {
      return this;
    }
    return this.toStorage(atob(storedUsage));
  }

  protected write() {
    if (!isBrowser) return;
    localStorage.setItem(this.location, btoa(this.toString()));
  }

  clear(): void {
    this.clearInternal();
    if (isBrowser) {
      localStorage.removeItem(this.location);
    }
  }
}
