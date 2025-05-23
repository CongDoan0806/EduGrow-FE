
export default function FormSidebar({ currentStep }){
    const imageUrl = process.env.PUBLIC_URL + '/assets/images/admin/bg-sidebar-desktop.svg';
    const steps = [
        { number: 1, label: 'GENERAL INFO' },
        { number: 2, label: 'CHOOSE A TEACHER' },
        { number: 3, label: 'CHOOSE STUDENTS' },
        { number: 4, label: 'CHOOSE IMAGE' }
    ];

    return (
        <div className="col-md-4 bg-gradient text-white p-4 form-step-sidebar" >
            <img src={imageUrl} alt="Sidebar Background" className="sidebar-background-image" />
            <div className="position-relative z-1">
            {steps.map((step) => (
            <div
                key={step.number}
                className={`step my-4 ${currentStep === step.number ? 'active' : ''}`}
            >
                <div className="step-number">{step.number}</div>
                <div className="step-label">{step.label}</div>
            </div>
            ))}
        </div>
        </div>
    )
}