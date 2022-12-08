module.exports = {
    providers: [
        {
            type: 'ldap',
            name: 'LDAP',
            server: 'ldap://ldaptest-rzkj.rrz.uni-koeln.de',
            usernameField: 'username',
            passwordField: 'password'
        }
    ]
}