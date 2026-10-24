# ENGSE203 LAB 02 — Modern JavaScript

## ผู้จัดทำ

- **ชื่อ-นามสกุล:** นรบดี บุญเลิศ
- **รหัสนักศึกษา:** 68543210013-7
- **ระบบปฏิบัติการที่ใช้:** macOS

---

# วัตถุประสงค์ของงาน

- ศึกษาการพัฒนาเว็บด้วย Modern JavaScript
- เรียนรู้การใช้งาน Vite สำหรับสร้างโปรเจกต์
- ฝึกการจัดการโปรเจกต์ด้วย npm และ package.json
- ศึกษาการใช้งาน ES Module
- ทดลอง Build และ Preview เว็บไซต์

---

# เครื่องมือที่ใช้

- macOS
- Visual Studio Code
- Node.js
- npm
- Vite
- Git
- GitHub

---

# วิธีติดตั้งและรัน

ติดตั้ง Dependencies

```bash
npm install
```

เริ่ม Development Server

```bash
npm run dev
```

Build โปรเจกต์

```bash
npm run build
```

Preview หลัง Build

```bash
npm run preview
```

ตรวจสอบความถูกต้องของโปรเจกต์

```bash
npm run check
```

---

# โครงสร้างไฟล์

```bash
.
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
├── scripts/
├── src/
└── docs/
```

---

# หลักฐานผลลัพธ์

เมื่อรันคำสั่ง

```bash
npm run dev
```

Vite จะเริ่ม Development Server และแสดง URL สำหรับเปิดเว็บไซต์ เช่น

```text
VITE v8.x.x ready

➜ Local:   http://localhost:5173/
➜ Network: use --host to expose
```

จากนั้นสามารถเปิด URL ที่แสดงในเว็บเบราว์เซอร์เพื่อดูผลลัพธ์ของโปรเจกต์ได้

> แนบภาพหน้าจอ Terminal และหน้าเว็บที่รันได้ตามที่ใบงานกำหนด

---

# อธิบายผลลัพธ์

โปรเจกต์สามารถติดตั้ง Dependencies ได้สำเร็จ และรันผ่าน Vite Development Server ได้ตามปกติ

ภายในโปรเจกต์มีการใช้

- Vite สำหรับพัฒนาและ Build เว็บไซต์
- npm Scripts สำหรับจัดการคำสั่งต่าง ๆ
- ES Module ในการจัดการไฟล์ JavaScript
- โครงสร้างโปรเจกต์มาตรฐานของ Vite

เมื่อเปิดเว็บไซต์ผ่าน URL ที่ Vite สร้างขึ้น หน้าเว็บจะแสดงผลได้ถูกต้อง แสดงว่า Environment และการตั้งค่าโปรเจกต์ทำงานสมบูรณ์

---

# ปัญหาที่พบและวิธีแก้ไข

**ปัญหา**

- ไม่พบปัญหาในการติดตั้งหรือรันโปรเจกต์

**วิธีแก้**

- -

---

# References & AI Assistance

## Submission URLs และ Screenshot Evidence (ตรวจ R1)

- [Student Repository](https://github.com/nara-bodee/engse203-student-labs-68543210013)
- [Pages LAB02](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-02/)
- [Merged PR #2](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/2), tag เดิม `lab-02-submission-v1`
- [Normal](../evidence/dashboard-success-desktop-1280.png), [Error](../evidence/dashboard-error-state.png), [Filter done](../evidence/dashboard-filter-done.png), [Mobile 375px](../evidence/dashboard-mobile-375.png)

วันที่ 22 ตุลาคม 2026 รัน `npm ci`, `npm run check`, `npm run build` สำเร็จ ตรวจ Pages โหลดข้อมูล 6 รายการ (todo=4, doing=1, done=1), filter Done เหลือ 1 รายการ และ `?simulateError=1` แสดงข้อความผิดพลาดตามที่กำหนด ภาพเป็น evidence เดิม ข้อความ macOS ด้านบนอธิบายงานเดิม ส่วนรอบ R1 ใช้ Windows/PowerShell

Codex ช่วย audit, รัน check/build, ตรวจ Browser และเติมลิงก์ที่ README ยังขาดใน R1 ไม่แก้ implementation

### Source / Documentation

- https://vite.dev/
- https://nodejs.org/
- https://docs.npmjs.com/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript

### AI tool used

- ChatGPT (OpenAI)

### Used for

- ช่วยอธิบายการใช้งาน Vite
- ตรวจสอบความถูกต้องของโครงสร้าง README
- อธิบายคำสั่ง npm และการใช้งาน Modern JavaScript

### My adaptation

- ผู้จัดทำศึกษาคู่มือ ทดลองปฏิบัติ และปรับปรุง README ให้สอดคล้องกับผลการทดลองจริงของโปรเจกต์
