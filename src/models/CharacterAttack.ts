import Attack from './Attack';
import { AttackType } from '@/utilities/Enums';

/**
 * Character's attack, which includes the type of attack, the character's stat, and the attack they're using.
 */
export default class CharacterAttack {
	/**
	 * Type of attack.
	 */
	attackType: AttackType;
	/**
	 * The stat value of the character performing the attack.
	 */
	statValue: number;
	/**
	 * The attack being used.
	 */
	attack: Attack;

	public constructor(attackType: AttackType, statValue: number, attack: Attack) {
		this.attackType = attackType;
		this.statValue = statValue;
		this.attack = attack;
	}
}
