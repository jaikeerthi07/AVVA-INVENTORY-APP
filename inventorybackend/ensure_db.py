import pymysql
from config import Config

# Extract connection details from Config
# mysql+pymysql://root:root123@localhost/inventory
uri = Config.SQLALCHEMY_DATABASE_URI
parts = uri.split('://')[1].split('@')
user_pass = parts[0].split(':')
user = user_pass[0]
password = user_pass[1]
host_db = parts[1].split('/')
host = host_db[0]
database = host_db[1]

try:
    connection = pymysql.connect(
        host=host,
        user=user,
        password=password
    )
    with connection.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
    print(f"Database '{database}' ensured.")
    connection.close()
except Exception as e:
    print(f"Error: {e}")
