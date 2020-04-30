export default class Attack {
	public id: number;
	public name: string;
	public damage: string;
	public cooldown: number = 0;
	public meleeMod: number = 0;
	public rangeMod: number = 0;
	public magicMod: number = 0;
	public dodgeMod: number = 0;
	public armorMod: number = 0;
	public speedMod: number = 0;

	public constructor(id: number, name: string, damage: string, cooldown?: number, meleeMod?: number, rangeMod?: number, magicMod?: number, dodgeMod?: number, armorMod?: number, speedMod?: number) {
		this.id = id;
		this.name = name;
		this.damage = damage;
		if (cooldown) {
			this.cooldown = cooldown;
		}
		if (meleeMod) {
			this.meleeMod = meleeMod;
		}
		if (rangeMod) {
			this.rangeMod = rangeMod;
		}
		if (magicMod) {
			this.magicMod = magicMod;
		}
		if (dodgeMod) {
			this.dodgeMod = dodgeMod;
		}
		if (armorMod) {
			this.armorMod = armorMod;
		}
		if (speedMod) {
			this.speedMod = speedMod;
		}
	}
}
