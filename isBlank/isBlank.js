function isBlank(file) {
    /***************************************************************************
    Version 1.0
        edited by Justin San Agustin: 12/24/2016, 2:31:40 AM
    //
    Checks if the passFile's size is 0.
    Returns true/false
    //
    Dependencies:
        None
    ***************************************************************************/
    var fso      = new ActiveXObject("Scripting.FileSystemObject");
    var passFile = fso.GetFile(file);
    if (passFile.size == 0) { return true; }
    else { return false; }
}
