import BattleLogMessage from './BattleLogMessage';

/**
 * Party battle log for tracking combat.
 */
export default class BattleLog {
	/**
	 * World moment the battle was started.
	 */
	public currentMoment = -1;
	/**
	 * Messages logged.
	 */
	public messages: BattleLogMessage[] = [];
}
