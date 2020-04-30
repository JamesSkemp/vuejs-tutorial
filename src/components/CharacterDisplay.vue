<template>
	<div>
		<h5>Character {{ character.id }}</h5>
		<p>
			{{ this.healthText }}<br />
			Base Stats: {{ baseStats }}<br />
			Current Stats: {{ currentStats }}<br />
		</p>
		<p style="overflow-wrap: break-word;">{{ JSON.stringify(character) }}</p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Character from '../models/Character';
import { getShortBaseStats, getCurrentStats } from '../utilities/CharacterUtilities';
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
}
</script>

<style scoped>
</style>
