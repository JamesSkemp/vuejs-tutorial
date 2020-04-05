export default class BaseStats {
	public health: number;
	public melee: number;
	public range: number;
	public magic: number;
	public dodge: number;
	public armor: number;
	public speed: number;
	public damage: string;

	public constructor(health: number, melee: number, range: number, magic: number, dodge: number, armor: number, speed: number, damage: string) {
		this.health = health;
		this.melee = melee;
		this.range = range;
		this.magic = magic;
		this.dodge = dodge;
		this.armor = armor;
		this.speed = speed;
		this.damage = damage;
	}
}
