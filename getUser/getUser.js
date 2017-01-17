function getUser() {
    /***************************************************************************
    Version 1.0
        edited by Justin San Agustin: 12/24/2016, 3:14:47 AM
    //
    Get the user's username
    //
    Returns username
    //
    Dependencies:
        None
    ***************************************************************************/
    var shell = new ActiveXObject("Wscript.Shell");
    var user = shell.ExpandEnvironmentStrings("%USERNAME%");
    return user;
}
