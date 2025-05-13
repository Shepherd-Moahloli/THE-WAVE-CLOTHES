from flask import Flask, request, jsonify
import smtplib
from email.message import EmailMessage
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

YOUR_EMAIL = "shepherdmoahloli122@gmail.com"
YOUR_EMAIL_PASSWORD = "hrxssddzgxhtuzkg"  # Use your 16-character app password, no spaces needed

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    email = request.form.get('email')
    if not name or not email:
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
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(YOUR_EMAIL, YOUR_EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
