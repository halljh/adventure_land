function use_pots() {
	// health pot if wounded
	if (character.hp/character.max_hp < 0.20) {
		use_skill('use_hp');	
	}
	// mana pot if low on energy
	if (character.max_mp - character.mp >= 300 || character.mp/character.max_mp < 0.20) {
		use_skill('use_mp');
	}
}