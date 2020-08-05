<template>
	<b-container>
		<b-row>
			<b-col>
				<h3>Party {{this.party.id}}</h3>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<button v-on:click="displayDisbandParty">Disband party</button>
			</b-col>
			<b-col>
				<button v-on:click="addOpponent">Add an opponent</button>
			</b-col>
			<b-col>
				<button v-on:click="displaySortHealth">Sort by health</button>
				<button v-on:click="displaySortDodge">Sort by dodge</button>
				<button v-on:click="displaySortArmor">Sort by armor</button>
				<button v-on:click="displaySortSpeed">Sort by speed</button>
			</b-col>
		</b-row>
		<b-row>
			<div>
				State: {{ stateText }}
				<div v-if="party.mainCharacters.length > 0">
					<h4>Main characters ({{ party.mainCharacters.length }})</h4>
					<div>
						<CharacterDisplay v-for="character in party.mainCharacters" :party="party" :character="character" :key="character.id" />
					</div>
				</div>
				<div v-else>
					<p>There are no characters in this party.</p>
				</div>
				<div v-if="party.opponents.length > 0">
					<h4>Opponents</h4>
					<div>
						<CharacterDisplay v-for="opponent in party.opponents" :party="party" :character="opponent" :key="opponent.id" />
					</div>
				</div>
			</div>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CharacterDisplay from './CharacterDisplay.vue';
import Party from '../models/Party';
import { partyStateToText } from '../utilities/Enums'
import { disbandParty } from '../utilities/WorldUtilities';
import World from '../models/World';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
import { addOpponent } from '../utilities/PartyUtilities';
import Character from '../models/Character';
@Component({
	components: {
		CharacterDisplay
	}
})

export default class PartyDisplay extends Vue {
	@Prop() private world!: World;
	@Prop() private party!: Party;
	stateText = '';

	created(): void {
		this.stateText = partyStateToText(this.party.state);
	}

	displayDisbandParty(): void {
		disbandParty(this.world, this.party);
		this.$forceUpdate();
		this.$emit('party-disbanded', this.party.id);
	}

	displaySortHealth(): void {
		sortByHealth(this.party.mainCharacters);
		this.$forceUpdate();
	}

	displaySortDodge(): void {
		sortByDodge(this.party.mainCharacters);
		this.$forceUpdate();
	}

	displaySortArmor(): void {
		sortByArmor(this.party.mainCharacters);
		this.$forceUpdate();
	}

	displaySortSpeed(): void {
		sortBySpeed(this.party.mainCharacters);
		this.$forceUpdate();
	}

	addOpponent(): void {
		const opponent = new Character(-1);
		opponent.baseStats.health = 10;
		opponent.currentHealth = 10;
		opponent.baseStats.melee.attacks[0].damage = '1d4';

		addOpponent(this.party, opponent);
		this.$forceUpdate();
	}
}
</script>

<style scoped>
</style>
