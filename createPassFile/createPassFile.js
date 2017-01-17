function createPassFile(file) {
	/***************************************************************************
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 2:44:05 AM
	//
	Asks if we should create the password file. If so, creates it.
	//
	Returns true/false
	//
	Dependencies:
		None
	***************************************************************************/
	var fso         = new ActiveXObject("Scripting.FileSystemObject");
	var dialogStr   = "I can't find '" + file + "'. Should I create it?";
	var dialogTitle = "Password File Not Found";
	var answer      = xsh.Dialog.MessageBox(dialogStr, dialogTitle, msgBoxYN);
	if (answer == 6) {
		fso.CreateTextFile(file);
		return true;
	}
	else { return false; }
}
