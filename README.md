# Code Plus — n8n Community Node

รัน JavaScript แบบกำหนดเอง พร้อมติดตั้งไลบรารี npm ระหว่างรัน และมีแคชถาวรสำหรับใช้งานซ้ำ

![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)
![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

**แพ็คเกจ:** `@warnyin/n8n-nodes-code-plus`

## เกี่ยวกับ
- ติดตั้งไลบรารี npm จาก UI ของโน้ดได้โดยตรง (เช่น `nanoid,lodash` หรือ JSON array)
- แคชไลบรารีในไดเรกทอรีถาวรเพื่อใช้ซ้ำ ลดเวลาและทรัพยากร
- โค้ดเริ่มต้น (Init Code) รันเพียงครั้งเดียวก่อนโค้ดหลัก
- โหมดการรัน: ต่อรายการ (Per Item) หรือครั้งเดียว (Once)
- ตั้งค่า Timeout, ล้างแคช, และบังคับติดตั้งใหม่ได้
- รันใน VM ที่จำกัดพร้อม `require` แบบกำหนดเองผูกกับแคช

โครงสร้างและรูปแบบเอกสารได้รับแรงบันดาลใจจากสไตล์การเขียน README ของแพ็คเกจ Swagger API สำหรับ n8n ของผู้เขียนเดียวกัน [อ้างอิง][ref-swagger]。

## คุณสมบัติเด่น
- ติดตั้ง npm dependencies ได้โดยตรงในขั้นตอนการทำงาน
- รองรับทั้ง comma-separated และ JSON array สำหรับรายการไลบรารี
- จัดเก็บในแคชถาวร (ค่าเริ่มต้น `~/.n8n/code-plus-cache`)
- เลือกโหมดการรัน: `Per Item` หรือ `Once`
- ตัวเลือกความปลอดภัยและประสิทธิภาพ: Timeout, Clear Cache, Force Reinstall, Preinstall Only
- ใช้ `require()` เฉพาะจากแคชเพื่อคุมสCOPE

## การติดตั้ง
### วิธีที่ 1: Community Nodes (แนะนำ)
1) เปิด n8n ไปที่ `Settings → Community Nodes`
2) กด `Install`
3) ใส่ชื่อแพ็คเกจ: `@warnyin/n8n-nodes-code-plus`
4) ยอมรับความเสี่ยงและติดตั้ง

### วิธีที่ 2: ติดตั้งด้วยตนเอง
```bash
cd ~/.n8n/nodes
npm install @warnyin/n8n-nodes-code-plus
# รีสตาร์ท n8n
```

### วิธีที่ 3: พัฒนาและเชื่อมโยงแบบโลคอล
```bash
# โคลน ติดตั้ง และบิลด์
git clone https://github.com/warnyin/n8n-nodes-code-plus.git
cd n8n-nodes-code-plus
npm install
npm run build

# ลิงก์ไปยัง n8n
npm link
cd ~/.n8n
npm link @warnyin/n8n-nodes-code-plus
# รีสตาร์ท n8n
```

## การใช้งาน
### พารามิเตอร์หลัก
- `Libraries`: ตัวอย่าง `nanoid@latest,lodash` หรือ `["nanoid","dayjs@^1"]`
- `Init Code`: โค้ดที่รันครั้งเดียวก่อนโค้ดหลัก
- `Main Code`: โค้ดหลักที่ใช้ `require()` โหลดไลบรารีจากแคช
- `Run Mode`: `Per Item` หรือ `Once`
- `Options`:
  - `Cache Directory`: ค่าเริ่มต้น `~/.n8n/code-plus-cache`
  - `Clear Cache Before Run`
  - `Force Reinstall`
  - `Timeout (ms)`
  - `Preinstall Only`

### Quick Start
ตัวอย่าง `Main Code` แบบง่ายในการสร้างไอดี
```js
const { nanoid } = require('nanoid');
return { id: nanoid(), input: item };
```

## ตัวอย่างการใช้งาน
- สร้างไอดีสำหรับแต่ละรายการด้วย `nanoid`
```js
const { nanoid } = require('nanoid');
return items.map((item) => ({ ...item, id: nanoid() }));
```

- ใช้ `lodash` เพื่อจัดกลุ่มข้อมูล
```js
const _ = require('lodash');
const chunks = _.chunk(items, 50);
return { chunksCount: chunks.length };
```

- รันครั้งเดียวด้วย `dayjs` เพื่อปั๊ม timestamp
```js
const dayjs = require('dayjs');
return { generatedAt: dayjs().toISOString() };
```

## หมายเหตุและข้อจำกัด
- ต้องมีสิทธิ์และการเข้าถึงเครือข่ายเพื่อ `npm install` บนเซิร์ฟเวอร์ n8n
- ไลบรารีถูกติดตั้งในไดเรกทอรีแคชเท่านั้น ไม่ใช่ภายใน n8n โดยตรง
- `require()` จำกัดให้โหลดจากแคช แต่ยังใช้ Node built-ins ผ่าน sandbox ได้
- หลีกเลี่ยงโค้ดที่รันยาวหรือบล็อก; ตั้งค่า `Timeout (ms)` ให้เหมาะสม
- เวอร์ชัน `0.1.1` ปรับโครงสร้างไฟล์บิลด์ให้ n8n โหลดถูกต้องที่ `dist/nodes/CodePlus/CodePlus.node.js`

## การพัฒนา
```bash
npm install
npm run build
# ใช้ npm link ตามขั้นตอนด้านบนเพื่อเชื่อมกับ n8n
```

## Changelog
- ดูรายละเอียดการเปลี่ยนแปลงใน `CHANGELOG.md`

## License
- MIT License — ดูรายละเอียดใน `LICENSE.md`

## อ้างอิง
- [0] @warnyin/n8n-nodes-swagger-api — แนวทางจัดโครงสร้าง README และส่วนต่าง ๆ [ref-swagger]

[ref-swagger]: https://www.npmjs.com/package/@warnyin/n8n-nodes-swagger-api#-warnyinn8n-nodes-swagger-api