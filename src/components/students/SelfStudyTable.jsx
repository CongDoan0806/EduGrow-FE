function SelfStudyTable () {
  return (
    <div className="self-study-container">
      <h2 className="title-self-study">SELF-STUDY</h2>
      <div className="table-wrapper">
        <table className="self-study-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skills/Module</th>
              <th>My lesson</th>
              <th>Time allocation</th>
              <th>Learning resources</th>
              <th>Learning activities</th>
              <th>Concentration</th>
              <th>Plan & follow plan</th>
              <th>Evaluation of my work</th>
              <th>Reinforcing learning</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30 Mar</td>
              <td>TOEIC</td>
              <td>Reviewed vocabulary learned and grammar</td>
              <td>1 hour</td>
              <td>Youtube</td>
              <td>Read the questions carefully multiple times and selected the correct answers</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>Improved vocabulary</td>
              <td>I will review it at the weekend.</td>
              <td></td>
            </tr>
            <tr>
              <td>30 Mar</td>
              <td>SPEAKING</td>
              <td>Practiced shadowing with videos on Youtube.</td>
              <td>30 minutes</td>
              <td>Tiktok</td>
              <td>Watched repeatedly and read along.</td>
              <td>No</td>
              <td>No</td>
              <td>The pauses and intonation were incorrect</td>
              <td>I will review it at the weekend.</td>
              <td></td>
            </tr>
            <tr>
              <td>31 Mar</td>
              <td>IT ENGLISH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button className="add-button" disabled>+</button>

        {/* {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Comment</h2>
              <span className="close-btn" onClick={() => setIsModalOpen(false)}>×</span>
            </div>
            <div className="comment-list">
              <div className="comment-item">
                <div className="comment-header">
                  <span className="comment-user">February student</span>
                  <span className="comment-time">6:00AM</span>
                </div>
                <p className="comment-text">@Thuy Trang Could you give me some feedback on this part, please?</p>
              </div>
              <div className="comment-item">
                <div className="comment-header">
                  <span className="comment-user">February student</span>
                  <span className="comment-time">6:00AM</span>
                </div>
                <p className="comment-text"></p>
              </div>
            </div>
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
}
export default SelfStudyTable;
