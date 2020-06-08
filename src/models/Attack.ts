export default class Attack {
	public id: number;
	public name: string;
	public damage: string;
	public cooldown = 0;
	public meleeMod = 0;
	public rangeMod = 0;
	public magicMod = 0;
	public dodgeMod = 0;
	public armorMod = 0;
	public speedMod = 0;

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

// TODO how does any of the stat mods work?
// TODO how is cooldown tracked?
