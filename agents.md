# openmind Feature Summary

เอกสารนี้สรุปฟีเจอร์หลักของโปรเจกต์ `openmind` สำหรับคนหรือ agent ที่เข้ามาดูแลต่อ

## ภาพรวม

`openmind` เป็นเว็บ quiz หน้าเดียวสำหรับฝึกคิดเชิงตรรกะและโจทย์สมอง ใช้ HTML, CSS และ JavaScript แบบ static site ไม่มี build step หรือ dependency ฝั่ง server

ไฟล์หลัก:

- `index.html` เป็น entry point ของหน้าเว็บ โหลดฟอนต์, stylesheet, Twemoji, `quiz.js` และ `openmind.js`
- `quiz.js` เก็บข้อมูลโจทย์ทั้งหมด ระบบภาษา state ของเกม และ logic การ render quiz
- `openmind.js` ดูแลปุ่มสลับภาษาและเริ่มต้น quiz
- `openmind.css` ดูแล layout, component, responsive style และ visual state ของคำตอบ
- `favicon/logo.png` เป็น favicon ของเว็บ

## ฟีเจอร์ที่มี

### Quiz Chapters

- มีทั้งหมด 6 บท รวม 66 ข้อ
- บทที่มีอยู่:
  - บททดลอง / Warm-Up
  - บทที่ 1 / Chapter 1
  - บทที่ 2 / Chapter 2
  - บทที่ 3 / Chapter 3
  - บทที่ 4 / Chapter 4
  - บทที่ 5 / Chapter 5
- แต่ละบทมี title, description และรายการคำถามของตัวเอง
- ผู้ใช้สามารถสลับบทได้จาก chapter switcher ด้านบน
- chip ของแต่ละบทแสดงจำนวนข้อที่ทำแล้วเทียบกับจำนวนข้อทั้งหมดของบทนั้น

### Question Navigation

- แต่ละบทมี jump navigation เป็นปุ่มเลขข้อ
- ปุ่มข้อปัจจุบันมีสถานะ `is-current`
- ข้อที่เคยตรวจคำตอบแล้วมีสถานะ `is-completed`
- ผู้ใช้ย้อนกลับไปข้อก่อนหน้า หรือข้ามไปข้อใดก็ได้ในบท
- เมื่อเปลี่ยนข้อหรือเปลี่ยนบท หน้าเลื่อนกลับขึ้นด้านบนแบบ smooth scroll

### Answer Flow

- คำถามรองรับ multiple choice ผ่าน `QUESTION_CHOICES`
- ปุ่มตรวจคำตอบจะ disabled จนกว่าจะเลือกตัวเลือก
- เมื่อตรวจคำตอบแล้ว:
  - ตัวเลือกที่ถูกจะแสดงสถานะ `is-correct`
  - ตัวเลือกที่เลือกผิดจะแสดงสถานะ `is-wrong`
  - แสดง feedback ว่าถูกหรือยังไม่ถูก
  - แสดงคำตอบที่ถูก
  - แสดงเฉลยและวิธีคิด
- บางคำถามรองรับโหมดเปิดเฉลยโดยไม่มีตัวเลือก ถ้าไม่มี `choices`

### Explanations and Diagrams

- คำถามสามารถมี diagram แบบ inline SVG ผ่าน field `diagram`
- เฉลยสามารถมี diagram คำตอบผ่าน field `answerDiagram`
- ระบบแปลง emoji ใน SVG ให้ใช้ Twemoji SVG เพื่อให้ภาพนิ่งและสม่ำเสมอข้าม platform
- มี helper `pixelizeDiagramMarkup()` เพื่อปรับ SVG ให้คมและเข้ากับสไตล์ pixel/quiz มากขึ้น
- เฉลยหลายข้อใช้ `.explain-step` เพื่อแบ่งวิธีคิดเป็นขั้นตอน
- รองรับตารางในเฉลยผ่าน `.explain-table`

### Language Support

- รองรับภาษาไทยและอังกฤษ
- ค่าเริ่มต้นเป็นภาษาไทย
- ภาษาที่เลือกถูกบันทึกใน `localStorage` ด้วย key `openmind-language`
- ปุ่มสลับภาษาอยู่ด้านบนของ quiz และใช้ `aria-pressed`
- `window.openmindI18n` เป็น interface หลักสำหรับ:
  - อ่านภาษาปัจจุบัน
  - เปลี่ยนภาษา
  - translate UI text
  - subscribe ตอนภาษาเปลี่ยน
  - localize value ที่มีรูปแบบ `{ th, en }`
- ข้อมูลแปลโจทย์และเฉลยอยู่ใน `QUESTION_TRANSLATIONS`, `QUESTION_EXPLANATION_OVERRIDES` และ `ADDITIONAL_EXPLANATION_OVERRIDES`

### Completion Flow

- เมื่อจบบท ระบบแสดงหน้าสรุปว่าจบบทแล้ว
- ถ้ายังมีบทถัดไป จะมีปุ่มไปบทถัดไป
- มีปุ่ม replay เพื่อกลับไปเล่นข้อใดก็ได้ในบทที่จบแล้ว
- มีปุ่มเล่นใหม่อีกครั้งสำหรับ reset state ของบทปัจจุบัน
- ถ้าจบบทสุดท้าย จะแสดงข้อความครบทุกบทแล้ว

### UI and Styling

- Layout หลักถูกออกแบบเป็น mobile-first โดย shell กว้างสูงสุดประมาณ 430px
- ใช้ card, chip, pill button และ jump button เป็น component หลัก
- มี visual state สำหรับ:
  - active language
  - current chapter
  - started chapter
  - current question
  - completed question
  - selected answer
  - correct answer
  - wrong answer
- ใช้ Google Fonts หลายชุด รวมถึง `Noto Sans Thai`
- โหลด Twemoji จาก CDN เพื่อ normalize emoji rendering

## State ที่สำคัญ

`quizState` ใน `quiz.js` เก็บ state runtime:

- `currentSection` index ของบทปัจจุบัน
- `currentQuestion` index ของข้อปัจจุบัน
- `answeredBySection` คำตอบและสถานะที่ทำแล้ว แยกตามบท
- `revealed` บอกว่าเฉลยของข้อปัจจุบันถูกเปิดแล้วหรือยัง

state คำตอบต่อข้อเก็บข้อมูลเช่น:

- `selectedChoice`
- `checked`
- `isCorrect`
- `completedOnce`

## จุดที่ควรรู้ก่อนแก้ไขต่อ

- ข้อมูลโจทย์จำนวนมากอยู่ในไฟล์เดียวคือ `quiz.js`; ควรแก้แบบระวัง scope
- ถ้าเพิ่มคำถามแบบ multiple choice ต้องเพิ่มข้อมูลใน `QUIZ_SECTIONS` และเพิ่มตัวเลือกใน `QUESTION_CHOICES`
- ถ้าต้องการรองรับอังกฤษครบ ต้องเพิ่ม translation/override ให้ question id ที่เกี่ยวข้อง
- ถ้าเพิ่ม emoji ใน SVG diagram ระบบพยายามแปลงเป็น Twemoji ผ่าน `replaceSvgEmojiWithTwemoji()`
- โปรเจกต์นี้เป็น static site จึงเปิด `index.html` ได้โดยตรงใน browser
