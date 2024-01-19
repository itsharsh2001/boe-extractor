from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import jwt
import datetime
import pymysql.cursors

import pandas as pd
import numpy as np
import aspose.pdf as ap
import PyPDF2
from openpyxl import load_workbook
import os
from datetime import datetime, timedelta
import tempfile

import mysql.connector
# import mysql

# import Extract from './Base_Logic_V2.py'
from Base_Logic_V3 import *

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Replace this with a secret key for production use
app.config['SECRET_KEY_1'] = 'your_secret_key1'
app.config['SECRET_KEY_2'] = 'your_secret_key2'

# MariaDB configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'harsh',
    'database': 'boe_test',
    'cursorclass': pymysql.cursors.DictCursor,
}

# Example user data (replace with your user authentication system)
# users = {'username': 'password'}


def verify_user(username, password):
    # connection = pymysql.connect(**db_config)
    host = '127.0.0.1'
    user = 'root'
    db_password = 'harsh'
    database_name = 'boe_test'
    # return
    connection = mysql.connector.connect(host=host, database=database_name, user=user, password=db_password, connect_timeout=3000)
    # connection = pymysql.connect(host='127.0.0.1', user=user, password=password)
    print(connection, 'connection')
    cursor = connection.cursor()
    # print(connection.open, 'connection')
    try:
        # with connection.cursor() as cursor:
        # Use a secure method like hashing for storing passwords in production
        query = "SELECT * FROM credentials WHERE username=%s AND password=%s"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        print(user, 'user is here')
        return user
    finally:
        connection.close()


# Middleware function for JWT verification
def jwt_middleware(func):
    def wrapper(*args, **kwargs):
        authorization_header = request.headers.get('Authorization')

        print('authorization', authorization_header)

        if authorization_header:
            print('inside')
            _, token = authorization_header.split(' ', 1)

            print('token', token)

            try:
                decoded_data = jwt.decode(token, 'your_secret_key1', algorithms=['HS256'])
                print('decoded data', decoded_data)
                username = decoded_data.get('username')
                print('username', username)
                request.username = username
            except jwt.ExpiredSignatureError:
                return "Token has expired", 401
            except jwt.InvalidTokenError:
                return "Invalid token", 401
        else:
            return "Authorization header not found", 401

        return func(*args, **kwargs)

    return wrapper

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print(username,'username')
    print(password, 'password')

    user = verify_user(username, password)

    if user:
        access_token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(minutes=1)}, app.config['SECRET_KEY_1'])
        return jsonify({'token': access_token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401



@app.route('/process', methods=['POST'])
@jwt_middleware
def processdata():
    files = request.files.getlist('files')

    for file in files:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        print(filename)

    output_file=Extract_all('./uploads')
    print(output_file, 'sbse final output final')

    return send_file(output_file, download_name='output.zip', as_attachment=True, mimetype='application/zip')




if __name__ == '__main__':
    app.run(debug=True)
