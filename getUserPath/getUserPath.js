function getUserPath() {
	/***************************************************************************
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 2:48:06 AM
	//
	Get the user's user folder. Should be 'C:\Users\[username]'
	//
	Returns user folder
	***************************************************************************/
	var shell    = new ActiveXObject("Wscript.Shell");
	var userPath = shell.ExpandEnvironmentStrings("%USERPROFILE%");
	return userPath;
}
