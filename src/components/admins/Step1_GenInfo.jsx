import { useEffect, useState } from "react";

export default function Step1_GenInfo({ formData, updateFormData }) {

    const [minEndDate, setMinEndDate] = useState("");

    useEffect(() => {
        if (formData.startDate) {
            setMinEndDate(formData.startDate);
            if (formData.endDate && formData.endDate < formData.startDate) {
                updateFormData({ endDate: "" });
            }
        }
    }, [formData.startDate, formData.endDate]);
    const handleChange = (e) => {
        const { id, value } = e.target;
        updateFormData({ [id]: value });
    };

    return (
        <>
            <h3 className="fw-bold">General Info</h3>
            <p className="text-muted mb-4">Please provide your class name, teacher's email address, and description.</p>
            <form className="form-add-class">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Class Name</label>
                    <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input type="date" className="form-control" id="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input type="date" className="form-control" id="endDate" min={minEndDate} value={formData.endDate} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} />
                </div>
            </form>
        </>
    );
}
