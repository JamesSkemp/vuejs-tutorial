import Character from './Character';

export default class Party {
	public id: number = -1;
	public mainCharacters: Character[] = [];
	public opponents: Character[] = [];
	// TODO isResting?, location?

	public constructor(id: number) {
		this.id = id;
		// TODO?
	}
}
