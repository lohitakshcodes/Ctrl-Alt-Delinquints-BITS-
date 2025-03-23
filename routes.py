from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from backend.models import db, PatientINFO, DoctorINFO, Diagnoses, DoctorPatient, ReportINFO
from datetime import datetime

# Create Blueprint
api_bp = Blueprint("api", __name__)
api = Api(api_bp)

# ---------------------- Patient Endpoints ----------------------
class PatientResource(Resource):
    def get(self, patient_id):
        patient = PatientINFO.query.get(patient_id)
        if not patient:
            return {"message": "Patient not found"}, 404
        return {
            "PatientID": patient.PatientID,
            "PatientName": patient.PatientName,
            "Age": patient.Age,
            "Gender": patient.Gender,
            "CG_ID": patient.CG_ID,
        }

    def post(self):
        try:
            data = request.json
            if not all(k in data for k in ["PatientName", "Age", "Gender", "CG_ID"]):
                return {"message": "Missing required fields"}, 400

            new_patient = PatientINFO(
                PatientName=data["PatientName"],
                Age=data["Age"],
                Gender=data["Gender"],
                CG_ID=data["CG_ID"],
            )
            db.session.add(new_patient)
            db.session.commit()
            return {"message": "Patient added successfully", "PatientID": new_patient.PatientID}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error: {str(e)}"}, 400

# ---------------------- Doctor Endpoints ----------------------
class DoctorResource(Resource):
    def get(self, doctor_id):
        doctor = DoctorINFO.query.get(doctor_id)
        if not doctor:
            return {"message": "Doctor not found"}, 404
        return {
            "Dr_ID": doctor.Dr_ID,
            "DoctorNAME": doctor.DoctorNAME,
            "Specialization": doctor.Specialization,
            "StartDate": doctor.StartDate.strftime("%Y-%m-%d") if doctor.StartDate else None,
            "EndDate": doctor.EndDate.strftime("%Y-%m-%d") if doctor.EndDate else None,
        }

    def post(self):
        try:
            data = request.json
            if not all(k in data for k in ["DoctorNAME", "Specialization", "StartDate"]):
                return {"message": "Missing required fields"}, 400
            
            start_date = datetime.strptime(data["StartDate"], "%Y-%m-%d").date()
            end_date = datetime.strptime(data["EndDate"], "%Y-%m-%d").date() if "EndDate" in data else None

            new_doctor = DoctorINFO(
                DoctorNAME=data["DoctorNAME"],
                Specialization=data["Specialization"],
                StartDate=start_date,
                EndDate=end_date,
            )
            db.session.add(new_doctor)
            db.session.commit()
            return {"message": "Doctor added successfully", "Dr_ID": new_doctor.Dr_ID}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error: {str(e)}"}, 400

# ---------------------- Diagnoses Endpoints ----------------------
class DiagnosesResource(Resource):
    def get(self, diagnosis_id):
        diagnosis = Diagnoses.query.get(diagnosis_id)
        if not diagnosis:
            return {"message": "Diagnosis not found"}, 404
        return {
            "DiagnosisID": diagnosis.DiagnosisID,
            "PatientID": diagnosis.PatientID,
            "Diagnosis": diagnosis.Diagnosis,
        }

    def post(self):
        try:
            data = request.json
            if not all(k in data for k in ["PatientID", "Diagnosis"]):
                return {"message": "Missing required fields"}, 400

            new_diagnosis = Diagnoses(
                PatientID=data["PatientID"],
                Diagnosis=data["Diagnosis"],
            )
            db.session.add(new_diagnosis)
            db.session.commit()
            return {"message": "Diagnosis added successfully", "DiagnosisID": new_diagnosis.DiagnosisID}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error: {str(e)}"}, 400

# ---------------------- Doctor-Patient Endpoints ----------------------
class DoctorPatientResource(Resource):
    def get(self, patient_id):
        doctor_patient = DoctorPatient.query.filter_by(PatientID=patient_id).all()
        if not doctor_patient:
            return {"message": "No doctor-patient relationship found"}, 404
        return [{"PatientID": dp.PatientID, "Dr_ID": dp.Dr_ID} for dp in doctor_patient]

    def post(self):
        try:
            data = request.json
            if not all(k in data for k in ["PatientID", "Dr_ID"]):
                return {"message": "Missing required fields"}, 400

            new_relationship = DoctorPatient(
                PatientID=data["PatientID"],
                Dr_ID=data["Dr_ID"],
            )
            db.session.add(new_relationship)
            db.session.commit()
            return {"message": "Doctor assigned to patient successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error: {str(e)}"}, 400

# ---------------------- Report Endpoints ----------------------
class ReportResource(Resource):
    def get(self, report_id):
        report = ReportINFO.query.get(report_id)
        if not report:
            return {"message": "Report not found"}, 404
        return {
            "RepID": report.RepID,
            "Dr_ID": report.Dr_ID,
            "Date": report.Date.strftime("%Y-%m-%d") if report.Date else None,
            "LabID": report.LabID,
            "PatientID": report.PatientID,
        }

    def post(self):
        try:
            data = request.json
            if not all(k in data for k in ["Dr_ID", "LabID", "PatientID"]):
                return {"message": "Missing required fields"}, 400

            report_date = datetime.strptime(data["Date"], "%Y-%m-%d").date() if "Date" in data else None

            new_report = ReportINFO(
                Dr_ID=data["Dr_ID"],
                Date=report_date,
                LabID=data["LabID"],
                PatientID=data["PatientID"],
            )
            db.session.add(new_report)
            db.session.commit()
            return {"message": "Report added successfully", "RepID": new_report.RepID}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": f"Error: {str(e)}"}, 400

# Register Resources with API
api.add_resource(PatientResource, "/patients", "/patients/<int:patient_id>")
api.add_resource(DoctorResource, "/doctors", "/doctors/<int:doctor_id>")
api.add_resource(DiagnosesResource, "/diagnoses", "/diagnoses/<int:diagnosis_id>")
api.add_resource(DoctorPatientResource, "/doctor-patient", "/doctor-patient/<int:patient_id>")
api.add_resource(ReportResource, "/reports", "/reports/<int:report_id>")
