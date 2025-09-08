from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Email configuration
EMAIL_CONFIG = {
    'smtp_server': 'smtp.gmail.com',
    'smtp_port': 587,
    'email': os.environ.get('EMAIL_USER', 'rajat.jasiwalmgs2@gmail.com'),
    'password': os.environ.get('EMAIL_PASSWORD', 'your-app-password')
}

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'message': f'{field} is required'}), 400
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_CONFIG['email']
        msg['To'] = EMAIL_CONFIG['email']  # Send to yourself
        msg['Subject'] = f"Portfolio Contact: {data['subject']}"
        
        # Email body
        body = f"""
        New message from portfolio contact form:
        
        Name: {data['firstName']} {data['lastName']}
        Email: {data['email']}
        Subject: {data['subject']}
        
        Message:
        {data['message']}
        
        Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
        server.starttls()
        server.login(EMAIL_CONFIG['email'], EMAIL_CONFIG['password'])
        text = msg.as_string()
        server.sendmail(EMAIL_CONFIG['email'], EMAIL_CONFIG['email'], text)
        server.quit()
        
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error sending message: {str(e)}'}), 500

@app.route('/call')
def make_call():
    phone_number = request.args.get('number', '7081156813')
    return redirect(f'tel:{phone_number}')

@app.route('/whatsapp')
def whatsapp_message():
    message = request.args.get('message', 'Hello! I saw your portfolio and would like to connect.')
    phone_number = request.args.get('number', '7081156813')
    whatsapp_url = f'https://wa.me/{phone_number.replace("+", "7081156813").replace("-", "").replace(" ", "")}?text={message}'
    return redirect(whatsapp_url)

@app.route('/chat', methods=['POST'])
def chat_api():
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        # AI Response Logic
        responses = {
            'projects': "I have several exciting projects including an E-Commerce website built with Flask, a Task Management App with React, and a Data Visualization Dashboard. You can view all my projects on the Projects page!",
            'contact': "You can contact me through multiple channels: Email me at rajat.developer@example.com, call me at +1 (555) 123-4567, or message me on WhatsApp. I'm always happy to connect!",
            'skills': "I specialize in Python, JavaScript, HTML5, CSS3, Flask, React, and modern web technologies. I also have experience with databases, APIs, and cloud services.",
            'hello': "Hello! I'm your AI assistant. I can help you learn more about this portfolio, the projects, or how to get in touch. What would you like to know?",
            'experience': "I have 3+ years of experience in web development, working with various technologies and frameworks. I've completed numerous freelance projects and continue to learn new technologies.",
            'education': "I have a Bachelor's degree in Computer Science and a Full Stack Development Certification. I'm passionate about continuous learning and staying updated with the latest technologies.",
            'default': "That's an interesting question! I'm here to help you learn more about this portfolio. You can ask me about projects, skills, contact information, or anything else you'd like to know."
        }
        
        # Determine response based on keywords
        if any(word in user_message for word in ['project', 'work', 'portfolio', 'build']):
            response = responses['projects']
        elif any(word in user_message for word in ['contact', 'reach', 'email', 'phone', 'call']):
            response = responses['contact']
        elif any(word in user_message for word in ['skill', 'technology', 'programming', 'language']):
            response = responses['skills']
        elif any(word in user_message for word in ['hello', 'hi', 'hey', 'greeting']):
            response = responses['hello']
        elif any(word in user_message for word in ['experience', 'work', 'job', 'career']):
            response = responses['experience']
        elif any(word in user_message for word in ['education', 'degree', 'study', 'learn']):
            response = responses['education']
        else:
            response = responses['default']
        
        return jsonify({
            'success': True,
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/ai_search', methods=['POST'])
def ai_search():
    try:
        data = request.get_json()
        query = data.get('query', '').lower()
        
        # AI Knowledge Base
        ai_responses = {
            # Portfolio related
            'portfolio': {
                'title': 'About This Portfolio',
                'answer': 'This is a modern, responsive portfolio built with Flask, featuring real-time chat, AI search, and interactive animations. It showcases web development skills and projects.',
                'type': 'ai'
            },
            'developer': {
                'title': 'About the Developer',
                'answer': 'I am a passionate Full-Stack Developer with expertise in Python, JavaScript, Flask, React, and modern web technologies. I love creating innovative digital solutions.',
                'type': 'ai'
            },
            'projects': {
                'title': 'Featured Projects',
                'answer': 'My projects include an E-Commerce platform, Task Management app, Data Visualization dashboard, Personal blog, Weather app, and Browser games. Each project demonstrates different technical skills.',
                'type': 'ai'
            },
            'skills': {
                'title': 'Technical Skills',
                'answer': 'I specialize in Python, JavaScript, HTML5, CSS3, Flask,Bootstrap, React, Node.js,Mysql Databases, APIs, cloud services, and modern development tools.',
                'type': 'ai'
            },
            'contact': {
                'title': 'How to Contact',
                'answer': 'You can reach me via email at rajat.jaiswalmgs2@gmail.com, phone at 7081156813, WhatsApp, or through the contact form on this website.',
                'type': 'ai'
            },
            'experience': {
                'title': 'Professional Experience',
                'answer': 'I have one years of experience in Full Stack Development, working on various projects including  personal projects, and continuous learning of new technologies.',
                'type': 'ai'
            },
            'education': {
                'title': 'Education & Certifications',
                'answer': 'I hold a Bachelor\'s degree in Computer Science and a Full Stack Development Certification. I\'m committed to continuous learning and staying updated with the latest technologies.',
                'type': 'ai'
            },
            # Technology related
            'python': {
                'title': 'Python Programming',
                'answer': 'Python is a versatile programming language used for web development, data science, AI, and automation. It\'s known for its simple syntax and powerful libraries.',
                'type': 'ai'
            },
            'javascript': {
                'title': 'JavaScript Development',
                'answer': 'JavaScript is the language of the web, enabling interactive websites and applications. It\'s used for both frontend and backend development with frameworks like React and Node.js.',
                'type': 'ai'
            },
            'flask': {
                'title': 'Flask Framework',
                'answer': 'Flask is a lightweight Python web framework that provides tools for building web applications. It\'s flexible and allows developers to choose their own tools and libraries.',
                'type': 'ai'
            },
            'react': {
                'title': 'React Library',
                'answer': 'React is a JavaScript library for building user interfaces, particularly single-page applications. It uses a component-based architecture and virtual DOM for efficient rendering.',
                'type': 'ai'
            },
            'html': {
                'title': 'HTML5',
                'answer': 'HTML5 is the latest version of HTML, providing semantic elements, multimedia support, and improved accessibility. It\'s the foundation of modern web development.',
                'type': 'ai'
            },
            'css': {
                'title': 'CSS3',
                'answer': 'CSS3 brings advanced styling capabilities including animations, transitions, flexbox, grid, and responsive design features for creating modern, beautiful websites.',
                'type': 'ai'
            },
            # General questions
            'web development': {
                'title': 'Web Development',
                'answer': 'Web development involves creating websites and web applications using technologies like HTML, CSS, JavaScript, and various frameworks. It includes both frontend and backend development.',
                'type': 'ai'
            },
            'programming': {
                'title': 'Programming',
                'answer': 'Programming is the process of creating instructions for computers to follow. It involves problem-solving, logical thinking, and using programming languages to build software applications.',
                'type': 'ai'
            },
            'technology': {
                'title': 'Technology Trends',
                'answer': 'Current technology trends include AI/ML, cloud computing, mobile development, cybersecurity, and modern web frameworks. Staying updated with these trends is crucial for developers.',
                'type': 'ai'
            }
        }
        
        # Search for matching responses
        results = []
        query_words = query.split()
        
        for key, response in ai_responses.items():
            if any(word in key for word in query_words) or any(word in query for word in key.split('_')):
                results.append(response)
        
        # If no specific match, provide general information
        if not results:
            if any(word in query for word in ['what', 'how', 'why', 'when', 'where', 'who']):
                results.append({
                    'title': 'General Information',
                    'answer': 'I can help you with information about web development, programming, this portfolio, or general technology questions. Try asking about specific topics like Python, JavaScript, or web development.',
                    'type': 'ai'
                })
            else:
                results.append({
                    'title': 'Search Suggestion',
                    'answer': 'I can provide information about web development, programming languages, this portfolio, or technology topics. Try asking about Python, JavaScript, React, Flask, or web development.',
                    'type': 'ai'
                })
        
        return jsonify({
            'success': True,
            'results': results[:3],  # Limit to 3 results
            'query': query,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
