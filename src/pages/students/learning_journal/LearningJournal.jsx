import './LearningJournal.css';
import JournalInfoPanel from '../../../components/students/learning_journal/JournalInfoPanel';
import InClassTable from '../../../components/students/learning_journal/InClassTable';
import SelfStudyTable from '../../../components/students/learning_journal/SelfStudyTable';
import { useState } from 'react';

function LearningJounal () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    // Đóng modal khi nhấp ra ngoài
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
        setIsModalOpen(false);
        }
    };

    return (
        <div>
            <div className='header' style={{ background: '#7B6ADA', height: '60px' }}>Hearder</div>
            <div className='content'>
                <section className='journal-info-panel'>
                    <JournalInfoPanel onNeedReviewClick={openModal}></JournalInfoPanel>
                </section>
                <section className='in-class-table'>
                    <InClassTable></InClassTable>
                </section>
                <section className='self-study-table'>
                    <SelfStudyTable></SelfStudyTable>
                 </section>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className='modal-title'>Comment</h2>
                            <span className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</span>
                        </div>
                        <div className="comment-list">
                            <div className="comment-item">
                                <div className='comment-container'>
                                    <div className="comment-header">
                                        <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />
                                        <div className='comment-title'>
                                            <div className='comment-info'>
                                                <span className="comment-user">Talbony student</span>
                                                <span className="comment-role">student</span>
                                            </div>
                                            <span className="comment-time">6:00AM</span>
                                        </div>
                                    </div>
                                    <p className="comment-text">
                                        <span className='tag'>@Thuy Trang </span>Could you give me some feedback on this part, please?
                                    </p>
                                </div>
                                <div className="comment-input-container">
                                    <div className="comment-input-wrapper">
                                        <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />
                                        <input
                                        type="text"
                                        placeholder="Write a comment"
                                        className="comment-input"
                                        />
                                        <button className="send-btn" disabled>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000" />
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default LearningJounal;