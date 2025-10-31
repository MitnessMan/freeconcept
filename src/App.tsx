import React from "react";
import { createPortal } from "react-dom";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  PhoneCall, Globe2, ShieldCheck, Antenna, CheckCircle2,
  Mail, MapPin, Users, Building2, ChevronDown
} from "lucide-react";

/* =========================================================
   Basit i18n altyapısı (TR/DE/FR/EN)
========================================================= */
type LangCode = "tr" | "de" | "fr" | "en";

const I18N: Record<LangCode, Record<string, string>> = {
  tr: {
    // navbar
    "nav.home": "Ana Sayfa",
    "nav.about": "Biz Kimiz?",
    "nav.mission": "Hedefimiz",
    "nav.partners": "Partnerlerimiz",
    "nav.career": "Kariyer",
    "nav.brand": "FreeConcept Telekomünikasyon",
    "nav.lang": "Dil",

    // hero
    "hero.badge": "Kurumsal Telekom Çözümleri",
    "hero.title": "Güvenilir, Ölçeklenebilir ve Hızlı Bağlantı",
    "hero.lead": "İsviçre pazarında Salt ve Logic Group ekosistemindeki ürünlerin satışını profesyonel, şeffaf ve güvenli süreçlerle gerçekleştiriyoruz.",
    "cta.apply": "İş Başvurusu Yap",
    "badge.iso": "ISO 27001",
    "badge.kvkk": "KVKK Uyumlu",
    "badge.contract": "Şeffaf Sözleşme",
    "kpi.satisfaction": "Müşteri Memnuniyeti",
    "kpi.activations": "Başarılı Aktivasyon",
    "kpi.offices": "Ülkede Operasyon",
    "kpi.offices.count": "Ofis",

    // feature cards
    "feat.sales.eyebrow": "Satış & Kampanya",
    "feat.sales.title": "Operatör Ürün Satışı",
    "feat.sales.desc": "Salt, LG Net ve LG Mobile için uçtan uca satış ve aktivasyon.",
    "feat.ch.eyebrow": "İsviçre Pazarı",
    "feat.ch.title": "Çok Dilli Ekip",
    "feat.ch.desc": "Pazar için çok dilli satış ve müşteri iletişimi.",
    "feat.sec.eyebrow": "Kalite & Uyum",
    "feat.sec.title": "Güvenli Süreçler",
    "feat.sec.desc": "Sözleşme, kimlik doğrulama ve süreç güvenliği standartları.",
    "feat.cs.eyebrow": "Müşteri İletişimi",
    "feat.cs.title": "Satış Sonrası & Memnuniyet",
    "feat.cs.desc": "Takip, kalite kontrolleri ve memnuniyet yönetimi.",
    "feat.camp.eyebrow": "Kampanyalar",
    "feat.camp.title": "Lansman & Kampanya",
    "feat.camp.desc": "Yeni ürün lansmanları ve kampanya yönetimi.",
    "feat.ops.eyebrow": "Operasyon",
    "feat.ops.title": "Operasyon Koordinasyonu",
    "feat.ops.desc": "Operatör süreç takibi ve raporlama.",

    // sections
    "sec.about": "BİZ KİMİZ",
    "sec.mission": "HEDEFİMİZ",
    "sec.partners": "PARTNERİMİZ",   // tekil

    // about
    "about.p1": "Free Concept Telekomünikasyon (Antalya) ve Ce Concept (Fas), 2021 yılından beri İsviçre telekomünikasyon sektöründe kısa sürede büyük başarılara imza atmış iki güçlü şirkettir. Kuruluşumuzun ilk gününden beri İsviçre'nin önde gelen şirketlerinden Logic Group AG ile beraber çalışmaktayız.",
    "about.p2": "Bu stratejik ortaklık sayesinde Salt'ın yanı sıra LG Net ve LG Mobile gibi yeni markaların İsviçre pazarındaki lansmanını üstlenen ilk ekip olduk. Antalya'da küçük bir ekip ile başlayan bu yolculuğumuza şu anda iki ülkede üç ofis ile devam ediyoruz.",
    "about.p3": "Fas'taki ofislerimiz, yüksek standartları, çok dilli kadroları ve profesyonel yapısıyla İsviçre pazarı için en güvenilir ve kaliteli satış merkezlerinden biri haline geldik. Yeni ürün ve projelerin lansmanlarında aktif rol oynayarak sadece satış yapan değil, pazarın yönünü belirleyen güçlü bir ekip olduk. İsviçre'nin telekom pazarına hakim ve tecrübeli yöneticilerimizin bilgi birikimi sayesinde satış sürecinde müşterilerimize güven ortamı yaratıyor ve uzun vadede ilişkiler kuruyoruz.",

    // mission
    "mission.p1": "Hedefimiz; Logic Group ile stratejik ortaklığımızı derinleştirerek İsviçre’de yeni marka ve ürünlerin lansmanlarını gerçekleştirmek, çok dilli ve deneyimli ekibimizle satıştan aktivasyona, satış sonrası destekten kalite güvencesine kadar tüm süreci şeffaf ve ölçülebilir şekilde yönetmektir. Böylece İsviçre’nin en güvenilir satış & müşteri hizmetleri merkezi konumuna kalıcı olarak yerleşmeyi amaçlıyoruz.",
    "mission.p2": "Bu büyüme yolculuğumuzda ekibimizi de güçlendiriyoruz. Çok dilli, müşteri odaklı ve öğrenmeye açık çalışma kültürümüze uyum sağlayacak takım arkadaşları arıyoruz; satış, aktivasyon, müşteri iletişimi ve kalite–uyum gibi farklı ekiplerde yer almak isteyen adayların başvurularını bekliyoruz.",

    // contact
    "contact.name": "Ad Soyad",
    "contact.name.ph": "Adınız Soyadınız",
    "contact.email": "E-posta",
    "contact.email.ph": "ornek@freeconcept.com",
    "contact.phone": "Telefon",
    "contact.phone.ph": "05xx xxx xx xx",
    "contact.msg": "Mesaj",
    "contact.btn": "Gönder",
    "contact.addr": "Maslak, İstanbul • Türkiye",

    // cookie/footer
    "cookie.text": "Bu site deneyiminizi iyileştirmek için çerezler kullanır. Devam ederek çerezleri kabul etmiş olursunuz.",
    "footer.links": "KVKK • Aydınlatma Metni • Çerez Politikası",

    // career form
    "career.title": "Kariyer Başvuru Formu",
    "career.lead": "Temel bilgilerinizi paylaşın; uygun pozisyon olduğunda sizinle iletişime geçelim.",
    "career.email.ph": "E-posta",
    "career.phone.ph": "Telefon (05xx… veya +41…)",
    "career.country": "Ülke Seçiniz",
    "career.city": "Şehir Seçiniz",
    "career.chooseCountryFirst": "Önce ülke seçin",
    "career.langs": "Bildiğiniz diller",
    "career.about.ph": "Kısaca kendinizi anlatın",
    "career.cv.acceptNote": "Not: “E-posta ile Gönder” butonu Gmail’de yeni taslak açar. CV dosyasını taslakta elle ekleyip gönderebilirsiniz. WhatsApp linki sadece metni doldurur; medya otomatik eklenemez.",
    "career.kvkk": "KVKK ve Aydınlatma Metni’ni okudum, onaylıyorum.",
    "career.btn.mail": "E-posta ile Gönder",
    "career.btn.wa": "WhatsApp’tan Gönder",
    "career.cv.err.ext": "Sadece PDF, DOC veya DOCX yükleyebilirsiniz.",
    "career.cv.err.size": "Dosya boyutu 10MB'ı aşamaz.",
    "career.err.kvkk": "Lütfen KVKK onayını işaretleyin.",

    // message (email/wa)
    "msg.subject": "Kariyer Başvurusu",
    "msg.header": "Kariyer Başvurusu",
    "msg.email": "E-posta",
    "msg.phone": "Telefon",
    "msg.location": "Lokasyon",
    "msg.langs": "Bildiği diller",
    "msg.summary": "Kısa özet",
    "msg.cv": "CV",
    "msg.cv.note": "(ek olarak iletilecek)",
    "msg.sent": "(Gönderim: web formu)"
  },

  /* --------- DE --------- */
  de: {
    "nav.home": "Startseite",
    "nav.about": "Wer sind wir?",
    "nav.mission": "Unser Ziel",
    "nav.partners": "Partner",
    "nav.career": "Karriere",
    "nav.brand": "FreeConcept Telekommunikation",
    "nav.lang": "Sprache",

    "hero.badge": "Unternehmens-Telekom-Lösungen",
    "hero.title": "Zuverlässige, skalierbare und schnelle Verbindung",
    "hero.lead": "Wir verkaufen Produkte im Salt- & Logic-Group-Ökosystem für den Schweizer Markt – professionell, transparent und sicher.",
    "cta.apply": "Jetzt bewerben",
    "badge.iso": "ISO 27001",
    "badge.kvkk": "DSGVO-konform",
    "badge.contract": "Transparente Verträge",
    "kpi.satisfaction": "Kundenzufriedenheit",
    "kpi.activations": "Erfolgreiche Aktivierungen",
    "kpi.offices": "Länder im Einsatz",
    "kpi.offices.count": "Büros",

    "feat.sales.eyebrow": "Verkauf & Kampagne",
    "feat.sales.title": "Verkauf von Carrier-Produkten",
    "feat.sales.desc": "End-to-End-Vertrieb und Aktivierung für Salt, LG Net und LG Mobile.",
    "feat.ch.eyebrow": "Schweizer Markt",
    "feat.ch.title": "Mehrsprachiges Team",
    "feat.ch.desc": "Mehrsprachige Kundenkommunikation und Vertrieb.",
    "feat.sec.eyebrow": "Qualität & Compliance",
    "feat.sec.title": "Sichere Prozesse",
    "feat.sec.desc": "Vertrags-, Ident- und Prozesssicherheitsstandards.",
    "feat.cs.eyebrow": "Kundenbetreuung",
    "feat.cs.title": "After-Sales & Zufriedenheit",
    "feat.cs.desc": "Nachverfolgung, Qualitätskontrollen und Zufriedenheitsmanagement.",
    "feat.camp.eyebrow": "Kampagnen",
    "feat.camp.title": "Launches & Kampagnen",
    "feat.camp.desc": "Produktlaunches und Kampagnenmanagement.",
    "feat.ops.eyebrow": "Operation",
    "feat.ops.title": "Operationskoordination",
    "feat.ops.desc": "Prozessverfolgung und Reporting beim Betreiber.",

    "sec.about": "WER SIND WIR",
    "sec.mission": "UNSER ZIEL",
    "sec.partners": "UNSERE PARTNER",

    "about.p1": "Free Concept Telekomünikasyon (Antalya) und Ce Concept (Marokko) sind seit 2021 erfolgreich in der Schweizer Telekombranche. Seit dem ersten Tag arbeiten wir mit der Logic Group AG zusammen.",
    "about.p2": "Dank dieser Partnerschaft führten wir die Einführung von Salt sowie neuer Marken wie LG Net und LG Mobile in der Schweiz an. Was in Antalya klein begann, setzen wir heute mit drei Büros in zwei Ländern fort.",
    "about.p3": "Unsere marokkanischen Büros sind mit hohen Standards und mehrsprachigen Teams ein verlässlicher Vertriebsstandort für die Schweiz. Erfahrene Führung schafft Vertrauen und langfristige Beziehungen.",

    "mission.p1": "Wir vertiefen die Partnerschaft mit Logic Group, launchen neue Marken und steuern die gesamte Journey – Verkauf, Aktivierung, After-Sales und Qualität – transparent und messbar.",
    "mission.p2": "Dafür verstärken wir unser Team. Gesucht werden mehrsprachige, kundenorientierte Kolleg*innen für Verkauf, Aktivierung, Kundenkommunikation sowie Qualität & Compliance.",

    "contact.name": "Name Nachname",
    "contact.name.ph": "Ihr Name",
    "contact.email": "E-Mail",
    "contact.email.ph": "beispiel@freeconcept.com",
    "contact.phone": "Telefon",
    "contact.phone.ph": "01x xxx xx xx",
    "contact.msg": "Nachricht",
    "contact.btn": "Senden",
    "contact.addr": "Maslak, Istanbul • Türkiye",

    "cookie.text": "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Durch die Nutzung stimmen Sie zu.",
    "footer.links": "KVKK • Datenschutzhinweise • Cookie-Richtlinie",

    "career.title": "Bewerbungsformular",
    "career.lead": "Teilen Sie Ihre Basisdaten – wir melden uns bei passenden Positionen.",
    "career.email.ph": "E-Mail",
    "career.phone.ph": "Telefon (05xx… oder +41…)",
    "career.country": "Land wählen",
    "career.city": "Stadt wählen",
    "career.chooseCountryFirst": "Zuerst Land wählen",
    "career.langs": "Sprachkenntnisse",
    "career.about.ph": "Kurze Selbstdarstellung",
    "career.cv.acceptNote": "Hinweis: „Per E-Mail senden“ öffnet einen Gmail-Entwurf. Fügen Sie die Datei dort manuell an. WhatsApp füllt nur den Text aus.",
    "career.kvkk": "Ich habe die Hinweise gelesen und stimme zu.",
    "career.btn.mail": "Per E-Mail senden",
    "career.btn.wa": "Per WhatsApp senden",
    "career.cv.err.ext": "Nur PDF, DOC oder DOCX sind erlaubt.",
    "career.cv.err.size": "Datei darf 10MB nicht überschreiten.",
    "career.err.kvkk": "Bitte stimmen Sie den Hinweisen zu.",

    "msg.subject": "Bewerbung",
    "msg.header": "Bewerbung",
    "msg.email": "E-Mail",
    "msg.phone": "Telefon",
    "msg.location": "Ort",
    "msg.langs": "Sprachen",
    "msg.summary": "Kurzprofil",
    "msg.cv": "Lebenslauf",
    "msg.cv.note": "(wird separat angehängt)",
    "msg.sent": "(Versand: Web-Formular)"
  },

  /* --------- FR --------- */
  fr: {
    "nav.home": "Accueil",
    "nav.about": "Qui sommes-nous ?",
    "nav.mission": "Notre objectif",
    "nav.partners": "Partenaires",
    "nav.career": "Carrière",
    "nav.brand": "FreeConcept Télécommunications",
    "nav.lang": "Langue",

    "hero.badge": "Solutions télécoms d’entreprise",
    "hero.title": "Connexion fiable, évolutive et rapide",
    "hero.lead": "Nous commercialisons les produits de l’écosystème Salt & Logic Group pour le marché suisse avec des processus professionnels, transparents et sûrs.",
    "cta.apply": "Postuler",
    "badge.iso": "ISO 27001",
    "badge.kvkk": "Conforme RGPD",
    "badge.contract": "Contrats transparents",
    "kpi.satisfaction": "Satisfaction client",
    "kpi.activations": "Activations réussies",
    "kpi.offices": "Pays d’activité",
    "kpi.offices.count": "Bureaux",

    "feat.sales.eyebrow": "Vente & Campagne",
    "feat.sales.title": "Vente de produits opérateur",
    "feat.sales.desc": "Vente et activation bout-en-bout pour Salt, LG Net et LG Mobile.",
    "feat.ch.eyebrow": "Marché suisse",
    "feat.ch.title": "Équipe multilingue",
    "feat.ch.desc": "Communication client et vente multilingues.",
    "feat.sec.eyebrow": "Qualité & Conformité",
    "feat.sec.title": "Processus sécurisés",
    "feat.sec.desc": "Normes de contrat, d’identification et de sécurité des processus.",
    "feat.cs.eyebrow": "Service client",
    "feat.cs.title": "Après-vente & Satisfaction",
    "feat.cs.desc": "Suivi, contrôles qualité et gestion de la satisfaction.",
    "feat.camp.eyebrow": "Campagnes",
    "feat.camp.title": "Lancements & Campagnes",
    "feat.camp.desc": "Lancements et gestion de campagnes.",
    "feat.ops.eyebrow": "Opérations",
    "feat.ops.title": "Coordination opérationnelle",
    "feat.ops.desc": "Suivi des processus opérateur et reporting.",

    "sec.about": "QUI SOMMES-NOUS",
    "sec.mission": "NOTRE OBJECTIF",
    "sec.partners": "NOS PARTENAIRES",

    "about.p1": "Free Concept Telekomünikasyon (Antalya) et Ce Concept (Maroc) réussissent depuis 2021 sur le marché télécom suisse. Depuis le premier jour, nous collaborons avec Logic Group AG.",
    "about.p2": "Grâce à ce partenariat, nous avons lancé Salt ainsi que de nouvelles marques comme LG Net et LG Mobile en Suisse. L’aventure commencée à Antalya continue avec trois bureaux dans deux pays.",
    "about.p3": "Nos bureaux au Maroc, avec leurs standards élevés et équipes multilingues, sont devenus l’un des centres de vente les plus fiables pour la Suisse. Des dirigeants expérimentés créent la confiance et des relations durables.",

    "mission.p1": "Nous voulons approfondir notre partenariat avec Logic Group, lancer de nouvelles marques et piloter l’ensemble du parcours — vente, activation, après-vente et qualité — de manière transparente et mesurable.",
    "mission.p2": "Dans cette dynamique, nous renforçons notre équipe. Nous cherchons des collègues multilingues, orientés client et curieux pour la vente, l’activation, la relation client et la qualité-conformité.",

    "contact.name": "Nom Prénom",
    "contact.name.ph": "Votre nom",
    "contact.email": "E-mail",
    "contact.email.ph": "exemple@freeconcept.com",
    "contact.phone": "Téléphone",
    "contact.phone.ph": "06xx xx xx xx",
    "contact.msg": "Message",
    "contact.btn": "Envoyer",
    "contact.addr": "Maslak, Istanbul • Turquie",

    "cookie.text": "Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez les cookies.",
    "footer.links": "KVKK • Information • Politique des cookies",

    "career.title": "Formulaire de candidature",
    "career.lead": "Partagez vos informations de base ; nous vous contacterons pour un poste adapté.",
    "career.email.ph": "E-mail",
    "career.phone.ph": "Téléphone (05xx… ou +41…)",
    "career.country": "Choisir le pays",
    "career.city": "Choisir la ville",
    "career.chooseCountryFirst": "Choisissez d’abord un pays",
    "career.langs": "Langues maîtrisées",
    "career.about.ph": "Présentez-vous brièvement",
    "career.cv.acceptNote": "« Envoyer par e-mail » ouvre un brouillon Gmail. Ajoutez le CV manuellement. Le lien WhatsApp ne remplit que le texte.",
    "career.kvkk": "J’ai lu et j’accepte.",
    "career.btn.mail": "Envoyer par e-mail",
    "career.btn.wa": "Envoyer via WhatsApp",
    "career.cv.err.ext": "Seuls les fichiers PDF, DOC ou DOCX sont acceptés.",
    "career.cv.err.size": "La taille du fichier ne doit pas dépasser 10 Mo.",
    "career.err.kvkk": "Merci d’accepter les conditions.",

    "msg.subject": "Candidature",
    "msg.header": "Candidature",
    "msg.email": "E-mail",
    "msg.phone": "Téléphone",
    "msg.location": "Localisation",
    "msg.langs": "Langues",
    "msg.summary": "Résumé",
    "msg.cv": "CV",
    "msg.cv.note": "(sera joint séparément)",
    "msg.sent": "(Envoi : formulaire web)"
  },

  /* --------- EN --------- */
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.mission": "Our Mission",
    "nav.partners": "Partners",
    "nav.career": "Careers",
    "nav.brand": "FreeConcept Telecommunications",
    "nav.lang": "Language",

    "hero.badge": "Enterprise Telecom Solutions",
    "hero.title": "Reliable, Scalable and Fast Connectivity",
    "hero.lead": "We sell products in the Salt & Logic Group ecosystem for the Swiss market with professional, transparent and secure processes.",
    "cta.apply": "Apply Now",
    "badge.iso": "ISO 27001",
    "badge.kvkk": "GDPR-Compliant",
    "badge.contract": "Transparent Contracts",
    "kpi.satisfaction": "Customer Satisfaction",
    "kpi.activations": "Successful Activations",
    "kpi.offices": "Countries of Operation",
    "kpi.offices.count": "Offices",

    "feat.sales.eyebrow": "Sales & Campaign",
    "feat.sales.title": "Operator Product Sales",
    "feat.sales.desc": "End-to-end sales and activation for Salt, LG Net and LG Mobile.",
    "feat.ch.eyebrow": "Swiss Market",
    "feat.ch.title": "Multilingual Team",
    "feat.ch.desc": "Multilingual sales and customer communication.",
    "feat.sec.eyebrow": "Quality & Compliance",
    "feat.sec.title": "Secure Processes",
    "feat.sec.desc": "Contract, ID verification and process security standards.",
    "feat.cs.eyebrow": "Customer Care",
    "feat.cs.title": "After-Sales & Satisfaction",
    "feat.cs.desc": "Follow-up, quality checks and satisfaction management.",
    "feat.camp.eyebrow": "Campaigns",
    "feat.camp.title": "Launches & Campaigns",
    "feat.camp.desc": "New product launches and campaign management.",
    "feat.ops.eyebrow": "Operation",
    "feat.ops.title": "Operations Coordination",
    "feat.ops.desc": "Operator process tracking and reporting.",

    "sec.about": "ABOUT US",
    "sec.mission": "OUR MISSION",
    "sec.partners": "OUR PARTNERS",

    "about.p1": "Free Concept Telekomünikasyon (Antalya) and Ce Concept (Morocco) have achieved strong results in the Swiss telecom market since 2021. Since day one, we have worked with Logic Group AG.",
    "about.p2": "Thanks to this partnership we led the launches of Salt as well as new brands like LG Net and LG Mobile in Switzerland. What began with a small team in Antalya continues with three offices in two countries.",
    "about.p3": "Our Moroccan offices, with high standards and multilingual teams, have become one of the most trusted sales hubs for the Swiss market. With experienced leadership, we build trust and long-term relationships.",

    "mission.p1": "We aim to deepen our strategic partnership with Logic Group, launch new brands, and manage the entire journey—sales, activation, after-sales and quality—transparently and measurably.",
    "mission.p2": "On this growth path we are strengthening our team. We welcome multilingual, customer-oriented teammates across sales, activation, customer communication and quality-compliance.",

    "contact.name": "Full Name",
    "contact.name.ph": "Your name",
    "contact.email": "Email",
    "contact.email.ph": "example@freeconcept.com",
    "contact.phone": "Phone",
    "contact.phone.ph": "+41… or 05xx…",
    "contact.msg": "Message",
    "contact.btn": "Send",
    "contact.addr": "Maslak, Istanbul • Türkiye",

    "cookie.text": "This site uses cookies to improve your experience. By continuing, you accept cookies.",
    "footer.links": "KVKK • Disclosure • Cookie Policy",

    "career.title": "Career Application Form",
    "career.lead": "Share your basic info; we’ll reach out when there’s a fit.",
    "career.email.ph": "Email",
    "career.phone.ph": "Phone (05xx… or +41…)",
    "career.country": "Choose Country",
    "career.city": "Choose City",
    "career.chooseCountryFirst": "Choose a country first",
    "career.langs": "Languages you know",
    "career.about.ph": "Briefly introduce yourself",
    "career.cv.acceptNote": "Note: “Send by Email” opens a new Gmail draft. Attach your CV manually there. WhatsApp link fills only the text.",
    "career.kvkk": "I’ve read and accept.",
    "career.btn.mail": "Send by Email",
    "career.btn.wa": "Send via WhatsApp",
    "career.cv.err.ext": "Only PDF, DOC or DOCX are allowed.",
    "career.cv.err.size": "File size must not exceed 10MB.",
    "career.err.kvkk": "Please accept the notice.",

    "msg.subject": "Job Application",
    "msg.header": "Job Application",
    "msg.email": "Email",
    "msg.phone": "Phone",
    "msg.location": "Location",
    "msg.langs": "Languages",
    "msg.summary": "Summary",
    "msg.cv": "CV",
    "msg.cv.note": "(to be attached separately)",
    "msg.sent": "(Sent via web form)"
  }
};

const I18nCtx = React.createContext<{
  lang: LangCode; setLang: (l: LangCode) => void; t: (k: string) => string;
}>({ lang: "tr", setLang: () => { }, t: (k) => k });

function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<LangCode>(() => {
    try { return (localStorage.getItem("lang") as LangCode) || "tr"; } catch { return "tr"; }
  });
  const setLang = (l: LangCode) => { setLangState(l); try { localStorage.setItem("lang", l); } catch { } };
  const t = React.useCallback((k: string) => I18N[lang][k] ?? I18N.tr[k] ?? k, [lang]);
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}
const useT = () => React.useContext(I18nCtx);

/* =========================================================
   Yardımcılar
========================================================= */
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
};

const Section = ({
  id,
  eyebrow,
  children,
  dark = false,
  padTop,
  padBottom,
}: {
  id?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  dark?: boolean;
  padTop?: number;
  padBottom?: number;
}) => (
  <section
    id={id}
    className="section reveal"
    style={{
      color: dark ? "#e5e7eb" : "#111827",
      background: dark ? "#0f172a" : "#fff",
      paddingTop: padTop,
      paddingBottom: padBottom,
      scrollMarginTop: 90
    }}
  >
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      {eyebrow && (
        <div
          className="eyebrow"
          style={{
            textAlign: "center",
            marginBottom: 22,
            color: "#ffffff",
            fontWeight: 800,
            letterSpacing: ".4px",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      )}
      {children}
    </div>
  </section>
);

/* =========================================================
   Kartlar — Premium
========================================================= */
const FeatureCard = ({ children }: { children: React.ReactNode }) => (
  <div className="featureCard reveal">{children}</div>
);

/* =========================================================
   Partner Logo – daire + fit + @2x
========================================================= */
type FitMode = "cover" | "contain";

function PartnerLogo({
  src,
  src2x,
  alt,
  size = 120,
  circular = false,
  fit = "cover",
  padding = 0,
  bg = "rgba(255,255,255,0.06)",
  borderColor = "#334155",
}: {
  src?: string;
  src2x?: string;
  alt: string;
  size?: number;
  circular?: boolean;
  fit?: FitMode;
  padding?: number;
  bg?: string;
  borderColor?: string;
}) {
  if (!src) return null;

  if (circular) {
    return (
      <div
        className="reveal"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          background: bg,
          border: `1px solid ${borderColor}`,
          boxShadow: "0 6px 18px rgba(0,0,0,.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding,
        }}
      >
        <img
          src={src}
          srcSet={src2x ? `${src} 1x, ${src2x} 2x` : undefined}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <img
      className="reveal"
      src={src}
      srcSet={src2x ? `${src} 1x, ${src2x} 2x` : undefined}
      alt={alt}
      style={{
        maxHeight: 76,
        maxWidth: 320,
        width: "100%",
        objectFit: "contain",
        display: "block",
      }}
      loading="lazy"
      decoding="async"
    />
  );
}

/* =========================================================
   Global Stil (+ mobile iyileştirme)
========================================================= */
const GlobalReset = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { width: 100%; }
    html { scroll-behavior: smooth; overflow-y: scroll; overflow-x: hidden; scroll-snap-type: y proximity; scroll-padding-top: 72px; }
    #root { max-width: none !important; padding: 0 !important; margin: 0 !important; min-height: 100%; }
    img, svg { max-width: 100%; height: auto; display: inline-block; }
    body { background: #0f172a; color:#e5e7eb; margin:0; overflow: visible; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    @supports (-webkit-touch-callout: none) { * { -webkit-tap-highlight-color: rgba(0,0,0,0); } }

    .section { padding: clamp(80px, 8vw, 160px) 16px; scroll-snap-align: start; }

    .eyebrow { font-size: clamp(18px, 3.2vw, 24px); line-height: 1.2; }

    .grid-services { display: grid; gap: 22px; grid-template-columns: 1fr; }
    @media (min-width: 768px)  { .grid-services { grid-template-columns: repeat(2,minmax(0,1fr)); } }
    @media (min-width: 1024px) { .grid-services { grid-template-columns: repeat(3,minmax(0,1fr)); } }

    /* —— Premium Card —— */
    .featureCard{
      position:relative; border-radius:16px; padding:18px;
      background: linear-gradient(180deg, rgba(17,24,39,.9), rgba(15,23,42,.9)) border-box;
      border:1px solid rgba(148,163,184,.16);
      box-shadow: 0 10px 28px rgba(0,0,0,.24);
      overflow:hidden;
      transition: transform .18s ease, box-shadow .22s ease, border-color .22s ease, filter .22s ease;
      backdrop-filter: blur(6px); will-change: transform;
    }
    .featureCard::before{ content:""; position:absolute; inset:-1px; border-radius:16px;
      background: conic-gradient(from 180deg at 50% 50%, rgba(80,125,255,.45), rgba(25,211,174,.35), rgba(99,102,241,.55), rgba(80,125,255,.45));
      filter: blur(18px); opacity:.20; z-index:0; }
    .featureCard::after{ content:""; position:absolute; top:-60%; left:-30%; width:60%; height:220%;
      transform: rotate(18deg); background: linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
      opacity:0; pointer-events:none; transition: opacity .25s ease, transform .25s ease; }
    .featureCard:hover{ transform: translateY(-4px); box-shadow: 0 22px 46px rgba(0,0,0,.32); border-color: rgba(148,163,184,.28); }

    .fc-row { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; position:relative; z-index:1; }
    .chip { display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border-radius:999px; background: rgba(148,163,184,.12); border:1px solid rgba(148,163,184,.22); font-size:12px; color:#cbd5e1; }
    .fc-title { margin-top:8px; font-weight:800; font-size: clamp(16px, 2.3vw, 20px); color:#fff; }
    .fc-desc  { margin-top:6px; opacity:.9; font-size: 14px; }

    .partnerCard {
      position: relative;
      background: radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg,#1f2937 0%, #111827 100%);
      border: 1px solid #334155; border-radius: 16px; padding: clamp(16px, 3.5vw, 24px); text-align: center;
      transition: box-shadow .22s ease, transform .18s ease, border-color .18s ease; will-change: transform;
      box-shadow: 0 10px 28px rgba(0,0,0,.24);
    }
    .partnerCard:hover { transform: translateY(-3px); box-shadow: 0 22px 40px rgba(0,0,0,.32); border-color:#3b4758; }

    .navlink { color: #ffffff; text-decoration: none; font-weight: 700; letter-spacing: .3px; opacity: .92; transition: opacity .16s ease; padding: 8px 10px; border-radius: 8px; }
    .navlink:focus-visible { outline: 2px solid #475569; outline-offset: 2px; }

    .sr-only { position:absolute!important; width:1px!important; height:1px!important; overflow:hidden!important; clip:rect(0,0,0,0)!important; white-space:nowrap!important; }

    .copy { max-width: 62ch; line-height: 1.7; font-size: clamp(15.5px, 1.8vw, 17.5px); }
    .copy-wide { max-width: 1000px; line-height: 1.8; font-size: clamp(15.5px, 2.2vw, 19px); margin: 0 auto; text-align: center; }

    /* Biz Kimiz – mobil düzen */
    @media (max-width: 900px){
      #hakkimizda > div > .about-grid { grid-template-columns: 1fr !important; }
      #hakkimizda .about-media { display:none !important; }
      #hakkimizda .about-left { padding-right:0 !important; }
      #hakkimizda .copy{ max-width: none !important; text-align: left !important; }
    }

    @media (prefers-reduced-motion: no-preference) {
      .reveal { opacity: 0; transform: translateY(12px) scale(.98); }
      .reveal.in { opacity: 1; transform: translateY(0) scale(1); transition: opacity .6s ease, transform .6s ease; }
    }

    .badge { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; border:1px solid #334155; background:#151d2e; color:#cbd5e1; font-size:12px; margin-right:8px; }

    .kpi { border-radius:16px; padding: clamp(20px, 3.8vw, 36px); background: radial-gradient(120% 120% at 20% 0%, rgba(99,102,241,.12), transparent 50%), linear-gradient(180deg, #0f172a 0%, #0b1220 100%); border:1px solid #233146; display:flex; align-items:center; justify-content:center; flex-direction:column; min-height: clamp(140px, 28vw, 200px); }

    /* — KPI masaüstü font büyütme — */
    @media (min-width: 900px){
      .kpi strong { font-size: 40px; line-height: 1.1; }
      .kpi span   { font-size: 18px; }
    }

    .fc-plain{ padding:0 !important; border:0 !important; background:transparent !important; }

    /* Select görünürlüğü */
    select { background:#ffffff !important; color:#111827 !important; }
    select option { color:#111827; }

    /* ======= Responsive Navbar ======= */
    .nav-wrap { position: relative; }
    .nav-links { display:flex; align-items:center; gap: clamp(12px, 2.2vw, 24px); margin-left:auto; }
    .hamburger { display:none; border:0; background:transparent; color:#fff; padding: 10px; border-radius:10px; }
    .hamburger:focus-visible { outline:2px solid #334155; }

    /* Language dropdown */
    .lang { position: relative; }
    .lang-plain { display:inline-flex; align-items:center; gap:8px; font-weight:700; color:#fff; background:transparent; border:1px solid #334155; padding:8px 10px; border-radius:10px; cursor:pointer; }
    .lang-list { position:absolute; right:0; top: calc(100% + 8px); background: rgba(15,23,42,.98); border:1px solid #334155; border-radius:12px; padding:6px; display:flex; flex-direction:column; gap:4px; min-width: 220px; z-index: 50; }

    /* ======= Mobile tweaks ======= */
    @media (max-width: 900px){
      html { scroll-snap-type: none; }
      .nav-links { display:none; }
      .hamburger { display:inline-flex; }

      .mobileMenu {
        position: fixed; inset: 0; z-index: 9999; background: rgba(15,23,42,.98);
        backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        border-bottom:1px solid #1f2937; box-shadow: 0 12px 28px rgba(0,0,0,.35);
        padding: calc(72px + env(safe-area-inset-top)) 16px calc(20px + env(safe-area-inset-bottom));
        display:flex; flex-direction:column; gap:14px; height: 100dvh; overflow:auto;
      }
      .mobileMenu a, .mobileMenu .lang-plain { padding:12px 10px; border-radius:10px; border:1px solid #233146; }
      .brand-title { display:none; }

      .career-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* =========================================================
   Dil Seçici
========================================================= */
const languages = [
  { code: "tr", label: "Türkçe (TR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "fr", label: "Français (FR)" },
  { code: "en", label: "English (EN)" },
];

function LanguageDropdown() {
  const [open, setOpen] = React.useState(false);
  const { lang, setLang, t } = useT();

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".lang")) setOpen(false);
    };
    document.addEventListener("mousedown", close as any);
    return () => document.removeEventListener("mousedown", close as any);
  }, []);

  return (
    <div className="lang">
      <button
        className="lang-plain"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("nav.lang")}
      >
        {t("nav.lang")} <ChevronDown size={16} />
      </button>
      {open && (
        <div className="lang-list" role="menu">
          {languages.map(l => (
            <button
              key={l.code}
              className="lang-item"
              onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
              role="menuitem"
            >
              {l.label}{lang === l.code ? " ✓" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Navbar
========================================================= */
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useT();

  const go = (e: React.MouseEvent, href: string, sectionId?: string) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#/") {
      window.location.hash = "/";
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      if (sectionId) requestAnimationFrame(() => scrollToId(sectionId));
      return;
    }
    window.location.hash = href.replace("#", "");
    if (sectionId) setTimeout(() => scrollToId(sectionId), 80);
  };

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const inHeader = !!target.closest("header");
      const inMobileMenu = !!target.closest("#mobileMenu");
      if (!inHeader && !inMobileMenu) setOpen(false);
    };
    document.addEventListener("click", close as any);
    return () => document.removeEventListener("click", close as any);
  }, []);

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 30,
    background: "rgba(15,23,42,.88)",
    borderBottom: "1px solid #1f2937",
    backdropFilter: open ? "none" : "blur(6px)",
    WebkitBackdropFilter: open ? "none" : "blur(6px)",
  };

  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const onHamburgerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(o => !o);
    }
  };

  return (
    <>
      <header style={headerStyle}>
        <nav
          className="nav-wrap"
          style={{
            maxWidth: 1472,
            margin: "0 auto",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 max(16px, env(safe-area-inset-left))",
            gap: 16,
            position: "relative"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: "50%", overflow: "hidden",
                background: "#ffffff", border: "1px solid #334155",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 2
              }}
              aria-label="Logo"
            >
              <img
                src="/images/logo.jpg"
                srcSet="/images/logo.jpg 1x, /images/logo@2x.jpg 2x"
                alt="FreeConcept Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
            <div className="brand-title" style={{ fontSize: 20, fontWeight: 800, letterSpacing: ".4px", whiteSpace: "nowrap" }}>
              {t("nav.brand")}
            </div>
          </div>

          <div className="nav-links" aria-label="Ana navigasyon">
            <a className="navlink" href="#/" onClick={(e) => go(e, "#/")}>{t("nav.home")}</a>
            <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "hakkimizda")}>{t("nav.about")}</a>
            <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "hedefimiz")}>{t("nav.mission")}</a>
            <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "partnerler")}>{t("nav.partners")}</a>
            <a className="navlink" href="#/kariyer" onClick={(e) => go(e, "#/kariyer")}>{t("nav.career")}</a>
            <LanguageDropdown />
          </div>

          <button
            className="hamburger"
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen(o => !o)}
            onKeyDown={onHamburgerKey}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </nav>
      </header>

      {open && createPortal(
        <div id="mobileMenu" className="mobileMenu" role="dialog" aria-modal="true">
          <a className="navlink" href="#/" onClick={(e) => go(e, "#/")}>{t("nav.home")}</a>
          <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "hakkimizda")}>{t("nav.about")}</a>
          <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "hedefimiz")}>{t("nav.mission")}</a>
          <a className="navlink" href="#/" onClick={(e) => go(e, "#/", "partnerler")}>{t("nav.partners")}</a>
          <a className="navlink" href="#/kariyer" onClick={(e) => go(e, "#/kariyer")}>{t("nav.career")}</a>
          <LanguageDropdown />
        </div>,
        document.body
      )}
    </>
  );
};

/* =========================================================
   İletişim (statik kartta kullanılıyor)
========================================================= */
const HR_EMAIL = "info@freeconcept.net";
const CONTACT_EMAIL = HR_EMAIL;
const MAPS_URL = "https://www.google.com/maps/place/Can+Polat+Villalar%C4%B1/@36.8671374,30.8368777,21z/data=!4m6!3m5!1s0x14c383003ea88805:0xe5393271a87edca7!8m2!3d36.8671674!4d30.8369061!16s%2Fg%2F11wfldn6db?entry=ttu";

/* =========================================================
   Cookie
========================================================= */
const CookieSection = () => {
  const { t } = useT();
  return (
    <section
      style={{
        background: "#0f172a",
        color: "#9aa7b8",
        padding: "16px 0",
        borderTop: "1px solid #1f2937",
      }}
    >
      <div style={{ maxWidth: 1472, margin: "0 auto", padding: "0 16px" }}>
        <div
          className="card-neo"
          style={{
            background: "#0f172a",
            border: "1px solid #233146",
            borderRadius: 16,
            padding: 14,
            fontSize: 13,
          }}
        >
          {t("cookie.text")}
          <span style={{ marginLeft: 8, textDecoration: "underline", cursor: "pointer" }}>KVKK</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Aydınlatma Metni</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Çerez Politikası</span>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   Layout
========================================================= */
function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const { t } = useT();

  React.useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el, idx) => {
      el.style.transitionDelay = `${Math.min(idx * 40, 240)}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [loc.pathname]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [loc.pathname]);

  React.useEffect(() => {
    document.title = t("nav.brand");
    const setFavicon = (href: string) => {
      let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = href;
    };
    setFavicon("/images/logo-64.png");
    setTimeout(() => {
      const testImg = new Image();
      testImg.onerror = () => setFavicon("/images/logo.jpg");
      testImg.src = "/images/logo-64.png";
    }, 0);

    let vp = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      document.head.appendChild(vp);
    }
    vp.content = "width=device-width,initial-scale=1,viewport-fit=cover";
  }, [t]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>
      <GlobalReset />
      <Navbar />
      {children}
      <CookieSection />
      <footer
        className="reveal"
        style={{
          background: "#0f172a",
          borderTop: "1px solid #1f2937",
          padding: "24px 0 calc(24px + env(safe-area-inset-bottom))",
          color: "#9aa7b8",
        }}
      >
        <div
          style={{
            maxWidth: 1472,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Antenna size={16} color="#a5b4fc" />
            © {new Date().getFullYear()} {t("nav.brand")}.
          </div>
          <div>{t("footer.links")}</div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   Ana Sayfa İçeriği
========================================================= */
const Home = () => {
  const { t } = useT();
  const heroFeatures = [
    { icon: Users, eyebrow: t("feat.sales.eyebrow"), title: t("feat.sales.title"), desc: t("feat.sales.desc") },
    { icon: Globe2, eyebrow: t("feat.ch.eyebrow"), title: t("feat.ch.title"), desc: t("feat.ch.desc") },
    { icon: ShieldCheck, eyebrow: t("feat.sec.eyebrow"), title: t("feat.sec.title"), desc: t("feat.sec.desc") },
    { icon: PhoneCall, eyebrow: t("feat.cs.eyebrow"), title: t("feat.cs.title"), desc: t("feat.cs.desc") },
    { icon: Antenna, eyebrow: t("feat.camp.eyebrow"), title: t("feat.camp.title"), desc: t("feat.camp.desc") },
    { icon: Building2, eyebrow: t("feat.ops.eyebrow"), title: t("feat.ops.title"), desc: t("feat.ops.desc") },
  ];

  return (
    <>
      <section
        id="hero"
        className="reveal"
        style={{
          background: "#0f172a",
          color: "#e5e7eb",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ maxWidth: 1472, margin: "0 auto", padding: "24px 16px 40px", width: "100%" }}>
          <div style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", alignItems: "start" }}>
            <div>
              <div className="featureCard reveal" style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "6px 12px" }}>
                <span className="chip"><ShieldCheck size={14} /> {t("hero.badge")}</span>
              </div>
              <h1 style={{ marginTop: 12, fontSize: "clamp(28px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.15, color: "#fff" }}>
                {t("hero.title")}
              </h1>
              <p className="reveal" style={{ marginTop: 12, fontSize: "clamp(15px, 2.6vw, 20px)", opacity: 0.9 }}>
                {t("hero.lead")}
              </p>

              <div className="reveal" style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="#/kariyer"
                  className="featureCard"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                  aria-label={t("nav.career")}
                >
                  {t("cta.apply")}
                </a>
              </div>

              <div className="reveal" style={{ marginTop: 14 }}>
                <span className="badge">{t("badge.iso")}</span>
                <span className="badge">{t("badge.kvkk")}</span>
                <span className="badge">{t("badge.contract")}</span>
              </div>
            </div>

            <div className="reveal">
              <div className="featureCard" style={{ background: "#111827", borderRadius: 24, padding: 16 }}>
                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
                  {heroFeatures.map((f, i) => (
                    <FeatureCard key={i}>
                      <div className="fc-row">
                        <span className="chip"><f.icon size={14} /> {f.eyebrow}</span>
                        <CheckCircle2 color="#22c55e" />
                      </div>
                      <div className="fc-title">{f.title}</div>
                      {f.desc && <div className="fc-desc">{f.desc}</div>}
                    </FeatureCard>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 28 }}>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
              <div className="kpi featureCard"><strong>%96</strong><span>{t("kpi.satisfaction")}</span></div>
              <div className="kpi featureCard"><strong>50.000+</strong><span>{t("kpi.activations")}</span></div>
              <div className="kpi featureCard"><strong>3 {t("kpi.offices.count")}</strong><span>2 {t("kpi.offices")}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* BİZ KİMİZ */}
      <Section id="hakkimizda" eyebrow={t("sec.about")} dark padTop={200}>
        <h2 className="sr-only">{t("sec.about")}</h2>
        <div className="about-grid" style={{ display: "grid", gap: 28, gridTemplateColumns: "1.1fr .9fr", alignItems: "start" }}>
          <div className="reveal about-left" style={{ paddingRight: 8 }}>
            <div className="copy" style={{ opacity: .96, textAlign: "left", color: "#fff" }}>
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p style={{ marginBottom: 0 }}>{t("about.p3")}</p>
            </div>
          </div>

          <div className="reveal about-media">
            <div className="featureCard fc-plain" style={{ borderRadius: 16, overflow: "hidden" }}>
              <img src="/images/kadinlar.jpg" alt="Team" style={{ width: "100%", height: "clamp(180px, 40vw, 220px)", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
            </div>

            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div className="featureCard fc-plain" style={{ borderRadius: 16, overflow: "hidden" }}>
                <img src="/images/kadin.jpg" alt="Agent" style={{ width: "100%", height: "clamp(180px, 45vw, 250px)", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
              <div className="featureCard fc-plain" style={{ borderRadius: 16, overflow: "hidden" }}>
                <img src="/images/ofis.jpg" alt="Office" style={{ width: "100%", height: "clamp(180px, 45vw, 250px)", objectFit: "cover", display: "block" }} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PARTNER — @2x dosya 1× gibi kullanılıyor, masaüstünde büyük kart */}
      <Section id="partnerler" eyebrow={t("sec.partners")} dark padTop={260}>
        <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
          <a
            className="partnerCard reveal"
            href="https://www.logicgroup-ks.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Logic Group AG web sitesine git"
            title="Logic Group AG"
            style={{ maxWidth: 760, width: "100%" }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
              <PartnerLogo
                /* Masaüstünde netlik için 2× dosyayı 1× gibi kullanıyoruz */
                src="/partners/logic@2x.png"
                /* 3× dosyan yoksa src2x VERME—retina yine net olur */
                alt="Logic Group AG logo"
                circular
                size={160}
                fit="contain"
                bg="rgba(255,255,255,0.06)"
              />
            </div>
            <div style={{ opacity: .95, fontSize: 16, fontWeight: 700 }}>
              Operatör / Servis Sağlayıcı
            </div>
          </a>
        </div>
      </Section>
    </>
  );
};

/* =========================================================
   Kariyer Sayfası (Form)
========================================================= */
const WHATSAPP_NUMBER_INTL = "905394297969";
const LANG_OPTIONS = ["Fransızca", "Almanca", "İngilizce", "Türkçe"] as const;

const TR_CITIES = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];
const CH_CITIES = ["Aarau","Baden","Baar","Basel","Bern","Biel/Bienne","Carouge","Chur","Dietikon","Emmen","Frauenfeld","Fribourg","Geneve","Genève","Köniz","Kriens","La Chaux-de-Fonds","Lausanne","Lugano","Luzern","Montreux","Meyrin","Neuchâtel","Rapperswil-Jona","Sion","Schaffhausen","St. Gallen","Thun","Uster","Vernier","Wädenswil","Wetzikon","Wil","Winterthur","Yverdon-les-Bains","Zug","Zürich"];
const DE_CITIES = ["Aachen","Augsburg","Berlin","Bielefeld","Bochum","Bonn","Braunschweig","Bremen","Chemnitz","Dortmund","Dresden","Duisburg","Düsseldorf","Essen","Frankfurt am Main","Freiburg im Breisgau","Gelsenkirchen","Hagen","Hamburg","Hannover","Heidelberg","Herne","Karlsruhe","Kassel","Kiel","Köln","Krefeld","Leipzig","Leverkusen","Lübeck","Magdeburg","Mainz","Mannheim","Mönchengladbach","München","Münster","Nürnberg","Oberhausen","Oldenburg","Osnabrück","Potsdam","Rostock","Saarbrücken","Solingen","Stuttgart","Wiesbaden","Wuppertal"];
const FR_CITIES = ["Aix-en-Provence","Amiens","Angers","Annecy","Argenteuil","Avignon","Bordeaux","Boulogne-Billancourt","Brest","Caen","Clermont-Ferrand","Dijon","Grenoble","Le Havre","Lille","Limoges","Lyon","Marseille","Metz","Montpellier","Montreuil","Mulhouse","Nancy","Nantes","Nice","Nîmes","Orléans","Paris","Perpignan","Poitiers","Reims","Rennes","Rouen","Saint-Denis","Saint-Étienne","Strasbourg","Toulon","Toulouse","Tours","Villeurbanne"];
const MA_CITIES = ["Agadir","Al Hoceïma","Béni Mellal","Berkane","Casablanca","Dakhla","El Jadida","Errachidia","Fès","Guelmim","Kénitra","Khémisset","Khouribga","Ksar El-Kébir","Larache","Laâyoune","Marrakech","Meknès","Mohammédia","Nador","Ouarzazate","Oujda","Rabat","Safi","Settat","Taroudant","Taza","Témara","Tétouan","Tanger"];

const COUNTRY_CITY: Record<string, string[]> = {
  "Türkiye": TR_CITIES,
  "İsviçre": CH_CITIES,
  "Almanya": DE_CITIES,
  "Fransa": FR_CITIES,
  "Fas": MA_CITIES,
};

const Kariyer = () => {
  const { t, lang } = useT();

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState<keyof typeof COUNTRY_CITY | "">("");
  const [city, setCity] = React.useState("");
  const [langs, setLangs] = React.useState<string[]>([]);
  const [about, setAbout] = React.useState("");
  const [kvkk, setKvkk] = React.useState(true);
  const [cvName, setCvName] = React.useState("");
  const [cvErr, setCvErr] = React.useState<string | null>(null);

  const toggleLang = (l: string) => setLangs((prev) => (prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]));

  const buildText = () => {
    const L = (k: string) => I18N[lang][k] ?? I18N.tr[k] ?? k;
    const langText = langs.length ? langs.join(", ") : "—";
    const location = [country || "—", city || "—"].filter(Boolean).join(" / ");
    return [
      L("msg.header"), "",
      `${L("msg.email")}: ${email || "—"}`,
      `${L("msg.phone")}: ${phone || "—"}`,
      `${L("msg.location")}: ${location}`,
      `${L("msg.langs")}: ${langText}`, "",
      `${L("msg.summary")}:`,
      about || "—", "",
      cvName ? `${L("msg.cv")}: ${cvName} ${L("msg.cv.note")}` : undefined, "",
      L("msg.sent")
    ].filter(Boolean).join("\n");
  };

  const openGmailCompose = (subject: string, body: string) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(HR_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(HR_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(isMobile ? mailtoUrl : gmailUrl, "_blank", "noopener,noreferrer");
  };

  const sendGmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!kvkk) { alert(t("career.err.kvkk")); return; }
    const su = I18N[lang]["msg.subject"] ?? I18N.tr["msg.subject"];
    openGmailCompose(su, buildText());
  };

  const sendWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!kvkk) { alert(t("career.err.kvkk")); return; }
    const url = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(buildText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onCountryChange = (val: string) => { setCountry(val as any); setCity(""); };

  const onCvChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCvErr(null);
    const f = e.target.files?.[0];
    if (!f) { setCvName(""); return; }
    const okExt = [".pdf", ".doc", ".docx"];
    const name = f.name || "";
    the: {
      const lower = name.toLowerCase();
      const hasExt = okExt.some(ext => lower.endsWith(ext));
      if (!hasExt) { setCvErr(t("career.cv.err.ext")); e.target.value = ""; setCvName(""); break the; }
      const maxBytes = 10 * 1024 * 1024;
      if (f.size > maxBytes) { setCvErr(t("career.cv.err.size")); e.target.value = ""; setCvName(""); break the; }
      setCvName(name);
    }
  };

  // Masaüstünde Gmail Compose, mobilde mailto:
  const onStaticEmailClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const mailtoUrl = `mailto:${HR_EMAIL}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(HR_EMAIL)}`;
    window.open(isMobile ? mailtoUrl : gmailUrl, "_blank", "noopener,noreferrer");
  };

  // Konum linki – Google Haritalar:
  const onMapClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    window.open(MAPS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <main style={{ background: "#0f172a", minHeight: "100vh", padding: "120px 16px 60px", color: "#e5e7eb" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, textAlign: "center", marginBottom: 16 }}>{t("career.title")}</h1>
        <p style={{ textAlign: "center", opacity: .9, marginBottom: 28 }}>{t("career.lead")}</p>

        <div className="career-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24 }}>
          <div style={{ background: "#0f172a", border: "1px solid #233146", borderRadius: 16, padding: 20 }}>
            <form style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder={t("career.email.ph")} style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} inputMode="email" />
                <input placeholder={t("career.phone.ph")} style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} inputMode="tel" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <select value={country} onChange={(e) => onCountryChange(e.target.value)} style={selectStyle}>
                  <option value="">{t("career.country")}</option>
                  {Object.keys(COUNTRY_CITY).sort((a, b) => a.localeCompare(b, "tr")).map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select value={city} onChange={(e) => setCity(e.target.value)} style={selectStyle} disabled={!country}>
                  <option value="">{country ? t("career.city") : t("career.chooseCountryFirst")}</option>
                  {country && [...COUNTRY_CITY[country]].sort((a, b) => a.localeCompare(b, "tr")).map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>

              <div style={{ ...inputStyle, padding: 12 }}>
                <div style={{ fontSize: 14, opacity: .9, marginBottom: 8 }}>{t("career.langs")}</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {LANG_OPTIONS.map(l => (
                    <label key={l} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <input type="checkbox" checked={langs.includes(l)} onChange={() => toggleLang(l)} />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              <textarea placeholder={t("career.about.ph")} rows={4} style={inputStyle} value={about} onChange={(e) => setAbout(e.target.value)} />

              <div>
                <input type="file" style={inputStyle} onChange={onCvChange} accept=".pdf,.doc,.docx" />
                {cvErr && <div style={{ color: "#fda4af", fontSize: 13, marginTop: 6 }}>{cvErr}</div>}
              </div>

              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} /> {t("career.kvkk")}
              </label>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button style={primaryBtn} onClick={sendGmail}>{t("career.btn.mail")}</button>
                <button style={whatsBtn} onClick={sendWhatsApp}>{t("career.btn.wa")}</button>
              </div>
            </form>
          </div>

          <div style={{ background: "#0f172a", border: "1px solid #233146", borderRadius: 16, padding: 20, display: "grid", gap: 12 }}>
            <p style={{ opacity: .95 }}>{t("career.lead")}</p>
            <p style={{ opacity: .7, fontSize: 13, marginTop: 10 }}>{t("career.cv.acceptNote")}</p>

            {/* Logo + iletişim */}
            <div className="reveal" style={{ marginTop: 12, display: "flex", justifyContent: "center" }} aria-label="Şirket logosu ve iletişim">
              <div style={{ width: "100%", maxWidth: 480, border: "1px solid #233146", borderRadius: 16, background: "#0b1220", padding: 12 }}>
                <div style={{ width: "100%", height: 240, borderRadius: 12, overflow: "hidden", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }} title="FreeConcept Logo">
                  <img src="/images/logo.jpg" srcSet="/images/logo.jpg 1x, /images/logo@2x.jpg 2x" alt="FreeConcept Logo" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} loading="lazy" decoding="async" />
                </div>
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Mail size={16} color="#cbd5e1" />
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      onClick={onStaticEmailClick}
                      style={{ color: "#e5e7eb", textDecoration: "underline" }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={16} color="#cbd5e1" />
                    <a
                      href={MAPS_URL}
                      onClick={onMapClick}
                      style={{ color: "#e5e7eb", textDecoration: "underline" }}
                    >
                      Muratpaşa, Antalya, Türkiye
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* /Logo + iletişim */}
          </div>
        </div>
      </div>
    </main>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #334155",
  fontSize: 16,
  background: "rgba(255,255,255,.04)",
  color: "#e5e7eb",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #334155",
  fontSize: 16,
  background: "#ffffff",
  color: "#111827",
};

const primaryBtn: React.CSSProperties = {
  background: "#4f46e5",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 12,
  border: 0,
  fontWeight: 700,
  cursor: "pointer",
};

const whatsBtn: React.CSSProperties = {
  background: "#16a34a",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 12,
  border: 0,
  fontWeight: 700,
  cursor: "pointer",
};

/* =========================================================
   App
========================================================= */
export default function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/kariyer"
            element={
              <Layout>
                <Kariyer />
              </Layout>
            }
          />
        </Routes>
      </HashRouter>
    </I18nProvider>
  );
}
