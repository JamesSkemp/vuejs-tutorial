/**
 * A battle log message.
 */
export default interface BattleLogMessage {
	/**
	 * Current battle turn.
	 */
	turn: number;
	/**
	 * Message that should be logged.
	 */
	message: string;
}
