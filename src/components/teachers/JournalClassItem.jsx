import { format } from 'date-fns/format';
export default function JournalClassItem({ journal }) {
    const { subject_name, my_lesson, self_assessment, difficulties, plan, isSolved, created_at } = journal;

    const formattedDate = format(new Date(created_at), 'dd MMM'); 

    return (
       <tr>
            <td>{formattedDate}</td>
            <td>{subject_name}</td>
            <td>{my_lesson}</td>
            <td>{self_assessment}</td>
            <td>{difficulties}</td>
            <td>{plan}</td>
            <td>{isSolved !== 0 ? 'Yes' : 'No'}</td>
        </tr>
    );
}