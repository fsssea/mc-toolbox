// 基岩版常用语言支持：先做核心界面短语，未覆盖的句子保持原文（不伪造翻译）
export const LANGS = [
  ['zh_CN', '简体中文'], ['zh_TW', '繁體中文'], ['en_US', 'English (US)'], ['en_GB', 'English (UK)'],
  ['ja_JP', '日本語'], ['ko_KR', '한국어'], ['fr_FR', 'Français'], ['de_DE', 'Deutsch'],
  ['es_ES', 'Español (España)'], ['es_MX', 'Español (México)'], ['pt_BR', 'Português (Brasil)'], ['pt_PT', 'Português (Portugal)'],
  ['ru_RU', 'Русский'], ['it_IT', 'Italiano'], ['pl_PL', 'Polski'], ['tr_TR', 'Türkçe'],
  ['nl_NL', 'Nederlands'], ['sv_SE', 'Svenska'], ['da_DK', 'Dansk'], ['nb_NO', 'Norsk bokmål'],
  ['fi_FI', 'Suomi'], ['cs_CZ', 'Čeština'], ['hu_HU', 'Magyar'], ['ro_RO', 'Română'],
  ['bg_BG', 'Български'], ['el_GR', 'Ελληνικά'], ['uk_UA', 'Українська'], ['id_ID', 'Bahasa Indonesia'],
  ['vi_VN', 'Tiếng Việt'], ['th_TH', 'ไทย'], ['ar_SA', 'العربية'], ['he_IL', 'עברית'], ['hi_IN', 'हिन्दी'],
];

// 顺序与 SRC 对应
const SRC = [
  '选择文件', '导出存档', '世界统计', '一键汉化', '译名修正', '更多工具', '制作器', '创作工坊',
  '世界观看', '玩家数据', '返回文件列表', '重新生成', '结构列表', '放大', '缩小', '适应宽度',
  '确定', '取消', '保存', '删除', '搜索', '关闭', 'MC工具箱',
];

const T = {
  zh_TW: ['選擇檔案','匯出存檔','世界統計','一鍵中文化','譯名修正','更多工具','製作器','創作工坊','世界觀看','玩家資料','返回檔案清單','重新產生','結構清單','放大','縮小','適應寬度','確定','取消','儲存','刪除','搜尋','關閉','MC工具箱'],
  en_US: ['Choose file','Export world','World stats','One-click translate','Fix names','More tools','Maker','Creation studio','World map','Player data','Back to files','Regenerate','Structure list','Zoom in','Zoom out','Fit width','OK','Cancel','Save','Delete','Search','Close','MC Toolbox'],
  en_GB: ['Choose file','Export world','World statistics','One-click translation','Fix names','More tools','Maker','Creation studio','World map','Player data','Back to files','Regenerate','Structure list','Zoom in','Zoom out','Fit width','OK','Cancel','Save','Delete','Search','Close','MC Toolbox'],
  ja_JP: ['ファイルを選択','ワールドを書き出す','ワールド統計','ワンクリック翻訳','訳名修正','その他のツール','メーカー','クリエイト工房','ワールド表示','プレイヤーデータ','ファイル一覧へ戻る','再生成','構造物一覧','拡大','縮小','幅に合わせる','OK','キャンセル','保存','削除','検索','閉じる','MCBE ツールボックス'],
  ko_KR: ['파일 선택','월드 내보내기','월드 통계','원클릭 번역','이름 수정','더 많은 도구','제작기','창작 공방','월드 보기','플레이어 데이터','파일 목록으로','다시 생성','구조물 목록','확대','축소','너비에 맞추기','확인','취소','저장','삭제','검색','닫기','MCBE 도구상자'],
  fr_FR: ['Choisir un fichier','Exporter le monde','Statistiques du monde','Traduction en un clic','Corriger les noms','Plus d’outils','Créateur','Atelier de création','Carte du monde','Données du joueur','Retour aux fichiers','Régénérer','Liste des structures','Zoom avant','Zoom arrière','Ajuster à la largeur','OK','Annuler','Enregistrer','Supprimer','Rechercher','Fermer','Boîte à outils MCBE'],
  de_DE: ['Datei auswählen','Welt exportieren','Weltstatistik','Ein-Klick-Übersetzung','Namenskorrektur','Mehr Tools','Ersteller','Kreativwerkstatt','Weltkarte','Spielerdaten','Zurück zur Dateiliste','Neu erzeugen','Strukturliste','Vergrößern','Verkleinern','An Breite anpassen','OK','Abbrechen','Speichern','Löschen','Suchen','Schließen','MCBE Werkzeugkasten'],
  es_ES: ['Elegir archivo','Exportar mundo','Estadísticas del mundo','Traducción en un clic','Corrección de nombres','Más herramientas','Creador','Taller de creación','Vista del mundo','Datos del jugador','Volver a archivos','Regenerar','Lista de estructuras','Acercar','Alejar','Ajustar al ancho','Aceptar','Cancelar','Guardar','Eliminar','Buscar','Cerrar','Caja de herramientas MCBE'],
  es_MX: ['Elegir archivo','Exportar mundo','Estadísticas del mundo','Traducción en un clic','Corrección de nombres','Más herramientas','Creador','Taller de creación','Vista del mundo','Datos del jugador','Volver a archivos','Regenerar','Lista de estructuras','Acercar','Alejar','Ajustar al ancho','Aceptar','Cancelar','Guardar','Eliminar','Buscar','Cerrar','Caja de herramientas MCBE'],
  pt_BR: ['Escolher arquivo','Exportar mundo','Estatísticas do mundo','Tradução em um clique','Correção de nomes','Mais ferramentas','Criador','Oficina de criação','Visualizar mundo','Dados do jogador','Voltar aos arquivos','Gerar novamente','Lista de estruturas','Ampliar','Reduzir','Ajustar à largura','OK','Cancelar','Salvar','Excluir','Pesquisar','Fechar','Caixa de ferramentas MCBE'],
  pt_PT: ['Escolher ficheiro','Exportar mundo','Estatísticas do mundo','Tradução num clique','Correção de nomes','Mais ferramentas','Criador','Oficina de criação','Ver mundo','Dados do jogador','Voltar aos ficheiros','Gerar novamente','Lista de estruturas','Ampliar','Reduzir','Ajustar à largura','OK','Cancelar','Guardar','Eliminar','Pesquisar','Fechar','Caixa de ferramentas MCBE'],
  ru_RU: ['Выбрать файл','Экспорт мира','Статистика мира','Перевод в один клик','Исправление названий','Больше инструментов','Создатель','Творческая мастерская','Просмотр мира','Данные игрока','Назад к файлам','Обновить','Список структур','Увеличить','Уменьшить','По ширине','ОК','Отмена','Сохранить','Удалить','Поиск','Закрыть','Инструменты MCBE'],
  it_IT: ['Scegli file','Esporta mondo','Statistiche mondo','Traduzione in un clic','Correggi nomi','Altri strumenti','Creatore','Officina creativa','Visualizza mondo','Dati giocatore','Torna ai file','Rigenera','Elenco strutture','Ingrandisci','Riduci','Adatta alla larghezza','OK','Annulla','Salva','Elimina','Cerca','Chiudi','Cassetta strumenti MCBE'],
  pl_PL: ['Wybierz plik','Eksportuj świat','Statystyki świata','Tłumaczenie jednym kliknięciem','Popraw nazwy','Więcej narzędzi','Kreator','Warsztat kreatywny','Widok świata','Dane gracza','Powrót do plików','Wygeneruj ponownie','Lista struktur','Powiększ','Pomniejsz','Dopasuj szerokość','OK','Anuluj','Zapisz','Usuń','Szukaj','Zamknij','Skrzynka narzędzi MCBE'],
  tr_TR: ['Dosya seç','Dünyayı dışa aktar','Dünya istatistikleri','Tek tıkla çeviri','Ad düzeltme','Daha fazla araç','Oluşturucu','Yaratım atölyesi','Dünya görünümü','Oyuncu verileri','Dosyalara dön','Yeniden oluştur','Yapı listesi','Büyüt','Küçült','Genişliğe sığdır','Tamam','İptal','Kaydet','Sil','Ara','Kapat','MCBE Araç Kutusu'],
  nl_NL: ['Bestand kiezen','Wereld exporteren','Wereldstatistieken','Eenklik vertaling','Naamcorrectie','Meer hulpmiddelen','Maker','Creatiewerkplaats','Wereldweergave','Spelergegevens','Terug naar bestanden','Opnieuw genereren','Structuurlijst','Inzoomen','Uitzoomen','Pas aan breedte','OK','Annuleren','Opslaan','Verwijderen','Zoeken','Sluiten','MCBE Gereedschapskist'],
  sv_SE: ['Välj fil','Exportera värld','Världsstatistik','Ett klicks översättning','Namnkorrigering','Fler verktyg','Skapare','Kreativ verkstad','Världsöversikt','Spelardata','Tillbaka till filer','Generera igen','Strukturlista','Zooma in','Zooma ut','Anpassa bredd','OK','Avbryt','Spara','Radera','Sök','Stäng','MCBE Verktygslåda'],
  da_DK: ['Vælg fil','Eksportér verden','Verdensstatistik','Oversættelse med ét klik','Navnerettelse','Flere værktøjer','Skaber','Kreativt værksted','Verdensvisning','Spillerdata','Tilbage til filer','Generér igen','Strukturliste','Zoom ind','Zoom ud','Tilpas bredde','OK','Annuller','Gem','Slet','Søg','Luk','MCBE Værktøjskasse'],
  nb_NO: ['Velg fil','Eksporter verden','Verdensstatistikk','Ett klikks oversettelse','Navnekorreksjon','Flere verktøy','Skaper','Kreativt verksted','Verdensvisning','Spillerdata','Tilbake til filer','Generer på nytt','Strukturliste','Zoom inn','Zoom ut','Tilpass bredde','OK','Avbryt','Lagre','Slett','Søk','Lukk','MCBE Verktøykasse'],
  fi_FI: ['Valitse tiedosto','Vie maailma','Maailman tilastot','Yhden napsautuksen käännös','Nimien korjaus','Lisää työkaluja','Tekijä','Luomistyöpaja','Maailmanäkymä','Pelaajatiedot','Takaisin tiedostoihin','Luo uudelleen','Rakenneluettelo','Lähennä','Loitonna','Sovita leveyteen','OK','Peruuta','Tallenna','Poista','Hae','Sulje','MCBE Työkalupakki'],
  cs_CZ: ['Vybrat soubor','Exportovat svět','Statistiky světa','Překlad jedním kliknutím','Oprava názvů','Více nástrojů','Tvůrce','Kreativní dílna','Zobrazení světa','Data hráče','Zpět k souborům','Znovu vytvořit','Seznam struktur','Přiblížit','Oddálit','Přizpůsobit šířce','OK','Zrušit','Uložit','Smazat','Hledat','Zavřít','Nástroje MCBE'],
  hu_HU: ['Fájl kiválasztása','Világ exportálása','Világstatisztika','Egykattintásos fordítás','Nevek javítása','További eszközök','Készítő','Kreatív műhely','Világnézet','Játékos adatai','Vissza a fájlokhoz','Újragenerálás','Szerkezetlista','Nagyítás','Kicsinyítés','Szélességhez igazítás','OK','Mégse','Mentés','Törlés','Keresés','Bezárás','MCBE Eszköztár'],
  ro_RO: ['Alege fișier','Exportă lumea','Statistici lume','Traducere cu un clic','Corectare nume','Mai multe unelte','Creator','Atelier creativ','Vizualizare lume','Date jucător','Înapoi la fișiere','Regenerează','Listă structuri','Mărire','Micșorare','Potrivește lățimea','OK','Anulează','Salvează','Șterge','Caută','Închide','Trusa de unelte MCBE'],
  bg_BG: ['Избор на файл','Експорт на свят','Статистика на свята','Превод с едно кликване','Корекция на имена','Още инструменти','Създател','Творческа работилница','Изглед на свята','Данни за играча','Назад към файловете','Генериране отново','Списък структури','Увеличи','Намали','По ширина','OK','Отказ','Запази','Изтрий','Търсене','Затвори','Инструменти MCBE'],
  el_GR: ['Επιλογή αρχείου','Εξαγωγή κόσμου','Στατιστικά κόσμου','Μετάφραση με ένα κλικ','Διόρθωση ονομάτων','Περισσότερα εργαλεία','Δημιουργός','Εργαστήριο δημιουργίας','Προβολή κόσμου','Δεδομένα παίκτη','Επιστροφή στα αρχεία','Αναδημιουργία','Λίστα δομών','Μεγέθυνση','Σμίκρυνση','Προσαρμογή πλάτους','OK','Ακύρωση','Αποθήκευση','Διαγραφή','Αναζήτηση','Κλείσιμο','Εργαλειοθήκη MCBE'],
  uk_UA: ['Вибрати файл','Експорт світу','Статистика світу','Переклад одним кліком','Виправлення назв','Більше інструментів','Створювач','Творча майстерня','Огляд світу','Дані гравця','Назад до файлів','Оновити','Список структур','Збільшити','Зменшити','За шириною','OK','Скасувати','Зберегти','Видалити','Пошук','Закрити','Інструменти MCBE'],
  id_ID: ['Pilih berkas','Ekspor dunia','Statistik dunia','Terjemahan sekali klik','Koreksi nama','Alat lainnya','Pembuat','Studio kreasi','Tampilan dunia','Data pemain','Kembali ke berkas','Buat ulang','Daftar struktur','Perbesar','Perkecil','Sesuaikan lebar','OK','Batal','Simpan','Hapus','Cari','Tutup','Kotak alat MCBE'],
  vi_VN: ['Chọn tệp','Xuất thế giới','Thống kê thế giới','Dịch một chạm','Sửa tên','Thêm công cụ','Trình tạo','Xưởng sáng tạo','Xem thế giới','Dữ liệu người chơi','Quay lại tệp','Tạo lại','Danh sách cấu trúc','Phóng to','Thu nhỏ','Vừa chiều rộng','OK','Hủy','Lưu','Xóa','Tìm kiếm','Đóng','Hộp công cụ MCBE'],
  th_TH: ['เลือกไฟล์','ส่งออกโลก','สถิติโลก','แปลด้วยคลิกเดียว','แก้ไขชื่อ','เครื่องมือเพิ่มเติม','ตัวสร้าง','ห้องสร้างสรรค์','มุมมองโลก','ข้อมูลผู้เล่น','กลับไปที่ไฟล์','สร้างใหม่','รายการโครงสร้าง','ขยาย','ย่อ','พอดีความกว้าง','ตกลง','ยกเลิก','บันทึก','ลบ','ค้นหา','ปิด','กล่องเครื่องมือ MCBE'],
  ar_SA: ['اختيار ملف','تصدير العالم','إحصاءات العالم','ترجمة بنقرة واحدة','تصحيح الأسماء','مزيد من الأدوات','المنشئ','ورشة الإبداع','عرض العالم','بيانات اللاعب','العودة إلى الملفات','إعادة التوليد','قائمة الهياكل','تكبير','تصغير','ملاءمة العرض','موافق','إلغاء','حفظ','حذف','بحث','إغلاق','صندوق أدوات MCBE'],
  he_IL: ['בחר קובץ','ייצא עולם','נתוני עולם','תרגום בלחיצה','תיקון שמות','עוד כלים','יוצר','סדנת יצירה','תצוגת עולם','נתוני שחקן','חזרה לקבצים','צור מחדש','רשימת מבנים','הגדל','הקטן','התאם לרוחב','אישור','ביטול','שמור','מחק','חפש','סגור','ארגז כלים MCBE'],
  hi_IN: ['फ़ाइल चुनें','विश्व निर्यात करें','विश्व आंकड़े','एक क्लिक अनुवाद','नाम सुधार','और उपकरण','निर्माता','रचना स्टूडियो','विश्व दृश्य','खिलाड़ी डेटा','फ़ाइलों पर वापस','फिर से बनाएं','संरचना सूची','बड़ा करें','छोटा करें','चौड़ाई में फ़िट','ठीक','रद्द','सहेजें','हटाएं','खोजें','बंद करें','MCBE टूलबॉक्स'],
};

function detectLang() {
  let raw = '';
  try {
    if (typeof navigator !== 'undefined' && navigator.language) raw = navigator.language;
    if (typeof location !== 'undefined' && location.search) {
      const q = new URLSearchParams(location.search).get('syslocale');
      if (q) raw = q;
    }
  } catch (e) { }
  if (!raw) return 'zh_CN';
  const norm = raw.replace('-', '_');
  const langs = LANGS.map(l => l[0]);
  if (langs.includes(norm)) return norm;
  const base = norm.split('_')[0].toLowerCase();
  const pref = { zh: norm.toLowerCase().includes('tw') || norm.toLowerCase().includes('hk') ? 'zh_TW' : 'zh_CN',
    en: 'en_US', es: 'es_ES', pt: 'pt_BR', nb: 'nb_NO', no: 'nb_NO' };
  const p = pref[base];
  if (p) return p;
  const hit = langs.find(c => c.split('_')[0].toLowerCase() === base);
  return hit || 'en_US';
}

let autoMode = true;
let lang = 'zh_CN';
try {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('mcbeLang');
    if (saved && saved !== 'auto') { autoMode = false; lang = saved; }
  }
} catch (e) { }
if (autoMode) lang = detectLang();

const REV = new Map();
for (const code of Object.keys(T)) { T[code].forEach((v, i) => { if (v && !REV.has(v)) REV.set(v, SRC[i]); }); }
function map() {
  const arr = T[lang];
  if (!arr) return null;
  const m = new Map();
  SRC.forEach((k, i) => m.set(k, arr[i]));
  return m;
}

export function setLang(code) {
  if (code === 'auto') {
    autoMode = true; lang = detectLang();
    try { localStorage.setItem('mcbeLang', 'auto'); } catch (e) { }
  } else {
    autoMode = false; lang = code;
    try { localStorage.setItem('mcbeLang', code); } catch (e) { }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang.replace('_', '-');
    localize(document.body);
    const sel = document.getElementById('langSel');
    if (sel) {
      const first = sel.options[0];
      if (first) first.textContent = (lang.startsWith('zh') ? '跟随系统' : 'System') + '（' + LANGS.find(l => l[0] === lang)[1] + '）';
      sel.value = autoMode ? 'auto' : lang;
    }
  }
}

export function isAuto() { return autoMode; }

export function getLang() { return lang; }
export function getSysLang() { return detectLang(); }

export function localize(root) {
  const m = map();
  if (!m || lang === 'zh_CN' || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const jobs = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    const s = n.nodeValue.trim();
    if (!s) continue;
    const key = m.has(s) ? s : REV.get(s);
    if (key && m.has(key)) jobs.push([n, n.nodeValue.replace(s, m.get(key))]);
  }
  for (const [n, v] of jobs) n.nodeValue = v;
}

export function installI18n() {
  if (typeof document === 'undefined') return;
  localize(document.body);
  const ob = new MutationObserver(() => localize(document.body));
  ob.observe(document.body, { childList: true, subtree: true, characterData: false });
  const sel = document.getElementById('langSel');
  if (sel) {
    sel.innerHTML = '<option value="auto">' + (lang.startsWith('zh') ? '跟随系统' : 'System') + '（' + LANGS.find(l => l[0] === lang)[1] + '）</option>' +
      LANGS.map(([c, n]) => `<option value="${c}">${n}</option>`).join('');
    sel.value = autoMode ? 'auto' : lang;
    sel.onchange = () => setLang(sel.value);
    if (typeof navigator !== 'undefined' && navigator.languages) {
      navigator.languages; // 系统语言变化时若为跟随模式则重新匹配
      window.addEventListener && window.addEventListener('languagechange', () => { if (autoMode) setLang('auto'); });
    }
  }
}
