<template>
	<b-container>
		<b-row>
			<b-col>
				<h5>Character {{ character.id }}, {{ character.name }}</h5>
				<p>Desire: {{ getDesire() }}</p>
			</b-col>
		</b-row>
		<b-row align-v="start">
			<b-col>
				<strong>Current Stats</strong><br />
				<span v-for="stat in currentStats()" :key="stat">
					{{stat}}<br />
				</span>
			</b-col>
			<b-col>
				<strong>Stat Mods:</strong><br />
				<span v-for="statMod in statMods()" :key="statMod">{{statMod}}<br /></span>
			</b-col>
			<b-col>
				<strong>Base Stats</strong><br />
				Health {{character.baseStats.health}}<br />
				Melee {{character.baseStats.melee.value}}<br />
				Range {{character.baseStats.range.value}}<br />
				Magic {{character.baseStats.magic.value}}<br />
				Dodge {{character.baseStats.dodge}}<br />
				Armor {{character.baseStats.armor}}<br />
				Speed {{character.baseStats.speed}}
			</b-col>
		</b-row>
		<b-row>
			<p>
				Health: {{ character.currentHealth }} of {{ character.baseStats.health }}<br />
			</p>
			<p v-if="character.lastAttack >= 0"><br />Last attack: {{ character.lastAttack }}</p>
			<p v-if="character.nextAttack >= 0"><br />Next attack: {{ character.nextAttack }}</p>
			<p v-html="getMeleeText()"></p>
			<ul v-if="character.baseStats.melee.attacks.length > 0">
				<li v-for="attack in character.baseStats.melee.attacks" :key="attack.name">
					{{ displayAttackText(attack) }}
				</li>
			</ul>
			<p v-html="getRangeText()"></p>
			<ul v-if="character.baseStats.range.attacks.length > 0">
				<li v-for="attack in character.baseStats.range.attacks" :key="attack.name">
					{{ displayAttackText(attack) }}
				</li>
			</ul>
			<p v-html="getMagicText()"></p>
			<ul v-if="character.baseStats.magic.attacks.length > 0">
				<li v-for="attack in character.baseStats.magic.attacks" :key="attack.name">
					{{ displayAttackText(attack) }}
				</li>
			</ul>
			<p style="overflow-wrap: break-word;">{{ JSON.stringify(character) }}</p>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Character from '../models/Character';
import { getAttackText } from '../utilities/AttackUtilities';
import { getShortBaseStats, getCurrentStats, getStatModifications, getCharacterDesire } from '../utilities/CharacterUtilities';
import Attack from '../models/Attack';
import { desireToText } from '../utilities/Enums';
import Party from '../models/Party';
@Component
export default class CharacterDisplay extends Vue {
	@Prop() party!: Party;
	@Prop() character!: Character;
	// TODO remove?
	baseStats = '';
	// TODO remove?
	statModifications = '';

	created(): void {
		this.refreshData();
	}

	currentStats(): string[] {
		return getCurrentStats(this.character);
	}

	statMods(): string[] {
		return getStatModifications(this.character);
	}

	displayAttackText(attack: Attack): string {
		return getAttackText(attack);
	}

	getMeleeText(): string {
		return `Melee: ${this.character.baseStats.melee.value}<br />
		${JSON.stringify(this.character.baseStats.melee.attacks)}`;
	}

	getRangeText(): string {
		return `Range: ${this.character.baseStats.range.value}<br />
		${JSON.stringify(this.character.baseStats.range.attacks)}`;
	}

	getMagicText(): string {
		return `Magic: ${this.character.baseStats.magic.value}<br />
		${JSON.stringify(this.character.baseStats.magic.attacks)}`;
	}

	getDesire(): string {
		return desireToText(getCharacterDesire(this.party, this.character));
	}

	refreshData(): void {
		this.baseStats = getShortBaseStats(this.character);
	}
}
</script>

<style scoped>
</style>
