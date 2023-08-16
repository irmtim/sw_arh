import psycopg2
from config import files_ip_path, pg_conn, files_ip_path_create
import os


def file_ip_create(file_ip_path, content):
    with open(file_ip_path, 'w') as save_file:
        save_file.write(content)

    return f'Finished operation. Created {file_ip_path}'


def file_ip_create_fromdb(files_ip_path_create) -> str:
    sw_dict = dict()
    try:
        conn = psycopg2.connect(pg_conn)
    except:
        flag = f'Can`t establish connection to database'
        return print(flag)
    # sql_query = 'SELECT content, created_on FROM public.backup_sw where ip = %s order by created_on desc limit 1'
    sql_query = 'SELECT model, ip FROM public.backup_sw'
    with conn.cursor() as curs:
        curs.execute(sql_query)
        # data = curs.fetchone()
        data = curs.fetchall()
        conn.commit()
        print(data)
    for mod, ip in data:
        if mod in sw_dict:
            sw_dict[mod].add(ip)
        else:
            sw_dict[mod] = {ip}
    print(sw_dict)
    count = 0
    for k, v in sw_dict.items():
        st = '\n'.join(sorted(list(v), key=lambda i: int(i.split('.')[3])))
        mod_n = ''
        for i in k:
            if i not in ('\\', '/', ':', '*', '?', '"', '<', '>', '|'):
                mod_n += i
        file_ip_create(f'{files_ip_path_create}SW_{mod_n}.txt', st)
        count += 1

    flag = f'Created {count} files in {files_ip_path}.'
    return print(flag)


def create_ip_dict_fromfile(files_ip_path) -> dict:
    ip_dict = dict()
    i = next(os.walk(files_ip_path))
    for j in i[2]:
        if j[:3] == 'SW_' and j[-4:] == '.txt':
            with open(f'{i[0]}{j}', 'r', encoding='UTF-8') as ip_list:
                for ip in ip_list.read().strip().split():
                    n = j[3:-4]
                    if n in ip_dict:
                        ip_dict[n].add(ip)
                    else:
                        ip_dict[n] = {ip}

    return ip_dict



if __name__ == '__main__':
    print(create_ip_dict_fromfile(files_ip_path))
