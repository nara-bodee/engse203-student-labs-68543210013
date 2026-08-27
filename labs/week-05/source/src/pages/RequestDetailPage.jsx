import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequestById } from '../services/requestService.js';

function RequestDetailPage() {
  const { requestId } = useParams();
  const [reloadKey, reload] = useManualReload();
  const [loadState, setLoadState] = useState('idle');
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    setLoadState('loading');
    setRequest(null);
    setErrorMessage('');

    getRequestById(requestId)
      .then((result) => {
        if (ignore) return;
        setRequest(result);
        setLoadState('success');
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        setLoadState('error');
      });

    return () => { ignore = true; };
  }, [requestId, reloadKey]);

  return (
    <section data-testid="page-request-detail">
      <div className="page-heading"><div><p className="eyebrow dark">REQUEST DETAIL</p><h1>รายละเอียดคำร้อง</h1><p>อ่านรหัสจาก URL แล้วโหลดผ่าน Service · แยกกรณีพบและไม่พบให้ชัด</p></div></div>
      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={reload} />}
      {loadState === 'success' && request === null && (
        <section className="state-card" data-testid="request-not-found">
          <h2>ไม่พบคำร้องรหัส {requestId}</h2>
          <p>เส้นทางนี้ถูกต้อง แต่ไม่มีข้อมูลคำร้องรหัสนี้ในระบบ</p>
          <Link className="button primary inline" to="/">กลับหน้าหลัก</Link>
        </section>
      )}
      {loadState === 'success' && request && (
        <article className="panel detail-panel">
          <p className="eyebrow dark">{request.id}</p>
          <h2>{request.requestType}</h2>
          <dl className="detail-list">
            <div><dt>ผู้แจ้ง</dt><dd>{request.requesterName}</dd></div>
            <div><dt>สถานที่</dt><dd>{request.location}</dd></div>
            <div><dt>ความเร่งด่วน</dt><dd>{request.priority}</dd></div>
            <div><dt>สถานะ</dt><dd>{request.status}</dd></div>
            <div><dt>รายละเอียด</dt><dd>{request.details}</dd></div>
          </dl>
          <Link className="button ghost inline" to="/">กลับ Dashboard</Link>
        </article>
      )}
    </section>
  );
}

export default RequestDetailPage;
