const priorityLabels = {
  normal: 'ปกติ',
  urgent: 'เร่งด่วน',
};

function RequestCard({ request, onDeleteRequest }) {
  const priorityLabel = priorityLabels[request.priority] ?? request.priority;

  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p className={`priority-badge priority-${request.priority}`}>
          ความเร่งด่วน: {priorityLabel}
        </p>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;