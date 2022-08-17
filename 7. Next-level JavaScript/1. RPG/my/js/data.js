import Character from './Character.js'

export default new Character({
	name: 'wizard',
	health: 100,
	diceCount: 3,
	dices: [],

})
export const monsters = [new Character({
	name: 'orc',
	health: 40,
	diceCount: 2,
	dices: []
}),
new Character({
	name: 'goblin',
	health: 30,
	diceCount: 2,
	dices: []
}),
new Character({
	name: 'demon',
	health: 70,
	diceCount: 2,
	dices: []
})
]


