import Character from './Character';
import { PartyState } from '@/utilities/Enums';
import Journal from './Journal';
import BattleLog from './BattleLog';

export default class Party {
	public id = -1;
	public mainCharacters: Character[] = [];
	public opponents: Character[] = [];
	public state: PartyState;
	/**
	 * The previous state of the party. Pulled from when switching out of combat, and pushed to whenever the state changes.
	 */
	public previousState: PartyState;
	/**
	 * Location index.
	 */
	public location = 0;
	/**
	 * Index of the location the party is heading to.
	 */
	public targetLocation = -1;
	/**
	 * Number of full world moment's the party has been at this location.
	 */
	public timeAtLocation = -1;
	/**
	 * World moment the last battle happened, or finished (if spanning multiple moments).
	 */
	public lastBattleMoment = -1;
	public journal: Journal;
	public battleLog: BattleLog;

	public constructor(id: number) {
		this.id = id;
		this.state = PartyState.AtLocationTown;
		this.previousState = PartyState.Unknown;
		this.journal = new Journal();
		this.battleLog = new BattleLog();
	}
}
