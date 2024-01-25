from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS  # Import CORS for handling Cross-Origin Resource Sharing
import os


app = Flask(__name__)
CORS(app)

# Database connection configuration
# DB_CONFIG = {
#     'host':'cloudcomputing-workspace.845799280017.eu-west-1.redshift-serverless.amazonaws.com',
#     'dbname':'dev',
#     'user':'cloud',
#     'password':'Cloud-Computing23',
#     'port':5439
#     }

# Database connection configuration
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'default-hostname'),
    'dbname': os.environ.get('DB_NAME', 'default-dbname'),
    'user': os.environ.get('DB_USER', 'default-user'),
    'password': os.environ.get('DB_PASSWORD', 'default-password'),
    'port': int(os.environ.get('DB_PORT', 5439))  # Port should be an integer
}

heart_dictionary = {}
stroke_dictionary = {}
diabetes_dictionary = {}

@app.route('/heart')
def display_data():
    try:
        #if cache is empty
        if len(heart_dictionary) == 0:
            print("Cache is empty")
            # Connect to redshift
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()

            # Fetch data from Redshift
            cursor.execute('SELECT * FROM patient_data_heart_disease;')
            data = cursor.fetchall()

            # Close the  connection
            connection.close()
            
            # Add data to the dictionary
            heart_dictionary['data'] = data

            # Return the data as JSON
            return jsonify(data)
        else:
            print("Cache is not empty")
            # Return the data from the cache
            print(heart_dictionary['data'])
            return jsonify(heart_dictionary['data'])


    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500  # Return the error as JSON

@app.route('/stroke')
def display_stroke_data():
    try: 
        #if cache is empty
        if len(stroke_dictionary) == 0:
            print("Cache is empty")
            # Connect to the database
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()

            # Fetch data from Redshift
            cursor.execute('SELECT * FROM stroke;')
            data = cursor.fetchall()

            # Close the database connection
            connection.close()
            
            # Add data to dictionary
            stroke_dictionary['data'] = data

            # Return the data as JSON
            return jsonify(data)
        else:
            print("Cache is not empty")
            # Return the data from the dictionary
            print(stroke_dictionary['data'])
            return jsonify(stroke_dictionary['data'])

    except Exception as e:
        # Handle any errors 
        return jsonify({'error': str(e)}), 500  

@app.route('/diabetes')
def display_diabetes_data():
    try: 
        #if cache is empty
        if len(diabetes_dictionary) == 0:
            print("Cache is empty")
            # Connect to the database
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()

            # Fetch data from AWS Redshift  
            cursor.execute('SELECT * FROM diabetes;')
            data = cursor.fetchall()

            # Close the database connection
            connection.close()
            
            # Add data to the dictionary
            diabetes_dictionary['data'] = data

            # Return the data as JSON
            return jsonify(data)
        else:
            print("Cache is not empty")
            # Return the data from the cache
            print(diabetes_dictionary['data'])
            return jsonify(diabetes_dictionary['data'])

    except Exception as e:
        # Handle any errors 
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)