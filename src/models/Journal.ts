import JournalEntry from './JournalEntry';

/**
 * Represents a journal or log. The world, parties, and characters can all have a journal.
 */
export default class Journal {
	/**
	 * Entries in the journal.
	 */
	public entries: JournalEntry[] = [];

	public constructor() {
		// TODO
		// TODO import utility? and should the below be utilities instead?
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
}
