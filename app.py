from flask import Flask, request, jsonify, Response, send_from_directory
import smtplib
from email.message import EmailMessage
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

YOUR_EMAIL = "shepherdmoahloli122@gmail.com"
YOUR_EMAIL_PASSWORD = "hrxssddzgxhtuzkg"  # Use your 16-character app password, no spaces needed

# Password protection credentials
USERNAME = "HoodRevenge"
PASSWORD = "Abutibulaboot22"

# Add your project directory to the sys.path
project_home = '/home/HoodRevenge'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Import your Flask app
from app import app as application  # noqa

@app.route('/', methods=['GET'])
def home():
    return send_from_directory('./', 'index.html')

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    email = request.form.get('email')
    app.logger.debug('Incoming form data: name=%s, email=%s', name, email)

    app.logger.info(f"Received registration: name={name}, email={email}")
    if not name or not email:
        app.logger.error('Missing fields: name=%s, email=%s', name, email)
        return jsonify({'success': False, 'error': 'Missing fields'}), 400

    # Compose email
    msg = EmailMessage()
    msg['Subject'] = f'HOOD REVENGE REGISTRATION: {name} <{email}>'
    msg['From'] = YOUR_EMAIL  # Must be your Gmail for SMTP
    msg['To'] = YOUR_EMAIL
    msg['Reply-To'] = f'{name} <{email}>'
    msg.set_content(f"HOOD REVENGE REGISTRATION:\nName: {name}\nEmail: {email}")

    # Send email (using Gmail SMTP as example)
    try:
        app.logger.debug('Attempting to send email: name=%s, email=%s', name, email)
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(YOUR_EMAIL, YOUR_EMAIL_PASSWORD)
            smtp.send_message(msg)
        app.logger.info('Email sent successfully: name=%s, email=%s', name, email)
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error('Error sending email: %s', str(e))
        return jsonify({'success': False, 'error': str(e)}), 500

# Serve static files from the css, js, and images directories
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
