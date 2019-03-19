

var groups;


$(document).ready(function() {
	resetGroups();
	buildDisplay();
});


function resetGroups(){
	groups = new Array();
}

function buildDisplay(){
	
	var s = '';
		
	s += '<div id="divFile" class="divFileHeader">';
	s += '    <div class="divBtn" id="btnSave">';
	s += '        <i class="fa fa-file-import"/>';
	s += '        <div class="btnText">save</div>';
	s += '    </div>';
	s += '    <div class="divBtn" id="btnLoad">';
	s += '        <i class="fa fa-file-export"/>';
	s += '        <div class="btnText">load</div>';
	s += '    </div>';
	s += '    <div class="divBtn" id="btnHelp">';
	s += '        <i class="fa fa-question"/>';
	s += '        <div class="btnText">help</div>';
	s += '    </div>';
	s += '</div>';
	s += '<div id="divHelpText"></div>';
	s += '<div id="divGroupAdd" class="divRow">';
	s += '    <div class="divBtn" id="btnAddGroup">';
	s += '        <i class="fa fa-plus"/>';
	s += '        <div class="btnText">add group</div>';
	s += '    </div>';
	s += '    <div class="divLabel divGroupAddToggle">group name:</div>';
	s += '    <input type="text" class="divGroupAddToggle" id="txtAddGroup">';
	s += '    <select class="divGroupAddToggle" id="selectAddGroup">';
	for( var i = 0; i < mainTypes.length; i++){
		s += '        <option>' + mainTypes[i].name + '</option>';
	}	
	s += '    </select>';
	s += '    <div class="divBtn divGroupAddToggle" id="btnAddGroupCommit">';
	s += '        <i class="fa fa-check"/>';
	s += '    </div>';
	s += '    <div class="divBtn divGroupAddToggle" id="btnAddGroupCancel">';
	s += '        <i class="fa fa-times"/>';
	s += '    </div>';
	s += '    <div class="divBtn" id="btnClearResults">';
	s += '        <i class="fa fa-archive"/>';
	s += '        <div class="btnText">clear results</div>';
	s += '    </div>';
	s += '</div>';
	
	
	s += '<div id="divGroupTable">';
	s += '</div>';

	
	
	
	$('#divContent').html(s);

	$('.divGroupAddToggle').hide();
	

	
	buildGroupTable();


	$('#btnHelp').unbind("click");
	$('#btnHelp').click(function () {
		if( $('#divHelpText').html() == '' ){
			$('#divHelpText').html(
				'this program is designed to calculate and monitor hostile activity for Blackstone Fortress.<br>' +
				'there is a save and load feature that can record activity.<br>' +
				'the program is only designed to operate "on-the-fly" so it does not record ongoing progress or history.<br><br>' +

				'groups should be added using "add group" button, then models added to the group using the "add model" button.<br><br>' +

				'click on a model to calculate its range, position, action and to calculate any dice results <br>' +
				'first select the starting range to the explorer.<br>' +
				'next select the hostiles position as appropriate.<br>' + 
				'the program will then calculate a random action based on your selections.<br><br>' +

				'the dice available depends on the randomly selected action and final range to the explorer (which is not known by the program).<br>' +

				'you must determine how the dice tool is to be used as appropriate to the action selected and final range to the explorer.' +
				'if the action is "hold" then you do not need to click the dice at all.<br>' +
				'if the action is "onslaught" then you might need to click and action the dice twice.<br>' +
				'note that the program does not record both roll, only the last roll<br><br>' +

				'you can use the main list to help determine which models have been actioned in the turn.<br><br>' +

				'at the end of the turn click the "clear results" button to clear all the details from the model and start afresh on the next turn.<br><br>' +

				'click the "help" button again to hide this text.<br><br>'
			);		
		}
		else {
			$('#divHelpText').html('');
		}
	});
	
	$('#btnSave').unbind("click");
	$('#btnSave').click(function () {
		localStorage.removeItem("blackstone");
		localStorage.setItem('blackstone', JSON.stringify(groups));		
	});
	$('#btnLoad').unbind("click");
	$('#btnLoad').click(function () {		
		resetGroups();
		if( localStorage.getItem("blackstone") != null ) {
			groups = JSON.parse(localStorage.getItem("blackstone"));
		}
		buildDisplay();
		buildGroupTable();
	});
	
	$('#btnClearResults').unbind("click");
	$('#btnClearResults').click(function () {
		for( var x = 0; x < groups.length; x++){
			if( groups[x].models != null )
			{
				for( var xx = 0; xx < groups[x].models.length; xx++){
					groups[x].models[xx].position = null;
					groups[x].models[xx].positionResult = null;
					groups[x].models[xx].action = null;
					groups[x].models[xx].actionResult = null;
					groups[x].models[xx].range = null;
				}
			}		
		}

		$('#divPopupAnchor').html('');
		buildDisplay();
		buildGroupTable();		
	});

	$('#btnAddGroup').unbind("click");
	$('#btnAddGroup').click(function () {
		$('.divGroupAddToggle').show();
		$('#btnAddGroup').hide();
	});

	$('#btnAddGroupCommit').unbind("click");
	$('#btnAddGroupCommit').click(function () {
		groups.push({
			name: $('#txtAddGroup').val(),
			type: $('#selectAddGroup').val(),
			models: [],
		});
		$('#txtAddGroup').val('');
		
		$('.divGroupAddToggle').hide();
		buildGroupTable();
		$('#btnAddGroup').show();
		
	});

	$('#btnAddGroupCancel').unbind("click");
	$('#btnAddGroupCancel').click(function () {
		$('#txtAddGroup').val('');
		
		$('.divGroupAddToggle').hide();
		$('#btnAddGroup').show();
	});
}

function buildGroupTable() {
	
	var ss = '';
	
	for( var x = 0; x < groups.length; x++){
		var gType = getObject(mainTypes,"name",groups[x].type);
		
		ss += '<div class="divRow divRowHeader">';
		ss += '    <span class="divGroupStatA">' + groups[x].name + " - " + groups[x].type + '</span>';
		ss += '    <span class="divGroupStatB">[ move:' + gType.move + " | wounds:" + gType.wounds + " | size:" + gType.size + ' ]</span>';

		ss += '    <div class="divBtn divFloatRight btnRemoveGroup" id="btnRemoveGroup_' + x + '">';
		ss += '        <i class="fa fa-minus"/>';
		ss += '        <div class="btnText">remove group</div>';
		ss += '    </div>';

		
		ss += '    <div class="divBtn divFloatRight btnAddUnitCancel divUnitAddToggle divUnitAddToggle_'+x+'" id="btnAddUnitCancel_'+x+'">';
		ss += '        <i class="fa fa-times"/>';
		ss += '    </div>';
		ss += '    <div class="divBtn divFloatRight btnAddUnitCommit divUnitAddToggle divUnitAddToggle_'+x+'" id="btnAddUnitCommit_'+x+'">';
		ss += '        <i class="fa fa-check"/>';
		ss += '    </div>';
		ss += '    <select class="divFloatRight divUnitAddToggle divUnitAddToggle_'+x+'" id="selectAddUnit_'+x+'">';
		for( var xx = 0; xx < hostileTypes.length; xx++){
			if( hostileTypes[xx].mainType == groups[x].type ){
				ss += '        <option>' + hostileTypes[xx].name + '</option>';		
			}
		}	
		ss += '    </select>';
		
		
		ss += '    <div class="divBtn divFloatRight btnAddUnit" id="btnAddUnit_'+x+'">';
		ss += '        <i class="fa fa-plus"/>';
		ss += '        <div class="btnText">add model</div>';
		ss += '    </div>';
		ss += '</div>';
		
		if( groups[x].models != null )
		{
			for( var xx = 0; xx < groups[x].models.length; xx++){
				ss += '    <div class="divRow divRowDetail ' +  (xx % 2 == 0 ? "divRowDetailReg" : "divRowDetailAlt" ) + '" id="div_'+ x +'_' + xx + '">';
				ss += '        <div class="divGroupStatA">';
				ss += groups[x].models[xx].type;
				if( groups[x].models[xx].range || groups[x].models[xx].position || groups[x].models[xx].action) {
					ss += ' - '; 
					if( groups[x].models[xx].range ) {
						ss += ' range[';
						ss += (groups[x].models[xx].range > 3 ? '4+' : groups[x].models[xx].range);
						ss += '] ';
					}
					if( groups[x].models[xx].position ) {
						ss += ' position[';
						ss += groups[x].models[xx].position;
						ss += '] ';
					}
					if( groups[x].models[xx].action ) {
						ss += ' action[';
						ss += groups[x].models[xx].action;
						ss += '] ';
					}
					if( groups[x].models[xx].actionResult ) {
						ss += ' lastActionResult[';
						ss += groups[x].models[xx].actionResult;
						ss += '] ';
					}
				}
				ss += '</div>';
				ss += '        <div class="divBtn divFloatRight btnRemoveModel" id="btnRemoveModel_' + x + '_' + xx +'">';
				ss += '            <i class="fa fa-minus"/>';
				ss += '            <div class="btnText">remove model</div>';
				ss += '        </div>';
				ss += '        <div class="divBtn divFloatRight btnClearModel" id="btnClearModel_' + x + '_' + xx +'">';
				ss += '            <i class="fa fa-archive"/>';
				ss += '            <div class="btnText">clear</div>';
				ss += '        </div>';
				
				for( var y = 0; y < hostileTypes.length; y++){
					if( hostileTypes[y].mainType == groups[x].type ){
						if( hostileTypes[y].name == groups[x].models[xx].type ){
							if( hostileTypes[y].modelClause ){
								for( var yy = 0; yy < clauses.length; yy++){
									if( clauses[yy].name == hostileTypes[y].modelClause ){
										ss += '<div class="divClause">' + clauses[yy].name + ' : ' + clauses[yy].effect + '</div>';
									}
								}
							}
						}
					}
				}	
				
				ss += '</div>';
			}
		}
	}
	
	$('#divGroupTable').html(ss);
	
	$('.divUnitAddToggle').hide();


	$('.divRowDetail').unbind("click");			// popup content
	$('.divRowDetail').click(function () {
		var groupsIdx = Number(this.id.split('_')[1]);
		var modelsIdx = Number(this.id.split('_')[2]);
		var mType = groups[groupsIdx];
		var gType = getObject(mainTypes,"name",mType.type);
		var thisModel = groups[groupsIdx].models[modelsIdx].type;

		var hType = null;
		for( var xx = 0; xx < hostileTypes.length; xx++){
			if( hostileTypes[xx].mainType == mType.type &&
				hostileTypes[xx].name == thisModel){
				hType = hostileTypes[xx];
			}
		}		

		var pp = '';
		
		/////////////// popup header
		pp += '<div class="divPopup">'
		pp += '  <div class="divRow divRowHeader">';
		pp += '    <div class="divGroupStatA">' + thisModel + '</div>';
		pp += '    <div class="divBtn divFloatRight" id="btnPopupCancel">';
		pp += '        <i class="fa fa-times"/>';
		pp += '    </div>';
		pp += '  </div>'


		/////////////// hostile range section
		pp += '  <div class="divRow divRowSubHeader">';
		pp += '    <span class="divGroupStatA" id="spanHostileRange">';

		if( groups[groupsIdx].models[modelsIdx].range ) {
			pp += 'Hostile Start Range'
		}
		else {
			pp +='Hostile Start Range <i>(select an option to set range)</i>';
		}
		
		pp += '    </span>';		
		pp += '  </div>'
		for( var x = 1; x <= 4; x++){
			pp += '    <div class="divRow divRowDetail divRowDetailRange ' +
			(x % 2 == 0 ? "divRowDetailReg " : "divRowDetailAlt " ) + 
			( groups[groupsIdx].models[modelsIdx].range && groups[groupsIdx].models[modelsIdx].range == x.toString() ? "divRowDetailSelected ": "" ) + 
			'" ' +
			'id="divRowDetail_' + mType.type + '_' + x + '_' + groupsIdx + '_' + modelsIdx + '">';
			pp += '        <div class="divRowDetailColA">' + (x < 4 ? x : (x + "+")) + '</div><div class="divRowDetailColB"></div>';
			pp += '    </div>'
		}


		/////////////// hostile position section
		pp += '  <div class="divRow divRowSubHeader divHostilePositionGroup">';
		pp += '    <span class="divGroupStatA" id="spanHostilePosition">';
		if( groups[groupsIdx].models[modelsIdx].positionResult ) {
			var pType = getObject(gType.hostilePositions,"name",groups[groupsIdx].models[modelsIdx].position);
			for(var x = 0; x < pType.table.length; x++){
				if( groups[groupsIdx].models[modelsIdx].positionResult >= pType.table[x].min && groups[groupsIdx].models[modelsIdx].positionResult <= pType.table[x].max ){
					rType = pType.table[x];
				}
			}
			pp += 'Hostile Positions <div class="divSpanHostilePositionResult">result: [roll ' + groups[groupsIdx].models[modelsIdx].positionResult.toString() + '] &nbsp; &nbsp; -> ' + rType.action + '</div>'
		}
		else {
			pp +='Hostile Positions <i>(select an option to calculate an action)</i>';
		}
		pp += '    </span>';		
		pp += '  </div>'
		pp += '  <div class="divHostilePositionGroup">';
		for( var x = 0; x < gType.hostilePositions.length; x++){
			pp += '    <div class="divRow divRowDetail divRowDetailPosition ' +  
						(x % 2 == 0 ? "divRowDetailReg " : "divRowDetailAlt " ) + 
						( groups[groupsIdx].models[modelsIdx].position && groups[groupsIdx].models[modelsIdx].position == gType.hostilePositions[x].name ? "divRowDetailSelected ": "" ) + 
						'" ' +
						'id="divRowDetail_' + mType.type + '_' + gType.hostilePositions[x].name + '_' + groupsIdx + '_' + modelsIdx + '">';
			pp += '        <div class="divRowDetailColA">' + gType.hostilePositions[x].name + '</div><div class="divRowDetailColB">' + gType.hostilePositions[x].description + '</div>';
			pp += '    </div>'
		}
		pp += '  </div>'


		/////////////// hostile action section
		pp += '  <div class="divRow divRowSubHeader divHostileActionGroup">';
		pp += '    <span class="divGroupStatA" id="spanHostileAction">';
		pp += 'Hostile Actions <div class="divSpanHostileActionResult">dice options: ' + 
			  ' &nbsp; &nbsp; adjacent ' + buildDice(groupsIdx, modelsIdx, 1, hType.range1) + 
			  ' &nbsp; &nbsp; 2-3 hexes ' + buildDice(groupsIdx, modelsIdx, 2, hType.range2) + 
			  ' &nbsp; &nbsp; 4+ hexes ' + buildDice(groupsIdx, modelsIdx, 3, hType.range3);

		if( groups[groupsIdx].models[modelsIdx].actionResult ){
			pp += ' &nbsp; &nbsp; -> ' + groups[groupsIdx].models[modelsIdx].actionResult;
		}
		
		pp += '</div>';

		pp += '</span>';

		if(hType.weaponClause){
			for( var yy = 0; yy < clauses.length; yy++){
				if( clauses[yy].name == hType.weaponClause ){
					pp += '<div class="divClauseMore">' + clauses[yy].name + ' : ' + clauses[yy].effect + '</div>';
				}
			}
		}
		pp += '  </div>'
		
		pp += '  <div class="divHostileActionGroup">';
		var ii = 0;
		for( var x = 0; x < hostileActions.length; x++){
			pp += '    <div class="divRow divRowDetail divRowDetailAction ' +
						(ii % 2 == 0 ? "divRowDetailReg " : "divRowDetailAlt " ) + 
						( groups[groupsIdx].models[modelsIdx].action && groups[groupsIdx].models[modelsIdx].action == hostileActions[x].name ? "divRowDetailSelected ": "" ) + 
						'" ' +
						'id="divRowDetail_' + mType.type + '_' + hostileActions[x].name + '_' + groupsIdx + '_' + modelsIdx + '">';
			pp += '        <div class="divRowDetailColA">' + hostileActions[x].name + '</div><div class="divRowDetailColB">' + hostileActions[x].effect + '</div>';
			pp += '    </div>'
			ii++;
		}
		for( var x = 0; x < gType.hostileActions.length; x++){
			pp += '    <div class="divRow divRowDetail divRowDetailAction ' +
						(ii % 2 == 0 ? "divRowDetailReg " : "divRowDetailAlt " ) + 
						( groups[groupsIdx].models[modelsIdx].action && groups[groupsIdx].models[modelsIdx].action == gType.hostileActions[x].name ? "divRowDetailSelected ": "" ) + 
						'" ' + 
						'id="divRowDetail_' + mType.type + '_' + gType.hostileActions[x].name + '_' + groupsIdx + '_' + modelsIdx + '">';
			pp += '        <div class="divRowDetailColA">' + gType.hostileActions[x].name + '</div><div class="divRowDetailColB">' + gType.hostileActions[x].effect + '</div>';
			pp += '    </div>'
			ii++;
		}
		pp += '</div>'
		
		
		$('#divPopupAnchor').html(pp);
		
		
		if( groups[groupsIdx].models[modelsIdx].range ){
			$('.divHostilePositionGroup').show();
		}
		else {
			$('.divHostilePositionGroup').hide();
		}

		if( groups[groupsIdx].models[modelsIdx].positionResult ){
			$('.divHostileActionGroup').show();
		}
		else {
			$('.divHostileActionGroup').hide();
		}		

		
		$('#btnPopupCancel').unbind("click");
		$('#btnPopupCancel').click(function () {

			$('#divPopupAnchor').html('');
			
			buildDisplay();
		});
		
		
		
		$('.btnRollDice').unbind("click");
		$('.btnRollDice').click(function () {
			let groupsIdx = Number(this.id.split('_')[1]);
			let modelsIdx = Number(this.id.split('_')[2]);
			let thisIdx = this.id.split('_')[3];
			let thisOption = this.id.split('_')[4];
			
			let result = '';
			
			let no = Number(thisOption.split('d')[0]);
			let size = Number(thisOption.split('d')[1]);

			for( var x = 0; x < no; x++ ){

				result += x > 0 ? ' &nbsp; ' : ''; 
				result += (Number(x)+1) + 'd' + size.toString() + ': ';
			
				let ran = getRandom(1, size);
				
				// d6: 1 crit, 1 hit, 4 miss
				// d8: 2 crit, 2 hit, 4 miss
				// d12: 4 crit, 4 hit, 4 miss				
				
				switch(size){
					case 6:
						if( ran == 6 ){
							result = +ran + ' crit';
						}
						else if( ran == 5 ){
							result += ran + ' hit';
						}
						else {
							result += ran + ' miss';
						}
						break;
					case 8:
						if( ran == 7 || ran == 8 ){
							result += ran + ' crit';
						}
						else if( ran == 5 || ran == 6 ){
							result += ran + ' hit';
						}
						else {
							result += ran + ' miss';
						}					
						break;
					case 12:
						if( ran >= 9 && ran <= 12 ){
							result += ran + ' crit';
						}
						else if( ran >= 5 && ran <= 8 ){
							result += ran + ' hit';
						}
						else {
							result += ran + ' miss';
						}
						break;					
				}
			}
			
			groups[groupsIdx].models[modelsIdx].actionResult = result;

			$('#div_' + groupsIdx + '_' + modelsIdx).click();
		});

		
		$('.divRowDetailRange').unbind("click");
		$('.divRowDetailRange').click(function () {
			let mainType = this.id.split('_')[1];
			let thisRange = this.id.split('_')[2];
			let groupsIdx = Number(this.id.split('_')[3]);
			let modelsIdx = Number(this.id.split('_')[4]);

			groups[groupsIdx].models[modelsIdx].range = thisRange;
			
			$('#div_' + groupsIdx + '_' + modelsIdx).click();
		});

		$('.divRowDetailPosition').unbind("click");
		$('.divRowDetailPosition').click(function () {
			var mainType = this.id.split('_')[1];
			var thisPosition = this.id.split('_')[2];
			var groupsIdx = Number(this.id.split('_')[3]);
			var modelsIdx = Number(this.id.split('_')[4]);
		
			var gType = getObject(mainTypes,"name",mainType);
			var pType = getObject(gType.hostilePositions,"name",thisPosition);
			

			var random = getRandom(1,20);
			
			var rType = null;
			for(var x = 0; x < pType.table.length; x++){
				if( random >= pType.table[x].min && random <= pType.table[x].max ){
					rType = pType.table[x];
				}
			}
		
			$('#spanHostilePosition').html('Hostile Positions <div class="divSpanHostilePositionResult">result: [roll ' + random.toString() + '] -> ' + rType.action + '</div>');
			
			groups[groupsIdx].models[modelsIdx].position = thisPosition;
			groups[groupsIdx].models[modelsIdx].positionResult = random.toString();
			groups[groupsIdx].models[modelsIdx].action = rType.action;

			$('#div_' + groupsIdx + '_' + modelsIdx).click();
		});	
	});
	
	$('.btnAddUnitCommit').unbind("click");
	$('.btnAddUnitCommit').click(function () {
		var idx = Number(this.id.split('_')[1]);
		
		groups[idx].models.push(
			{ 
				"type": $('#selectAddUnit_'+idx).val(), 
				"position": null, 
				"positionResult": null, 
				"action": null,
				"actionResult": null,
				"range": null,
			}
		);
		
		$('.divUnitAddToggle').hide();
		buildGroupTable();

		$('#btnAddUnit_'+idx).show();
	});
	$('.btnAddUnitCancel').unbind("click");
	$('.btnAddUnitCancel').click(function () {
		$('.divUnitAddToggle').hide();
		var idx = this.id.split('_')[1];
		$('#btnAddUnit_'+idx).show();
	});
	$('.btnAddUnit').unbind("click");
	$('.btnAddUnit').click(function () {
		$('.divUnitAddToggle').hide();
		var idx = this.id.split('_')[1];
		$('.divUnitAddToggle_'+idx).show();	
		$('#btnAddUnit_'+idx).hide();	
	});
	$('.btnRemoveGroup').unbind("click");
	$('.btnRemoveGroup').click(function () {
		$('.divUnitAddToggle').hide();
		var idx = this.id.split('_')[1];
		groups.splice(idx,1);
		buildGroupTable();
	});
	$('.btnRemoveModel').unbind("click");
	$('.btnRemoveModel').click(function () {
		$('.divUnitAddToggle').hide();
		var groupIdx = this.id.split('_')[1];
		var modelIdx = this.id.split('_')[2];
		groups[groupIdx].models.splice(modelIdx,1);
		buildGroupTable();
	});
	$('.btnClearModel').unbind("click");
	$('.btnClearModel').click(function () {
		$('.divUnitAddToggle').hide();
		var groupIdx = this.id.split('_')[1];
		var modelIdx = this.id.split('_')[2];

		groups[groupIdx].models[modelIdx].position = null;
		groups[groupIdx].models[modelIdx].positionResult = null;
		groups[groupIdx].models[modelIdx].action = null;
		groups[groupIdx].models[modelIdx].actionResult = null;
		groups[groupIdx].models[modelIdx].range = null;

		buildGroupTable();
	});
}

function buildDice(x, xx, idx, options) {
	let s = '';
	s += '<div class="divRollBtn btnRollDice" id="btnRollDice_' + x + '_' + xx + '_' + idx + '_' + options + '">';
	s += '	<i class="fa fa-dice"/>';
	s += '  <div class="btnText">' + options + '</div>';
	s += '</div>';
	return s;
}

function getObject( thisArray, thisParameter, thisValue ) {

	var returnValue = null;
	
	$.each(thisArray, function() {

		if( this[thisParameter].toLowerCase() == thisValue.toLowerCase() ) {
			returnValue = this; 
		}
	});

	return returnValue;
}

function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

