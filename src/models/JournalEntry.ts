export default class JournalEntry {
	/**
	 * Current UTC timestamp/number of seconds of the entry. Automatically set.
	 */
	public realDateTime: number;
	/**
	 * The current world moment of the entry.
	 */
	public worldMoment: number;
	/**
	 * Message for the journal entry.
	 */
	public message = "";

	public constructor(currentMoment: number, message: string) {
		this.realDateTime = Date.now();
		this.worldMoment = currentMoment;
		this.message = message;
	}
}
