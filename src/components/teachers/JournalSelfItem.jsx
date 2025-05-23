import { format } from 'date-fns/format';
export default function JournalSelfItem({ journal }) {
    const { subject_name, my_lesson, time_allocation, learning_resources, learning_activities, isConcentration, isFollowPlan, evaluation, reinforcing, note, created_at } = journal;

    const formattedDate = format(new Date(created_at), 'dd MMM'); 

    return (
       <tr>
            <td>{formattedDate}</td>
            <td>{subject_name}</td>
            <td>{my_lesson}</td>
            <td>{time_allocation}</td>
            <td>{learning_resources}</td>
            <td>{learning_activities}</td>
            <td>{isConcentration !== 0 ? 'Yes' : 'No'}</td>
            <td>{isFollowPlan !== 0 ? 'Yes' : 'No'}</td>
            <td>{evaluation}</td>
            <td>{reinforcing}</td>
            <td>{note}</td>
        </tr>
    );
}