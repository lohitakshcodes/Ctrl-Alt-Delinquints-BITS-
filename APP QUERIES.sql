-- --creating table DoctorINFO
--  CREATE TABLE DoctorINFO( DoctorNAME varchar(50),
--  Dr_ID int NOT NULL PRIMARY KEY,
--  Specialization varchar(50));

--creating table CaregiverINFO
-- CREATE TABLE CaregiverINFO( CaregiverNAME varchar(50),
-- CG_ID int NOT NULL PRIMARY KEY, 
-- Relation varchar(25) NOT NULL, 
-- Full_Part_Time varchar(10));

--creating table PatientINFO
--  CREATE TABLE PatientINFO(PatientName varchar(50) NOT NULL,
--  PatientID int NOT NULL PRIMARY KEY, 
--  Age int NOT NULL, 
--  Gender char(1) NOT NULL, 
--  CG_ID int NOT NULL,
--  FOREIGN KEY (CG_ID) REFERENCES CaregiverINFO(CG_ID));

--creating liason table for diagnoses 
--  CREATE TABLE Diagnoses(PatientID int NOT NULL, 
--  Diagnosis varchar(20), 
--  DiagnosisID int NOT NULL,
--  FOREIGN KEY (PatientID) REFERENCES PatientINFO(PatientID));

--creating table Prescriptions 
-- CREATE TABLE Prescriptions(Prescription BLOB,
-- StartDate date NOT NULL,
-- EndDate date,
-- Dr_ID int NOT NULL,
-- FOREIGN KEY (Dr_ID) REFERENCES DoctorINFO(Dr_ID));

--creating table ReportINFO
-- CREATE TABLE ReportINFO(Dr_ID int NOT NULL,
-- Date date,
-- LabID int NOT NULL,
-- RepID int NOT NULL PRIMARY KEY,
-- PatientID int NOT NULL,
-- FOREIGN KEY (Dr_ID) REFERENCES DoctorINFO(Dr_ID),
-- FOREIGN KEY (RepID) REFERENCES LabINFO(RepID),
-- FOREIGN KEY (PatientID) REFERENCES PatientINFO(PatientID));

--create table labINFO
-- CREATE TABLE LabINFO(LabID int NOT NULL PRIMARY KEY,
-- RepID int,
-- FOREIGN KEY (RepID) REFERENCES ReportINFO(RepID));

--create table Symptoms
-- CREATE TABLE Symptoms(PatientID int NOT NULL, 
-- Symptoms varchar(100),
-- Date date, 
-- FOREIGN KEY (PatientID) REFERENCES PatientINFO(PatientID));

--creating liaison table between doctor and patient
--  CREATE TABLE DoctorPatient(PatientID int NOT NULL,
--  Dr_ID int NOT NULL,
--  StartDate date,
--  EndDate date,
--  FOREIGN KEY (PatientID) REFERENCES PatientINFO(PatientID),
--  FOREIGN KEY (Dr_ID) REFERENCES DoctorINFO(Dr_ID));

--INSERTING VALUES in PatientINFO table
--INSERT INTO PatientINFO VALUES
--("Priya Jain", 1, 65, "F", 1),
--("Sarthak Badhe", 2, 43, "M", 2),
--("Tejaswini Singh", 3, 52, "F", 3);

--inserting values in Diagnoses
--    INSERT INTO Diagnoses VALUES(1, "Arthritis", 1),
--     (1, "PCOD", 2),
--     (2, "Diabetes", 3),
--     (2, "Asthama", 4),
--     (3, "Arthritis", 1),
--     (3, "Asthama", 4);

--inserting values in doctor table 
--  INSERT INTO DoctorINFO VALUES 
--  ("Lohitaksh Khemka", 1, "Orthopaedics"),
--  ("Yugin Gupte", 2, "OB/GYN"),
--  ("Tejas Burhade", 3, "Allergist/Immunologist"),
--  ("Sanjay Nimhan", 4, "Endocrinologist");

--inserting values in doctor patient liaison table
-- INSERT INTO DoctorPatient VALUES
-- (1, 1, "2024-10-02", NULL),
-- (1, 2, "2023-08-12", "2025-01-02"),
-- (2, 4, "2023-12-12", NULL),
-- (2, 3, "2020-03-04", NULL),
-- (3, 1, "2024-02-03", "2025-03-18"),
-- (3, 3, "2020-11-03", NULL);

--   INSERT INTO Symptoms VALUES
--   (1, "Knee Pain", "2025-03-20"),
--   (1, "Delayed menses", "2025-03-20"),
--   (2, "High blood sugar", "2025-03-18"),
--   (2, "Shortness of breath", "2025-03-14"),
--   (3, "Knee Pain", "2025-03-19");

 SELECT * FROM PatientINFO;
 SELECT * FROM Diagnoses;
 SELECT * FROM Symptoms;
 SELECT * FROM DoctorINFO;
 SELECT * FROM DoctorPatient;

 
--querying patient details and diagnoses
   SELECT PatientINFO.PatientID, Diagnoses.DiagnosisID, Diagnoses.Diagnosis,
    PatientINFO.PatientName
    FROM PatientINFO, Diagnoses
    WHERE PatientINFO.PatientID=Diagnoses.PatientID;

--querying patient details and symptoms
 SELECT PatientINFO.PatientID, Symptoms.Symptoms, Symptoms.Date,
   PatientINFO.PatientName
   FROM PatientINFO, Symptoms
   WHERE PatientINFO.PatientID=Symptoms.PatientID;

--querying doctor and patient details 
SELECT PatientINFO.PatientID, PatientINFO.PatientName,
DoctorPatient.Dr_ID
FROM PatientINFO, DoctorPatient
WHERE PatientINFO.PatientID=DoctorPatient.PatientID;
