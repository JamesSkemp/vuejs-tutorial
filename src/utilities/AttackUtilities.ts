import Attack from '@/models/Attack';

export function getAttackText(attack: Attack): string {
	const cooldown = attack.cooldown === 0 ? '' : `Cooldown ${attack.cooldown}.`;
	const meleeMod = attack.meleeMod === 0 ? '' : ` Melee ${attack.meleeMod}`;
	const rangeMod = attack.rangeMod === 0 ? '' : ` Range ${attack.rangeMod}`;
	const magicMod = attack.magicMod === 0 ? '' : ` Magic ${attack.magicMod}`;
	const dodgeMod = attack.dodgeMod === 0 ? '' : ` Dodge ${attack.dodgeMod}`;
	const armorMod = attack.armorMod === 0 ? '' : ` Armor ${attack.armorMod}`;
	const speedMod = attack.speedMod === 0 ? '' : ` Speed ${attack.speedMod}`;

	return `[${attack.id}] ${attack.name} Attack - ${attack.damage} damage. ${cooldown} ${meleeMod} ${rangeMod} ${magicMod} ${dodgeMod} ${armorMod} ${speedMod}`;
}
