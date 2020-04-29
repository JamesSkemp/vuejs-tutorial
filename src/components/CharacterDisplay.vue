<template>
	<div>
		<h4>Character {{ character.id }}</h4>
		<p>Health: {{ character.currentHealth }} of {{ character.baseStats.health }}<br />
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
}
</script>

<style scoped>
</style>
