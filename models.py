from flask_sqlalchemy import SQLAlchemy
from backend import db

db = SQLAlchemy()  # Creating the database object

# ---------------------- User Model (For Authentication) ----------------------
class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed Password

# ---------------------- PatientINFO Table ----------------------
class PatientINFO(db.Model):
    __tablename__ = "PatientINFO"

    PatientID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-increment enabled
    PatientName = db.Column(db.String(50), nullable=False)
    Age = db.Column(db.Integer, nullable=False)
    Gender = db.Column(db.String(1), nullable=False)
    CG_ID = db.Column(db.Integer, nullable=False)

    # Relationship with Diagnoses
    diagnoses = db.relationship("Diagnoses", backref="patient", lazy=True)

    # Relationship with Reports
    reports = db.relationship("ReportINFO", backref="patient", lazy=True)

# ---------------------- DoctorINFO Table ----------------------
class DoctorINFO(db.Model):
    __tablename__ = "DoctorINFO"

    Dr_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-increment enabled
    DoctorNAME = db.Column(db.String(50), nullable=False)
    Specialization = db.Column(db.String(50), nullable=False)
    StartDate = db.Column(db.Date, nullable=False)
    EndDate = db.Column(db.Date, nullable=True)

    # Relationship with Reports
    reports = db.relationship("ReportINFO", backref="doctor", lazy=True)

# ---------------------- Diagnoses Table ----------------------
class Diagnoses(db.Model):
    __tablename__ = "Diagnoses"

    DiagnosisID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-increment enabled
    PatientID = db.Column(db.Integer, db.ForeignKey("PatientINFO.PatientID"), nullable=False)
    Diagnosis = db.Column(db.String(20), nullable=False)

# ---------------------- DoctorPatient Table (Linking Doctors and Patients) ----------------------
class DoctorPatient(db.Model):
    __tablename__ = "DoctorPatient"

    PatientID = db.Column(db.Integer, db.ForeignKey("PatientINFO.PatientID"), primary_key=True)
    Dr_ID = db.Column(db.Integer, db.ForeignKey("DoctorINFO.Dr_ID"), primary_key=True)

# ---------------------- ReportINFO Table ----------------------
class ReportINFO(db.Model):
    __tablename__ = "ReportINFO"

    RepID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-increment enabled
    Dr_ID = db.Column(db.Integer, db.ForeignKey("DoctorINFO.Dr_ID"), nullable=False)
    Date = db.Column(db.Date, nullable=True)
    LabID = db.Column(db.Integer, nullable=False)
    PatientID = db.Column(db.Integer, db.ForeignKey("PatientINFO.PatientID"), nullable=False)
