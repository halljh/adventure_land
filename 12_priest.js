// PRIEST

var attack_mode=true

setInterval(function(){
	
	let message;
	
	if (character.rip) {
		respawn();	
	}
	
	if (character.hp/character.max_hp < .5) {
		heal(character);
	}
	if (character.max_mp - character.mp > 300) {
		use_skill('use_mp');
	}
		
	let leader;
	if (character.name === "GladiusNyoom") {
		// Gladius is party captain
		leader = character;
		set_message("Captain");
	} else {
		// Follow the captain
		let gladius = get_player("GladiusNyoom");
		if (!gladius) {
			leader = character;
		} else {
			leader = gladius;
			let dx = gladius.x - character.x;
			let dy = gladius.y - character.y;
			let distance = Math.sqrt(dx*dx+dy*dy);
			if (distance > 300) {
				move(gladius.x,gladius.y);
				return;
			}
		}
	}
	
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;
	
	if (leader.hp < leader.max_hp - character.attack) {
		heal(leader);
		set_message("Healing");
		return;
	}
	
	for (let id in parent.entities) {
		let ent = parent.entities[id];
		if (ent.type === 'character') {
			if (ent.hp < ent.max_hp - character.attack 
				&& in_attack_range(ent)
			    && (
				ent.name.includes("Nyoom")
				|| character.mp/character.max_mp > 0.7
					)) {
				heal(ent);
				set_message("Healing");
				return;
			}
		}
	}
	
	// auto attack if most of mana remains
	if (character.mp/character.max_mp > 0.6) {
		// select target for attack
		var target=get_targeted_monster();
		if(!target || parent.distance(character,target) > 400)
		{	
			if (character === leader) {
				target=get_nearest_monster({min_xp:100,max_att:120});
			} else {
				target=get_nearest_monster({min_xp:100,max_att:120,target:leader});
			}
			if(target) change_target(target);
			else
			{
				set_message("No target");
				return;
			}
		}

		if(!in_attack_range(target))
		{
			move(
				character.x+(target.x-character.x)/2,
				character.y+(target.y-character.y)/2
				);
			// Walk half the distance
		}
		else if(can_attack(target))
		{
			set_message("Attacking");
			attack(target);
		}
	}
	set_message(message);
	
},1000/4); // Loops every 1/4 seconds.