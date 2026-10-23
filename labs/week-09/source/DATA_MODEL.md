# DATA_MODEL.md — การออกแบบฐานข้อมูล Campus Service Request

ผู้จัดทำ: นรบดี บุญเลิศ · 68543210013-7

ตรวจ R1 วันที่ 22 ตุลาคม 2026 จาก `schema.sql`, `queries.sql` และสำเนา `campus.db` ด้วย Node.js v24.19.0 / `node:sqlite` ไม่แก้ฐานข้อมูลต้นฉบับ

---

## 1. ภาพรวม

ฐานข้อมูลของงานนี้แบ่งออกเป็น 2 ตาราง คือ `users` และ `requests`

- `users` ใช้เก็บข้อมูลของผู้ใช้งาน
- `requests` ใช้เก็บข้อมูลคำร้อง

ความสัมพันธ์เป็นแบบ One-to-Many คือ user 1 คนสามารถมี request ได้หลายรายการ

```text
users
- id (PK)
- name
- department
- email

        1
        |
        | requester_id
        |
        N

requests
- id (PK)
- requester_id (FK)
- request_type
- location
- details
- priority
- status
- created_at
```

---

## 2. ทำไมต้องแยกเป็น 2 ตาราง

ตอน Week 06–07 เราเก็บ `requesterName` ไว้ในทุกคำร้องโดยตรง ซึ่งถ้าผู้ใช้คนเดิมสร้างหลายคำร้อง ชื่อของผู้ใช้คนนั้นก็จะถูกเก็บซ้ำหลายครั้ง

ตัวอย่างเช่น สมชายมีคำร้อง 5 รายการ ชื่อ `สมชาย ใจดี` ก็จะถูกเก็บซ้ำอยู่ในทั้ง 5 รายการ ถ้าวันหนึ่งสมชายเปลี่ยนชื่อ เราจะต้องไปแก้ข้อมูลในทุกคำร้องที่เป็นของสมชาย และถ้าแก้ไม่ครบก็อาจทำให้ข้อมูลไม่ตรงกัน

การแยกตาราง `users` และ `requests` ช่วยแก้ปัญหานี้ โดยข้อมูลของผู้ใช้จะถูกเก็บไว้ใน `users` เพียงครั้งเดียว ส่วนใน `requests` จะเก็บแค่ `requester_id` เพื่ออ้างอิงไปยังผู้ใช้คนนั้น

เช่น ถ้าสมชายมี `id = 1` คำร้องของสมชายก็จะเก็บแค่

`requester_id = 1`

ดังนั้นถ้าสมชายเปลี่ยนชื่อ เราแก้ชื่อแค่ครั้งเดียวในตาราง `users` ไม่ต้องตามแก้ทุกคำร้อง

วิธีนี้ช่วยลดข้อมูลที่ซ้ำกัน ทำให้ข้อมูลแก้ไขง่ายขึ้น และลดโอกาสที่ข้อมูลของผู้ใช้จะไม่ตรงกัน

อีกปัญหาคือเมื่อเก็บผู้แจ้งไว้เฉพาะในคำร้อง จะเก็บผู้ใช้ที่ยังไม่มีคำร้องไม่ได้ การแยก `users` ทำให้เพิ่มข้อมูลผู้ใช้ได้อิสระ นอกจากนี้การพิมพ์ชื่อผู้ใช้เดิมต่างกันในแต่ละคำร้องทำให้ไม่รู้ว่าเป็นคนเดียวกัน การอ้างอิงด้วย id และ Foreign Key ช่วยยืนยันว่ามีผู้ใช้ที่อ้างถึงจริง แต่ไม่ได้ตรวจการสะกดชื่อหรือป้องกันผู้ใช้ซ้ำด้วยชื่ออย่างเดียว

---

## 3. รายละเอียดตาราง

### users

| คอลัมน์ | ชนิด | ข้อกำหนด | เหตุผล |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | เลขอ้างอิงภายในที่ไม่ผูกกับชื่อซึ่งเปลี่ยนได้ |
| name | TEXT | NOT NULL | เก็บชื่อผู้แจ้งหนึ่งครั้งต่อผู้ใช้ |
| department | TEXT | NOT NULL | รองรับการ JOIN/กรองคำร้องตามภาควิชา |
| email | TEXT | NOT NULL, UNIQUE | เก็บช่องทางติดต่อและป้องกันอีเมลซ้ำ |

### requests

| คอลัมน์ | ชนิด | ข้อกำหนด | เหตุผล |
|---|---|---|---|
| id | TEXT | PRIMARY KEY | รหัสธุรกิจรูปแบบ REQ-001 ใช้ตรงกับ API |
| requester_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES users(id) | เชื่อมไปหาผู้แจ้งจริงโดยไม่คัดลอกชื่อ |
| request_type | TEXT | NOT NULL, CHECK IN ('แจ้งซ่อม','บริการบัญชีผู้ใช้','ขอใช้อุปกรณ์','อื่น ๆ') | จำกัดประเภทให้เป็นชุดเดียวกัน |
| location | TEXT | NOT NULL | ระบุสถานที่ให้บริการ |
| details | TEXT | NOT NULL | เก็บรายละเอียดคำร้อง |
| priority | TEXT | NOT NULL, DEFAULT 'normal', CHECK IN ('normal','urgent') | มีความเร่งด่วนที่ถูกต้องแม้ไม่ส่งค่ามา |
| status | TEXT | NOT NULL, DEFAULT 'pending', CHECK IN ('pending','in-progress','completed') | ใช้สถานะมาตรฐานและเริ่มจากรอดำเนินการ |
| created_at | TEXT | NOT NULL, DEFAULT datetime('now','localtime') | เก็บเวลาที่สร้างเพื่อแสดง/เรียงข้อมูล |

ตรวจ `PRAGMA table_info`, `PRAGMA foreign_key_list` และ `sqlite_master` บนสำเนาแล้วตรงกับ schema มีผู้ใช้ 4 คนและคำร้อง 8 รายการ ต้องเปิด `PRAGMA foreign_keys=ON` ในแต่ละ connection SQLite จึงบังคับ Foreign Key

ข้อจำกัดที่มีอยู่จริง: `NOT NULL` ไม่ได้ปฏิเสธสตริงว่าง และ schema นี้ไม่ได้ CHECK ความยาว details หรือรูปแบบอีเมล `requests.id` เป็น TEXT PRIMARY KEY โดยไม่มี NOT NULL แยก (PRAGMA แสดง notnull=0) จึงไม่อ้างว่า schema ป้องกัน NULL ของคอลัมน์นี้แล้ว ไม่แก้ schema ใน R1

---

## 4. เหตุผลของการเลือกชนิดและข้อกำหนด

`users.id` ใช้ INTEGER เพราะเป็น surrogate key ภายใน ฐานข้อมูลสร้างเลขให้ ส่วน `requests.id` ใช้ TEXT เพื่อคงรหัสอย่าง REQ-001 ที่แสดงต่อผู้ใช้และใช้ใน URL ของ API การเลือกต่างกันช่วยให้เก็บความหมายของรหัสแต่ละชนิดได้ ไม่ต้องบังคับให้ทุกตารางใช้ id ชนิดเดียวกัน

API validation ช่วยส่ง HTTP 400 พร้อมข้อความที่ผู้ใช้เข้าใจ แต่ข้อมูลอาจถูกเขียนผ่าน SQL script หรือโปรแกรมอื่นที่ไม่ได้ผ่าน API จึงต้องมี CHECK ที่ฐานข้อมูลด้วยเพื่อรักษาค่าประเภท/priority/status API และ DB ตรวจคนละขอบเขตและทำหน้าที่เสริมกัน

---

## 5. ตัวอย่างการใช้ JOIN

คำสั่งข้อ ⑤ จาก `queries.sql` ที่รันจริงบนสำเนา:

```sql
SELECT r.id, u.name AS requesterName, r.request_type, r.location, r.status
FROM requests r
JOIN users u ON u.id = r.requester_id
ORDER BY r.id;
```

| id | requesterName | request_type | location | status |
|---|---|---|---|---|
| REQ-001 | สมชาย ใจดี | แจ้งซ่อม | ห้องปฏิบัติการ 301 | pending |
| REQ-002 | สุภาวดี รักเรียน | บริการบัญชีผู้ใช้ | อาคารวิศวกรรม | in-progress |
| REQ-003 | ธนกฤต ตั้งใจ | ขอใช้อุปกรณ์ | ห้องประชุม 2 | completed |
| REQ-004 | สมชาย ใจดี | แจ้งซ่อม | ห้องปฏิบัติการ 302 | pending |
| REQ-005 | ปรียา ขยันยิ่ง | อื่น ๆ | ห้องสมุด ชั้น 2 | pending |
| REQ-006 | สุภาวดี รักเรียน | แจ้งซ่อม | ห้องปฏิบัติการ 401 | pending |
| REQ-007 | ธนกฤต ตั้งใจ | อื่น ๆ | อาคารวิศวกรรม | in-progress |
| REQ-008 | ปรียา ขยันยิ่ง | ขอใช้อุปกรณ์ | ห้องสมุด ชั้น 1 | completed |

รัน SELECT ทั้ง 8 ข้อใน `queries.sql` ได้จำนวนแถวตามลำดับ: 8, 4, 3, 2, 8, 4, 4, 3 รัน `schema.sql` สองครั้งบนฐานข้อมูลในหน่วยความจำได้ users=4 / requests=8 ทั้งโครงสร้างและ seed สร้างซ้ำได้

---

## 6. ข้อสังเกตสำหรับสัปดาห์ที่ 10

Week 07 API ส่งคำร้องเป็น JSON ที่มี `requesterName` โดยตรง เช่นข้อมูล REQ-001 ใน `api/data/initialRequests.json`:

```json
{"id":"REQ-001","requesterName":"สมชาย ใจดี","requestType":"แจ้งซ่อม","location":"ห้องปฏิบัติการ 301","details":"เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า","priority":"urgent","status":"pending"}
```

ผล JOIN ดึงชื่อจาก users ผ่าน requester_id แล้วตั้ง alias `requesterName` ให้เหมือน API ได้ ใน Week 10 ต้องเลือก details/priority เพิ่มและใช้ `request_type AS requestType` เพื่อคง contract ที่ React ใช้ ข้อมูล SQL ไม่จำเป็นต้องมีโครงเหมือน JSON ภายใน แต่ Service เป็นจุดแปลง rows → JSON จึงเปลี่ยนฐานข้อมูลโดยคงชื่อ field ฝั่ง Frontend ได้ ไม่ใช่ว่าข้อมูล seed ทุกแถวของ Week 07 และ 09 เหมือนกันทั้งหมด

## ผลการทดสอบ Constraint

ทำทั้ง 5 ข้อบนสำเนา หลัง `PRAGMA foreign_keys=ON` โดยใช้ SAVEPOINT และ ROLLBACK หลังแต่ละกรณี ทุกข้อถูกปฏิเสธจริง ผลดิบอยู่ใน [SQL audit evidence](../evidence/sql-audit-r1.json)

### 1. Foreign Key

```sql
INSERT INTO requests (id,requester_id,request_type,location,details)
VALUES ('R1-FK',99999,'แจ้งซ่อม','ห้องทดสอบ','ทดสอบ Foreign Key');
```

ผล: `FOREIGN KEY constraint failed`

### 2. CHECK ของ status

```sql
INSERT INTO requests (id,requester_id,request_type,location,details,status)
VALUES ('R1-STATUS',1,'แจ้งซ่อม','ห้องทดสอบ','ทดสอบ CHECK','ยกเลิก');
```

ผล: `CHECK constraint failed: status IN ('pending', 'in-progress', 'completed')`

### 3. UNIQUE ของ email

```sql
INSERT INTO users (name,department,email)
SELECT 'R1','ทดสอบ',email FROM users WHERE id=1;
```

ผล: `UNIQUE constraint failed: users.email`

### 4. Primary Key ซ้ำ

```sql
INSERT INTO requests (id,requester_id,request_type,location,details)
SELECT id,requester_id,request_type,location,details
FROM requests ORDER BY id LIMIT 1;
```

ผล: `UNIQUE constraint failed: requests.id`

### 5. ไม่ส่ง location

```sql
INSERT INTO requests (id,requester_id,request_type,details)
VALUES ('R1-NULL',1,'แจ้งซ่อม','ทดสอบ NOT NULL');
```

ผล: `NOT NULL constraint failed: requests.location`

## References & AI Assistance

- [Instructor CP24–CP25 Guide](https://github.com/se-rmutl/engse203-lab/blob/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-09-sql-fundamentals/lab09/LAB09_TAKEHOME_GUIDE_TH.md)
- Codex ช่วยอ่าน schema, รัน SQL บนสำเนา และเติมเอกสารใน R1 ไม่มีการเปลี่ยน schema, queries หรือฐานข้อมูลจริง นักศึกษาต้องทบทวนเหตุผลและอธิบาย JOIN/constraints ได้ด้วยตนเองก่อนส่ง revision
