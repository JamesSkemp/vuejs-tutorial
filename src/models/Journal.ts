import JournalEntry from './JournalEntry';

export default class Journal {
	private entries: JournalEntry[] = [];

	public constructor() {
		// TODO
	}

	/**
	 * Adds a new entry to the journal.
	 *
	 * @param currentMoment The current world moment of the entry.
	 * @param message Message for the journal entry.
	 */
	public addEntry(currentMoment: number, message: string): void {
		this.entries.push(new JournalEntry(currentMoment, message));
	}

	/**
	 * Get the number of entries in the journal.
	 *
	 * @returns Number of entries.
	 */
	public count(): number {
		return this.entries.length;
	}

	/**
	 * Removes all entries from the journal.
	 */
	public erase(): void {
		this.entries = [];
	}
}
