set_message("Warrior Init");

var attack_mode=true

setInterval(function(){
	
	if (character.rip) {
		respawn();	
	}
	
	// use health or mana pots as needed
	use_pots();
	
	let leader;
	if (character.name === "GladiusNyoom") {
		// Gladius is party captain
		leader = character;
		set_message("Captain");
	} else {
		let gladius = get_player("GladiusNyoom");
		leader = gladius;
		let dx = gladius.x - character.x;
		let dy = gladius.y - character.y;
		let distance = Math.sqrt(dx*dx+dy*dy);
		if (distance > 300) {
			move(gladius.x,gladius.y);
			return;
		}
	}
	
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;
	
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
			set_message("No Monsters");
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
		//set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.