import Character from './Character';
import { PartyState } from '@/utilities/Enums';

export default class Party {
	public id: number = -1;
	public mainCharacters: Character[] = [];
	public opponents: Character[] = [];
	public state: PartyState;
	// TODO isResting? (defined in state, but needs to be used), location?

	public constructor(id: number) {
		this.id = id;
		this.state = PartyState.AtLocationTown;
		// TODO?
	}
}
