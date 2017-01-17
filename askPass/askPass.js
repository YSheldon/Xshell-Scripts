function askPass(strType, askCount) {
	/***************************************************************************
	Version 2.0
	edited by Justin San Agustin: 1/14/2017, 1:34:23 PM
		Changed: askTwice has now been exposed to caller as askCount variable.
					askCount should be integer 1 or 2. If undefined, askTwice
					defaults to true.
		Changed: getStrings() and confirmPassMatch() are now now nested.
	Version 1.1
	edited by Justin San Agustin: 12/24/2016, 3:07:52 AM
		Added: ability to ask only once
	//
	This will get a string from user, and ask user to retype string.
	It will check for blank entries and that entries match.
	//
	Returns array:
		askPass[0] = exit (true/false)
		askPass[1] = password
	//
	Dependencies:
		getStrings()
		confirmPassMatch()
	***************************************************************************/
	var exit;
	var pass;
	var scriptTerminate = false;
	switch (askCount) {
		case 1:
			askTwice = false;
			break;
		case 2:
		default:
			askTwice = true;
	}
	var getPassStrings  = getStrings(strType, askTwice);
	if (!getPassStrings) {
		scriptTerminate = true; //Blank entries; user chose to cancel.
		exit = true;
	}
	if (!scriptTerminate) {
		if (!askTwice) {
			pass = getPassStrings;
			exit = false;
		} else {
			//We've got 2 strings; Let's see if they match
			var checkPass = confirmPassMatch(strType, getPassStrings);
			//xsh.Dialog.MsgBox(checkPass);
			if (checkPass[0]) {
				pass = checkPass[1];
				exit = false;
			} else { exit = true; }
		}
	}
	return [exit, pass];
	function getStrings(strType, askTwice) {
		/***************************************************************************
		Version 1.2
		edited by Justin San Agustin: 1/14/2017, 1:33:08 PM
			Changed: Now nested within askPass()
		Version 1.1
		edited by Justin San Agustin: 12/24/2016, 3:04:58 AM
			Added: Option to ask only once
		//
		This handles getting PIN/password from user.
		Adjusts prompt messages based on given "strType"
		Confirms that entry is not "" (ex: if user clicks 'Cancel' at prompt)
		If entry is "", asks to retry or Cancel
		//
		Returns either false(failure) or an array of passwords
		//
		Dependencies:
		None
		***************************************************************************/
		var scriptTerminate  = false;
		var valid            = false;
		var retryString      = " Retry, or click 'Cancel' if you wish to quit.";
		var promptStrArray   = ["Please enter your " + strType, "Please re-enter your " + strType];
		var promptTitleArray = ["Enter " + strType, "Re-enter " + strType];
		if (!askTwice) {
			var passStringArray  = [];
			passStringArray[0]   = "";
		} else {
			var passStringArray  = [];
			passStringArray[0]   = "";
			passStringArray[1]   = "";
		}
		var index;
		for (index = 0; index < passStringArray.length; index++) {
			passStringArray[index] = xsh.Dialog.Prompt(promptStrArray[index], promptTitleArray[index], "", promptSecret);
			//
			if (passStringArray[index] == "") {
				while (!valid) {
					var dialogStr   = "Your entry was blank." + retryString;
					var dialogTitle = "Entry Blank";
					var passStringBlank = xsh.Dialog.MessageBox(dialogStr, dialogTitle, msgBoxRetryCan);
					//
					switch (passStringBlank) {
						case 4: //User clicked 'Retry'
							scriptTerminate = false;
							passStringArray[index] = xsh.Dialog.Prompt(promptStrArray[index], promptTitleArray[index], "", promptSecret);
							if (passStringArray[index] == "") { valid = false; }
							else { valid = true; }
							break;
						case 2: //User clicked 'Cancel'
							scriptTerminate = true;
							valid = true; //Not valid, but we gotta get outta here
							index = 2; //No matter what, stops interation
							break;
					} //switch close
					if (scriptTerminate) { break; }
				} //while close
			} //if close
		} //for close
		if (scriptTerminate) { return false; }
		else {
			if (!askTwice) { return passStringArray[0]; }
			else { return passStringArray; }
		}
	}
	function confirmPassMatch(strType, passStringArray) {
		/***************************************************************************
		Version 1.1
		edited by Justin San Agustin: 1/14/2017, 1:30:49 PM
			Changed: Now nested within askPass()
			Fixed: If user elects to retry, this will now correctly pass the askTwice
				value to getStrings().
		Version 1.0
		edited by Justin San Agustin: 12/24/2016, 2:35:06 AM
		//
		This handles confirming that the strings given match.
		If not, retry or terminate.
		//
		Returns array:
		confirmPassMatch[0] = success (true/false)
		confirmPassMatch[1] = password
		//
		Dependencies:
		getStrings()
		***************************************************************************/
		var scriptTerminate  = false;
		var valid            = false;
		var retryString      = " Retry, or click 'Cancel' if you wish to quit.";
		if (passStringArray[0] != passStringArray[1]) {
			while (!valid) {
				var dialogStr	= "Your entries do not match." + retryString;
				var dialogTitle	= strType + " mismatch";
				var passStringMismatch = xsh.Dialog.MessageBox(dialogStr, dialogTitle, msgBoxRetryCan);
				switch (passStringMismatch) {
					case 4: //User clicked 'Retry'
						scriptTerminate = false;
						passStringArray = getStrings(strType, askTwice);
						if (passStringArray[0] != passStringArray[1]) { valid = false; }
						else { valid = true; }
						break;
					case 2: //User clicked 'Cancel'
						scriptTerminate = true;
						valid = true; //Not valid but we gotta get outta here
						break;
				} //switch close
			} //while close
		} else { scriptTerminate = false; }//if else close
		//
		var success;
		if (scriptTerminate) {
			success    = false;
			passString = undefined;
		} else {
			success    = true;
			passString = passStringArray[0];
		}
		return [success, passString];
	}
}
