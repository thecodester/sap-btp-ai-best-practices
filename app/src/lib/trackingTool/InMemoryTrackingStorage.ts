import Usage from "./automated-usage-tracking-tool/common/usage";

export class InMemoryTrackingStorage {
  private static instance: InMemoryTrackingStorage;
  private storage: Map<string, Usage[]>;
  private sessionId: string;

  private constructor() {
    this.storage = new Map();
    this.sessionId = crypto.randomUUID();
  }

  public static getInstance(): InMemoryTrackingStorage {
    if (!InMemoryTrackingStorage.instance) {
      InMemoryTrackingStorage.instance = new InMemoryTrackingStorage();
    }
    return InMemoryTrackingStorage.instance;
  }

  public addUsage(toolName: string, featureName: string): void {
    const usage = new Usage(toolName, featureName);
    if (!this.storage.has(this.sessionId)) {
      this.storage.set(this.sessionId, []);
    }
    this.storage.get(this.sessionId)?.push(usage);
  }

  public getUsages(): Usage[] {
    return this.storage.get(this.sessionId) || [];
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public clear(): void {
    this.storage.delete(this.sessionId);
  }
}
