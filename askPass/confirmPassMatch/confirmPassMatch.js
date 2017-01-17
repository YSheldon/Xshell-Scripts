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
