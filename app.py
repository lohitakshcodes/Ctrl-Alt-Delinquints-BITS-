from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from backend.models import db
from backend import create_app
import os

# Initialize extensions (db first as models will need it)
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    
    # ---------------- CONFIGURATION ----------------
    # Base directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(BASE_DIR, "APP.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # JWT Configuration
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_fallback_secret_key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour in seconds

    # ---------------- INITIALIZE EXTENSIONS ----------------
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # ---------------- REGISTER BLUEPRINTS ----------------
    from backend.routes import api_bp
    from backend.auth import auth_bp
    
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # ---------------- SHELL CONTEXT ----------------
    @app.shell_context_processor
    def make_shell_context():
        return {'db': db}

    # ---------------- ROUTES ----------------
    @app.route('/')
    def home():
        return 'API is working with JWT!'

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)