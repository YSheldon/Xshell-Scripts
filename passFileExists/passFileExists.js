function passFileExists() {
	/***************************************************************************
	Version 1.11
	edited by Justin San Agustin: 1/14/2017, 2:00:06 PM
		Changed: Moved return statement out of if/else as it was written twice.
	Version 1.10
	edited by Justin: 1/11/2017, 1:00:11 PM
		Added missing ; to userPath declaration
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 2:46:50 AM
	//
	Appends script path to userPath and confirms that it exists
	Returns array:
		passFileExists[0] = success (true/false)
		passFileExists[1] = filename
	//
	Suggested caller block:
	//Let's confirm password file exists
	var fileExists = passFileExists();//do this so function is only called once
	var file = fileExists[1];
	if (fileExists[0]) {
		//File exists, carry on...
	}
	//
	Dependencies:
		getUserPath()
	***************************************************************************/
	var userPath = getUserPath();
	var path     = "\\Documents\\NetSarang\\Xshell\\Scripts";
	var file     = userPath + path + "\\ssh.txt";
	var fso      = new ActiveXObject("Scripting.FileSystemObject");
	//xsh.Dialog.MsgBox(file);
	if (fso.FileExists(file)) { var success = true; }
	else { var success = false; }
	return [success, file];
}
