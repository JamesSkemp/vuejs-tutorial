import Character from './Character';

export default class World {
	/**
	 * Current moment in time. Starts at 0 when a world is created, and determines what actions happen in the world.
	 */
	public currentMoment: number = 0;
	private nextCharacterId: number = -1;
	public mainCharacters: Character[] = [];

	public constructor() {
		// TODO add particular character to world?
	}

	public startNextMoment(): void {
		// TODO
		this.currentMoment++;
	}

	/**
	 * Initializes and returns next character id.
	 */
	public generateNextChracterId(): number {
		return this.nextCharacterId++;
	}
}