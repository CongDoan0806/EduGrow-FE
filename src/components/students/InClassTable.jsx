function InClassTable () {
    return (
      <div className="in-class-container">
        <h2 className="title-in-class">IN CLASS</h2>
        <div className="table-wrapper">
          <table className="in-class-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skills/Module</th>
                <th>My Lesson</th>
                <th>Self-assessment</th>
                <th>My Difficulties</th>
                <th>My Plan</th>
                <th>Problem Solved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20 Mar</td>
                <td>SPEAKING</td>
                <td>Interview with friends who have stayed in hostels</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>21 Mar</td>
                <td>TOEIC</td>
                <td>Interview with friends who have stayed in hostels</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>22 Mar</td>
                <td>IT ENGLISH</td>
                <td>Interview with friends who have stayed in hostels</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button className="add-button"> + </button>
        </div>
      </div>
  );
}
export default InClassTable;

