import Character from './Character';
import { PartyState } from '@/utilities/Enums';
import Journal from './Journal';

export default class Party {
	public id = -1;
	public mainCharacters: Character[] = [];
	public opponents: Character[] = [];
	public state: PartyState;
	// TODO set the following items
	public location = -1;
	public timeAtLocation = -1;
	public targetLocation = -1;
	public journal: Journal;

	public constructor(id: number) {
		this.id = id;
		this.state = PartyState.AtLocationTown;
		this.journal = new Journal();
		// TODO?
	}
}
