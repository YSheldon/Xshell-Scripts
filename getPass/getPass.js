function getPass() {
	/***************************************************************************
	Version 1.1
	// edited by Justin San Agustin: 1/12/2017, 8:38:00 PM
	Added support for envVariable for PIN
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 3:01:46 AM
	//
	Handles calling certain functions to get the password.
	//
	Returns either a number (exitCode) or the password
		exitCode:
		1 = failed to get password
		2 = failed to get PIN
		3 = failed to set envVariable
	//
	Dependencies:
		passFileExists()
		isEncrypted()
		askPass()
		readPassFile()
		checkEnvVariable()
		setEnvVariable()
	***************************************************************************/
	//
	//Let's confirm password file exists
	var exitCode;
	var pass;
	var strType;
	var fileExists = passFileExists();
	var file       = fileExists[1];
	if (fileExists[0]) {
		//File exists. Let's see if it's encrypted.
		if (isEncrypted(file)) {
			//Password is encrypted
			// REVIEW: Is this how we want to handle getting the pin?
			// REVIEW: Or should we do it a different way?
			if (pin	=== undefined) {
				//PIN not known, so let's ask for it
				var name = "PIN";
				var confirmEnvVar = checkEnvVariable(name);
				if (confirmEnvVar[0]) {	var pin = confirmEnvVar[1];	}
				else {
					//envVariable not set, so let's set it
					var getPin = askPass(name);
					if (getPin[0]) { exitCode = 2; } //Failed to get PIN, so exit
					else { pin = getPin[1]; }
					setEnvVariable(name, pin);
					confirmEnvVar = checkEnvVariable(name); //Confirm it's setEnvVariable
					if (confirmEnvVar[0]) {
						if (pin != confirmEnvVar[1]) { exitCode = 3; } //failed to set envVar
					}
				}
			}
			if (exitCode === undefined) {
				pass = readPassFile(file, pin);
			}
		} else {
			pass = readPassFile(file);
		}
	} else {
		var dialogStr   = "Password file: '" + file + "' not found. I'll ask for you password now...";
		var dialogTitle = "Password File Not Found";
		xsh.Dialog.MessageBox(dialogStr, dialogTitle, msgBoxOK);
		strType = "password"
		var getPassword = askPass(strType);
		//xsh.Dialog.MsgBox(getPassword);
		if (getPassword[0]) {
			exitCode = 1; //Failed to get password
		} else {
			exitCode = undefined;
			pass = getPassword[1];
		}
	}
	//
	if (exitCode == undefined) { return pass; }
	else { return exitCode; }
}
