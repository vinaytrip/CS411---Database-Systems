import os
import sqlalchemy
from flask import Flask
from yaml import load, Loader

# def init_connection_engine():
#     db_user = "root"
#     db_password = "cs411_vapd"
#     db_name = "final_project"
#     db_hostname = "34.69.39.157"
#     pool = sqlalchemy.create_engine(
#     # Equivalent URL:
#     # mysql+pymysql://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
#         sqlalchemy.engine.url.URL(
#             drivername="mysql+pymysql",
#             username=db_user,  # e.g. "my-database-user"
#             password=db_password,  # e.g. "my-database-password"
#             host=db_hostname,  # e.g. "127.0.0.1"
#             database=db_name,  # e.g. "my-database-name"
#         )
#     )
#     return pool

def init_connection_engine():
    """ initialize database setup
    Takes in os variables from environment if on GCP
    Reads in local variables that will be ignored in public repository.
    Returns:
        pool -- a connection to GCP MySQL
    """


    # detect env local or gcp
    if os.environ.get('GAE_ENV') != 'standard':
        try:
            variables = load(open("app.yaml"), Loader=Loader)
        except OSError as e:
            print("Make sure you have the app.yaml file setup")
            os.exit()

        env_variables = variables['env_variables']
        for var in env_variables:
            os.environ[var] = env_variables[var]

    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username=os.environ.get('MYSQL_USER'),
            password=os.environ.get('MYSQL_PASSWORD'),
            database=os.environ.get('MYSQL_DB'),
            host=os.environ.get('MYSQL_HOST')
        )
    )

    return pool

app = Flask(__name__)
db = init_connection_engine()

# To prevent from using a blueprint, we use a cyclic import
# This also means that we need to place this import here
# pylint: disable=cyclic-import, wrong-import-position
from app import routes