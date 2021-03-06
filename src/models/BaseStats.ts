import BaseStat from './BaseStat';

export default class BaseStats {
	public health: number;
	public melee: BaseStat;
	public range: BaseStat;
	public magic: BaseStat;
	/**
	 * Base dodge of the character. Base value is 6 for adventurers.
	 */
	public dodge: number;
	/**
	 * Base armor of the character. Base value is 0 for adventurers.
	 */
	public armor: number;
	/**
	 * Base speed of the character. Base value is 10 for adventurers.
	 */
	public speed: number;

	public constructor(health: number, melee: number, range: number, magic: number, dodge: number, armor: number, speed: number) {
		this.health = health;
		this.melee = new BaseStat(melee);
		this.range = new BaseStat(range);
		this.magic = new BaseStat(magic);
		this.dodge = dodge;
		this.armor = armor;
		this.speed = speed;
	}
}
