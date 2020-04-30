<template>
	<div>
		<h5>Character {{ character.id }}</h5>
		<p>
			{{ this.healthText }}<br />
			{{ baseStats }}<br />
		</p>
		<p style="overflow-wrap: break-word;">{{ JSON.stringify(character) }}</p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Character from '../models/Character';
import { getShortBaseStats } from '../utilities/CharacterUtilities';
@Component
export default class CharacterDisplay extends Vue {
	@Prop() character!: Character;
	healthText = '';
	baseStats = '';

	created() {
		this.healthText = `Health: ${this.character.currentHealth} of ${this.character.baseStats.health}`;
		this.baseStats = getShortBaseStats(this.character);
	}
}
</script>

<style scoped>
</style>
