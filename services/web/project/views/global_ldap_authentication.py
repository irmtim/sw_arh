from ldap3 import Server, Connection, ALL, SUBTREE
import config


def global_ldap_authentications(user_name, user_pwd, group='Switch_arh_admin'):
    flag = False
    # fetch the username and password
    ldap_user_name = user_name.strip()
    ldap_user_pwd = user_pwd.strip()
    # ldap server hostname and port
    ldsp_server = config.ldsp_server
    # dn
    root_dn = config.root_dn
    # user
    user = f'cn={ldap_user_name},{root_dn}'
    # print(user)

    server = Server(ldsp_server, get_info=ALL)

    connection = Connection(server,
                            user=ldap_user_name,
                            password=ldap_user_pwd)
    if not connection.bind():
        return flag
        # print(f" *** Cannot bind to ldap server: {connection.last_error} ")
        # l_success_msg = f' ** Failed Authentication: {connection.last_error}'
    else:
        # print(f" *** Successful bind to ldap server")

        search_filter = f"(cn={user_name})"
        search_attribute = ['memberOf']
        connection.search(search_base=root_dn,
                          search_scope=SUBTREE,
                          search_filter=search_filter,
                          attributes=search_attribute)
        flag = any(map(lambda i: group in i, connection.response[0]['attributes']['memberOf']))

    return flag
