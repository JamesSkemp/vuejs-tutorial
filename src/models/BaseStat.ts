import Attack from './Attack';

export default class BaseStat {
	public value: number;
	// TODO change to proper class instead of just storing die roll
	public attacks: Attack[];

	public constructor(value: number, attack?: Attack) {
		this.value = value;
		this.attacks = [];
		if (attack) {
			console.log(attack);
			this.attacks.push(attack);
		}
	}
}
