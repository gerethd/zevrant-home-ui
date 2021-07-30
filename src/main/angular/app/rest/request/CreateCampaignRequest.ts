export class CreateCampaignRequest {

    constructor(private name: string, private ruleset: string, private frequency: string,
                private startDate: string, private startTime: string, private offset: number) {
    }

    get campaignName(): string {
        return this.name;
    }

    set campaignName(value: string) {
        this.name = value;
    }

    get getRuleset(): string {
        return this.ruleset;
    }

    set setRuleset(value: string) {
        this.ruleset = value;
    }

    get getFrequency(): string {
        return this.frequency;
    }

    set setFrequency(value: string) {
        this.frequency = value;
    }

    get getStartDate(): string {
        return this.startDate;
    }

    set setStartDate(value: string) {
        this.startDate = value;
    }

    get getStartTime(): string {
        return this.startTime;
    }

    set setStartTime(value: string) {
        this.startTime = value;
    }

    get getOffset(): number {
        return this.offset;
    }

    set setOffset(value: number) {
        this.offset = value;
    }

}
