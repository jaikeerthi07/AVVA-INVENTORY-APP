import pymysql
from config import Config

# Extract connection details from Config
# mysql+pymysql://root:jaikeerthi07a@localhost/inventory
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
        password=password,
        database=database
    )
    with connection.cursor() as cursor:
        # Check if admin exists
        cursor.execute("SELECT * FROM login WHERE email='admin@example.com'")
        result = cursor.fetchone()
        if not result:
            cursor.execute("INSERT INTO login (email, username, password) VALUES ('admin@example.com', 'admin', 'admin123')")
            connection.commit()
            print("Default admin user created: admin@example.com / admin123")
        else:
            print("Admin user already exists.")
    connection.close()
except Exception as e:
    print(f"Error: {e}")
