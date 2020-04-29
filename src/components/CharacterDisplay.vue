<template>
	<div>
		<h4>Character {{ character.id }}</h4>
		<p>{{ this.healthText }}<br />
		</p>
		<p style="overflow-wrap: break-word;">{{ JSON.stringify(character) }}</p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Character from '../models/Character';
@Component
export default class CharacterDisplay extends Vue {
	@Prop() character!: Character;
	healthText = '';

	created() {
		this.healthText = `Health: ${this.character.currentHealth} of ${this.character.baseStats.health}`;
	}
}
</script>

<style scoped>
</style>
