import WebTracker from "./webTracker";
import { ConsentArguments, CustomTrackUsageArguments, TrackUsageArguments, TrackerArguments } from "../common/tracker";
import Storage from "../common/storage";

export default class Web {
  private tracker: WebTracker;

  constructor(trackerArguments: TrackerArguments) {
    this.tracker = new WebTracker(trackerArguments);
  }

  async requestConsentQuestion(consentArguments: ConsentArguments = {}): Promise<boolean> {
    return await this.tracker.requestConsentQuestion(consentArguments);
  }

  async requestConsentConfirmation(consentArguments: ConsentArguments = {}): Promise<boolean> {
    return await this.tracker.requestConsentConfirmation(consentArguments);
  }

  async trackUsage(trackUsageArguments: TrackUsageArguments): Promise<void> {
    return await this.tracker.trackUsage(trackUsageArguments);
  }

  isConsentGranted(): boolean {
    return this.tracker.storage.isConsentGranted();
  }

  async customTrackUsage(trackUsageArguments: CustomTrackUsageArguments): Promise<void> {
    await this.tracker.customTrackUsage(trackUsageArguments);
  }

  get storage(): Storage {
    return this.tracker.storage;
  }
}
