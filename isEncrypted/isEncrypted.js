function isEncrypted(file) {
	/***************************************************************************
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 2:29:46 AM
	//
	Checks if passFile contents are encrypted.
		If it is encrypted, the contents should end with "="
	Returns true/false
	//
	Dependencies:
		None
	***************************************************************************/
	var fso      = new ActiveXObject("Scripting.FileSystemObject");
	var passFile = fso.OpenTextFile(file);
	var pass     = passFile.ReadAll();
	passFile.Close();
	var charCount      = pass.length; //Gets # of char in the file
	var markerPosition = pass.indexOf("=") + 1; //Finds where "=", but count starts at 0
	if (markerPosition == charCount) { return true; }
	else { return false; }
}
