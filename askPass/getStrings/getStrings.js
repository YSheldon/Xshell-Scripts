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
