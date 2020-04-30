<template>
	<div class="partyBlock">
		<h3>{{ partyHeading }}</h3>
		<button v-on:click="displayDisbandParty">Disband party</button>
		<br />
		<button v-on:click="displaySortHealth">Sort by health</button>
		<button v-on:click="displaySortDodge">Sort by dodge</button>
		<button v-on:click="displaySortArmor">Sort by armor</button>
		<button v-on:click="displaySortSpeed">Sort by speed</button>
		<div>
			State: {{ stateText }}
			<div v-if="party.mainCharacters.length > 0">
				<h4>Main characters ({{ party.mainCharacters.length }})</h4>
				<div>
					<CharacterDisplay v-for="character in party.mainCharacters" :character="character" :key="character.id" />
				</div>
			</div>
			<div v-else>
				<p>There are no characters in this party.</p>
			</div>
			<div v-if="party.opponents.length > 0">
				<h4>Opponents</h4>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CharacterDisplay from './CharacterDisplay.vue';
import Party from '../models/Party';
import { partyStateToText } from '../utilities/Enums'
import { disbandParty } from '../utilities/WorldUtilities';
import World from '../models/World';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
@Component({
	components: {
		CharacterDisplay
	}
})

export default class PartyDisplay extends Vue {
	@Prop() private world!: World;
	@Prop() private party!: Party;
	partyHeading ='';
	stateText = '';

	created() {
		this.partyHeading = `Party ${this.party.id}`;
		this.stateText = partyStateToText(this.party.state);
	}

	displayDisbandParty(): void {
		disbandParty(this.world, this.party);
		this.$forceUpdate();
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
}
</script>

<style scoped>
	.partyBlock {
		/*display:inline-block;
		vertical-align:top;
		width:45%;*/
	}
</style>
