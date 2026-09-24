import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import useManualReload from "../hooks/useManualReload.js";
import {
  getRequestById,
  updateRequestStatus,
} from "../services/requestService.js";

function RequestDetailPage() {
  const { requestId } = useParams();
  const [loadState, setLoadState] = useState("loading");
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [reloadKey, reload] = useManualReload();

  useEffect(() => {
    let ignore = false;
    setLoadState("loading");
    getRequestById(requestId)
      .then((result) => {
        if (ignore) return;
        setRequest(result);
        setLoadState("success");
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(
          error instanceof Error ? error.message : "โหลดรายละเอียดไม่สำเร็จ",
        );
        setLoadState("error");
      });
    async function handleChangeStatus(nextStatus) {
      if (!request) return;

      setUpdating(true);
      setErrorMessage("");

      try {
        const updated = await updateRequestStatus(request.id, nextStatus);
        setRequest(updated);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "เปลี่ยนสถานะไม่สำเร็จ",
        );
      } finally {
        setUpdating(false);
      }
    }
    return () => {
      ignore = true;
    };
  }, [requestId, reloadKey]);

  return (
    <section data-testid="page-request-detail">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">DYNAMIC ROUTE</p>
          <h1>รายละเอียดคำร้อง</h1>
          <p>
            Request ID: <code>{requestId}</code>
          </p>
        </div>
      </div>
      {loadState === "loading" && (
        <LoadingState message="กำลังโหลดรายละเอียด…" />
      )}
      {loadState === "error" && (
        <ErrorState message={errorMessage} onRetry={reload} />
      )}
      {loadState === "success" && !request && (
        <section className="state-card">
          <h2>ไม่พบคำร้อง</h2>
          <p>
            ไม่พบข้อมูลสำหรับ ID <code>{requestId}</code>
          </p>
          <Link to="/">กลับ Dashboard</Link>
        </section>
      )}
      {loadState === "success" && request && (
        <article className="panel detail-card">
          <h2>{request.requestType}</h2>
          <dl>
            <div>
              <dt>ID</dt>
              <dd>{request.id}</dd>
            </div>
            <div>
              <dt>ผู้แจ้ง</dt>
              <dd>{request.requesterName}</dd>
            </div>
            <div>
              <dt>สถานที่</dt>
              <dd>{request.location}</dd>
            </div>
            <div>
              <dt>รายละเอียด</dt>
              <dd>{request.details}</dd>
            </div>
            <div>
              <dt>ความเร่งด่วน</dt>
              <dd>{request.priority}</dd>
            </div>
            <div>
              <dt>สถานะ</dt>
              <dd>{request.status}</dd>
            </div>
          </dl>
          <div className="status-actions">
            <button
              type="button"
              disabled={updating || request.status === "pending"}
              onClick={() => handleChangeStatus("pending")}
            >
              Pending
            </button>

            <button
              type="button"
              disabled={updating || request.status === "in-progress"}
              onClick={() => handleChangeStatus("in-progress")}
            >
              In Progress
            </button>

            <button
              type="button"
              disabled={updating || request.status === "completed"}
              onClick={() => handleChangeStatus("completed")}
            >
              Completed
            </button>
          </div>

          {errorMessage && <p role="alert">{errorMessage}</p>}

          <Link to="/">กลับ Dashboard</Link>
        </article>
      )}
    </section>
  );
}

export default RequestDetailPage;
