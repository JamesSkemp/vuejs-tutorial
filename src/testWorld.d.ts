import Vue from 'vue';
import World from './models/World';

declare module 'vue/types/vue' {
	interface Vue {
		$world: World;
		$testWorld: World;
	}
}
