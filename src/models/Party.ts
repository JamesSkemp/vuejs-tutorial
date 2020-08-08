import Character from './Character';
import { PartyState } from '@/utilities/Enums';
import Journal from './Journal';

export default class Party {
	public id = -1;
	public mainCharacters: Character[] = [];
	public opponents: Character[] = [];
	public state: PartyState;
	/**
	 * Location index.
	 */
	public location = 0;
	/**
	 * Number of full world moment's the party has been at this location.
	 */
	public timeAtLocation = -1;
	/**
	 * Index of the location the party is heading to.
	 */
	public targetLocation = -1;
	public journal: Journal;

	public constructor(id: number) {
		this.id = id;
		this.state = PartyState.AtLocationTown;
		this.journal = new Journal();
	}
}
