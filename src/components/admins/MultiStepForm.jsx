import { useEffect, useState } from 'react';
import './MultiStepForm.css';
import Step1_GenInfo from './Step1_GenInfo';
import Step2_SelectTeacher from './Step2_SelectTeacher';
import Step3_SelectStudent from './Step3_SelectStudent';
import Step4_SelectImg from './Step4_SelectImg';
import FormSidebar from './FormSidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function MultiStepForm({ onClose, onSubmit }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [teacher, setTeacher] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        teacherId: null,
        studentIds: [],
        classImage: ''
    });
    const updateFormData = (newData) => {
        setFormData(prevData => ({ ...prevData, ...newData }));
    };
    const handleNextStep = () => {
        if (!validateStep()) {
            toast.error("Please complete this step before proceeding.");
            return;
        }
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            const form = new FormData();

            form.append("name", formData.name);
            form.append("description", formData.description || "");
            form.append("start_date", formData.startDate);
            form.append("end_date", formData.endDate);
            form.append("teacher_id", formData.teacherId);

    
            formData.studentIds.forEach((id) => {
                form.append("student_ids[]", id); 
            });
            if (formData.classImage instanceof File) {
                form.append("img", formData.classImage);
            } else if (typeof formData.classImage === "string") {
                form.append("img", formData.classImage);
            }

            const token = localStorage.getItem("token");

            await axios.post("http://127.0.0.1:8000/api/admin/add-class", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast("Class created successfully!");
            onSubmit();
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Submission failed.");
        }
    };



    const validateStep = () => {
    switch (currentStep) {
        case 1:
            return formData.name && formData.startDate && formData.endDate;
        case 2:
            return !!formData.teacherId;
        case 3:
            return formData.studentIds.length > 0;
        case 4:
            return !!formData.classImage;
        default:
            return false;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1_GenInfo formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <Step2_SelectTeacher formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <Step3_SelectStudent formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <Step4_SelectImg formData={formData} updateFormData={updateFormData}/>;
            default:
                return <Step1_GenInfo formData={formData} updateFormData={updateFormData} />;
        }
    };
    return (
        <div className="container form-addclass-container my-5">
            <div className="form-add-class row shadow rounded bg-white overflow-hidden">
                <button class="close-btn close-x-btn d-flex justify-content-center align-items-center" 
                    onClick={() => onClose()} >
                    <i class="bi bi-x-lg"></i>
                </button>
                <FormSidebar currentStep={currentStep}/>
                <div className="col-md-8 p-4">
                    {renderStepContent()}
                    <div className="footer-buttons">
                        {currentStep > 1 && (
                            <button className={currentStep > 1 ? 'backward-button' : 'hide-btn'} onClick={handlePrevStep} type="button"><i class="bi bi-chevron-left"></i> Go Back </button>
                        )}

                        {currentStep <= 4 && (
                            <button className={currentStep <= 4 ? 'forward-button' : 'hide-btn'} onClick={currentStep < 4 ? handleNextStep : handleSubmit} type="button" > {currentStep < 4 ? "Next Step" : "Confirm"} </button>
                        )}
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>

    )
}