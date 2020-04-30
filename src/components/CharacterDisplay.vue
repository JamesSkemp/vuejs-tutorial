<template>
	<div>
		<h5>Character {{ character.id }}, {{ character.name }}</h5>
		<p>
			{{ this.healthText }}<br />
			Base Stats: {{ baseStats }}<br />
			Current Stats: {{ currentStats }}<br />
		</p>
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
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Character from '../models/Character';
import { getAttackText } from '../utilities/AttackUtilities';
import { getShortBaseStats, getCurrentStats } from '../utilities/CharacterUtilities';
import Attack from '../models/Attack';
@Component
export default class CharacterDisplay extends Vue {
	@Prop() character!: Character;
	healthText = '';
	baseStats = '';
	currentStats = '';

	created() {
		this.healthText = `Health: ${this.character.currentHealth} of ${this.character.baseStats.health}`;
		this.baseStats = getShortBaseStats(this.character);
		this.currentStats = getCurrentStats(this.character);
	}

	displayAttackText(attack: Attack) {
		return getAttackText(attack);
	}

	getMeleeText() {
		return `Melee: ${this.character.baseStats.melee.value}<br />
		${JSON.stringify(this.character.baseStats.melee.attacks)}`;
	}

	getRangeText() {
		return `Range: ${this.character.baseStats.range.value}<br />
		${JSON.stringify(this.character.baseStats.range.attacks)}`;
	}

	getMagicText() {
		return `Magic: ${this.character.baseStats.magic.value}<br />
		${JSON.stringify(this.character.baseStats.magic.attacks)}`;
	}
}
</script>

<style scoped>
</style>
