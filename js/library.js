


var mainTypes = [
	{
		name: "guardsman",
		move: 2,
		wounds: 2,
		size: "small",
		hostileActions: [
			{
				name: "fury",
				effect: "do _onslaught_ action. re-roll failed attacks.",
			},
			{
				name: "rush",
				effect: "move towards closest explorer. then do _charge_ action.",
			},
		],
		hostilePositions: [
			{
				name: "hidden",
				description: "no line of sight to an explorer",
				table: [ 
						{ "min": 1, "max": 3, "action": "hold", },
						{ "min": 4, "max": 6, "action": "sneak", },
						{ "min": 7, "max": 9, "action": "advance", },
						{ "min": 10, "max": 12, "action": "advance", },
						{ "min": 13, "max": 15, "action": "charge", },
						{ "min": 16, "max": 19, "action": "charge", },
						{ "min": 20, "max": 20, "action": "rush", },
						],
			},
			{
				name: "engaged",
				description: "adjacent to a visible explorer",
				table: [ 
						{ "min": 1, "max": 3, "action": "fallBack", },
						{ "min": 4, "max": 6, "action": "onslaught", },
						{ "min": 7, "max": 9, "action": "onslaught", },
						{ "min": 10, "max": 12, "action": "onslaught", },
						{ "min": 13, "max": 15, "action": "onslaught", },
						{ "min": 16, "max": 19, "action": "onslaught", },
						{ "min": 20, "max": 20, "action": "fury", },
						],
			},
			{
				name: "in cover",
				description: "armed with lasgun and in cover from all visible explorers",
				table: [ 
						{ "min": 1, "max": 3, "action": "aim", },
						{ "min": 4, "max": 6, "action": "aim", },
						{ "min": 7, "max": 9, "action": "aim", },
						{ "min": 10, "max": 12, "action": "onslaught", },
						{ "min": 13, "max": 15, "action": "onslaught", },
						{ "min": 16, "max": 19, "action": "onslaught", },
						{ "min": 20, "max": 20, "action": "fury", },
						],
			},
			{
				name: "close",
				description: "range to the closest visible explorer is 2 or 3 hexes",
				table: [ 
						{ "min": 1, "max": 3, "action": "fallBack", },
						{ "min": 4, "max": 6, "action": "onslaught", },
						{ "min": 7, "max": 9, "action": "onslaught", },
						{ "min": 10, "max": 12, "action": "charge", },
						{ "min": 13, "max": 15, "action": "charge", },
						{ "min": 16, "max": 19, "action": "charge", },
						{ "min": 20, "max": 20, "action": "fury", },
						],
			},
			{
				name: "other",
				description: "any other situation",
				table: [ 
						{ "min": 1, "max": 3, "action": "advance", },
						{ "min": 4, "max": 6, "action": "advance", },
						{ "min": 7, "max": 9, "action": "aim", },
						{ "min": 10, "max": 12, "action": "aim", },
						{ "min": 13, "max": 15, "action": "onslaught", },
						{ "min": 16, "max": 19, "action": "onslaught", },
						{ "min": 20, "max": 20, "action": "rush", },
						],
			},
		],
	},
	{
		name: "ur-ghul",
		move: 3,
		wounds: 3,
		size: "small",
		hostileActions: [
			{
				name: "pounce",
				effect: "if explorer adjacent then do _onslaught_ action. otherwise _charge_ action. re-roll failed attacks.",
			},
			{
				name: "rush",
				effect: "move towards closest explorer. then do _charge_ action.",
			},
		],
		hostilePositions: [
			{
				name: "hidden",
				description: "no line of sight to an explorer",
				table: [ 
						{ "min": 1, "max": 3, "action": "hold", },
						{ "min": 4, "max": 6, "action": "sneak", },
						{ "min": 7, "max": 9, "action": "sneak", },
						{ "min": 10, "max": 12, "action": "charge", },
						{ "min": 13, "max": 15, "action": "charge", },
						{ "min": 16, "max": 19, "action": "charge", },
						{ "min": 20, "max": 20, "action": "rush", },
						],
			},
			{
				name: "engaged",
				description: "adjacent to a visible explorer",
				table: [ 
						{ "min": 1, "max": 3, "action": "fallBack", },
						{ "min": 4, "max": 6, "action": "fallBack", },
						{ "min": 7, "max": 9, "action": "onslaught", },
						{ "min": 10, "max": 12, "action": "onslaught", },
						{ "min": 13, "max": 15, "action": "onslaught", },
						{ "min": 16, "max": 19, "action": "onslaught", },
						{ "min": 20, "max": 20, "action": "pounce", },
						],
			},
			{
				name: "close",
				description: "range to the closest visible explorer is 2 or 3 hexes",
				table: [ 
						{ "min": 1, "max": 3, "action": "fallBack", },
						{ "min": 4, "max": 6, "action": "fallBack", },
						{ "min": 7, "max": 9, "action": "charge", },
						{ "min": 10, "max": 12, "action": "charge", },
						{ "min": 13, "max": 15, "action": "charge", },
						{ "min": 16, "max": 19, "action": "charge", },
						{ "min": 20, "max": 20, "action": "pounce", },
						],
			},
			{
				name: "other",
				description: "any other situation",
				table: [ 
						{ "min": 1, "max": 3, "action": "fallBack", },
						{ "min": 4, "max": 6, "action": "fallBack", },
						{ "min": 7, "max": 9, "action": "fallBack", },
						{ "min": 10, "max": 12, "action": "rush", },
						{ "min": 13, "max": 15, "action": "rush", },
						{ "min": 16, "max": 19, "action": "rush", },
						{ "min": 20, "max": 20, "action": "rush", },
						],
			},			
		],
	},
]


var hostileTypes = [
	{
		mainType: "guardsman",
		name: "lasgun",
		range1: "1d8",
		range2: "1d8",
		range3: "1d8",
	},
	{
		mainType: "guardsman",
		name: "pistolMelee",
		range1: "2d8",
		range2: "1d6",
		range3: "1d6",
	},
	{
		mainType: "guardsman",
		name: "sergeant",
		range1: "2d8",
		range2: "1d6",
		range3: "1d6",
		modelClause: "wound+1",
	},
	{
		mainType: "guardsman",
		name: "flamer",
		range1: "1d12",
		range2: "1d12",
		range3: "na",
		weaponClause: "moveup",
	},
	{
		mainType: "guardsman",
		name: "grenade",
		range1: "1d6",
		range2: "1d8",
		range3: "1d8",
		weaponClause: "blast",
	},
	{
		mainType: "ur-ghul",
		name: "ur-ghul",
		range1: "1d8",
		range2: "na",
		range3: "na",
		weaponClause: "frenzied",
		modelClause: "hideShadows",
	},
]


var clauses = [
	{
		name: "moveup",
		effect: "the model moves toward the closest explorer instead of attacking if range > 3 hexes.",
	},
	{
		name: "blast",
		effect: "ignore cover. attack roll against each explorer in hex.",
	},
	{
		name: "wound+1",
		effect: "add 1 to wounds value of this model.",
	},
	{
		name: "frenzied",
		effect: "make 3 attacks (always).",
	},
	{
		name: "hideShadows",
		effect: "treat model as in cover if more than 3 hexes from explorer.",
	},
]


var hostileActions = [
	{
		name: "advance",
		effect: "move towards closest explorer. then attack closest explorer that is in range and visible to the model.",
	},
	{
		name: "aim",
		effect: "attack the furthest explorer from the model. ignore cover.",
	},
	{
		name: "charge",
		effect: "move towards closest explorer. then attack closest adjacent explorer. if no explorer adjacent move towards closest explorer again.",
	},
	{
		name: "fallBack",
		effect: "move to hex that is not visible to explorer. if not possible attack the closest explorer. double movement value.",
	},
	{
		name: "hold",
		effect: "do nothing.",
	},
	{
		name: "onslaught",
		effect: "attack the closest explorer. attack again.",
	},
	{
		name: "sneak",
		effect: "move to hex as close to explorer as possible without passing through a hex that is visible to an explorer. ",
	},
]



