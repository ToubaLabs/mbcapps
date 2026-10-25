import type { Article, pressArticles } from "./content";
import type { Locale } from "@/i18n/locales";

type Translation = {
  category: string;
  title: string;
  excerpt: string;
  imageAlt: string;
  body: string[];
};

const translations: Record<Exclude<Locale, "fr">, Record<string, Translation>> = {
  en: {
    "grand-prix-monaco-circuler": {
      category: "Guides",
      title: "Monaco Grand Prix: getting around during the race",
      excerpt: "Road closures, schedules and authorised drop-off points: our guide to arriving on time without stress.",
      imageAlt: "The Fairmont hairpin on the Monaco Grand Prix circuit",
      body: [
        "During the Grand Prix, some of the Principality's streets become a race circuit. Usual routes change, access is controlled and traffic is very heavy during sessions.",
        "Book early",
        "Drivers are in high demand several weeks in advance. Arrange your journeys as soon as you know your schedule, especially your return at the end of the day.",
        "Allow extra time",
        "Allow considerably more time than usual, especially between Nice airport and Monaco on race days.",
        "“The simplest option: a driver at your disposal for the day, who can drop you off and pick you up as close as possible.”",
        "Drop-off points",
        "Your driver knows the authorised access points and will drop you off as close as possible to your grandstand, hotel or yacht.",
      ],
    },
    "aeroport-nice-monaco-options": {
      category: "Airport",
      title: "From Nice airport to Monaco: comparing all the options",
      excerpt: "Bus, train, helicopter or chauffeur: journey time, price and comfort for each option.",
      imageAlt: "Aerial view of Nice Côte d'Azur Airport and the coastline",
      body: [
        "Nice Côte d'Azur Airport is around thirty kilometres from Monaco. Several options are available, each with its own advantages.",
        "A private chauffeur",
        "Meet your driver in the arrivals hall, receive help with your luggage and travel directly to your hotel via the Basse Corniche or the motorway, depending on traffic.",
      ],
    },
    "adresses-monte-carlo-diner": {
      category: "Places",
      title: "Our favourite places for dinner in Monte Carlo",
      excerpt: "Michelin-starred restaurants, terraces with a view and more discreet addresses: our drivers' selection.",
      imageAlt: "The façade of the Casino de Monte-Carlo in Monaco",
      body: ["Every evening our drivers take guests to the Principality's finest restaurants. Here are the places they recommend most often."],
    },
    "eze-cap-ferrat-chauffeur": {
      category: "Guides",
      title: "A day in Èze and Saint-Jean-Cap-Ferrat with a chauffeur",
      excerpt: "A hilltop village, exotic garden and Riviera villas, without having to look for parking.",
      imageAlt: "The hilltop village of Èze overlooking the Mediterranean",
      body: ["A half-day itinerary, ideal with a chauffeur at your disposal."],
    },
    "monaco-yacht-show-navettes": {
      category: "Events",
      title: "Monaco Yacht Show: arranging transfers for your guests",
      excerpt: "Port Hercule, hotels and the airport: how to coordinate several vehicles without stress.",
      imageAlt: "Superyachts moored in Port Hercule during the Monaco Yacht Show",
      body: ["During the show, the area around the port is very busy. Here's how to plan ahead."],
    },
    "heliport-monaco": {
      category: "Airport",
      title: "Monaco heliport: how does it work?",
      excerpt: "Seven minutes from Nice: schedules, luggage and transfers to your hotel.",
      imageAlt: "Heli Air Monaco helicopters on the tarmac at Monaco heliport",
      body: ["Fontvieille heliport connects Nice and Monaco in just a few minutes."],
    },
  },
  it: {
    "grand-prix-monaco-circuler": {
      category: "Guide",
      title: "Gran Premio di Monaco: come spostarsi durante la gara",
      excerpt: "Strade chiuse, orari e punti di discesa autorizzati: la nostra guida per arrivare puntuali senza stress.",
      imageAlt: "Il tornante Fairmont sul circuito del Gran Premio di Monaco",
      body: [
        "Durante il Gran Premio, alcune strade del Principato diventano circuito. I percorsi abituali cambiano, gli accessi sono controllati e il traffico è molto intenso durante le sessioni.",
        "Prenotate in anticipo",
        "Gli autisti sono molto richiesti già diverse settimane prima. Organizzate gli spostamenti non appena conoscete gli orari, soprattutto per il ritorno a fine giornata.",
        "Prevedete più tempo",
        "Calcolate molto più tempo del solito, soprattutto tra l'aeroporto di Nizza e Monaco nei giorni di gara.",
        "«La soluzione più semplice: un autista a disposizione per la giornata, che vi accompagna e vi riprende il più vicino possibile.»",
        "I punti di discesa",
        "Il vostro autista conosce gli accessi autorizzati e vi accompagna il più vicino possibile alla tribuna, all'hotel o allo yacht.",
      ],
    },
    "aeroport-nice-monaco-options": {
      category: "Aeroporto",
      title: "Dall'aeroporto di Nizza a Monaco: tutte le opzioni a confronto",
      excerpt: "Autobus, treno, elicottero o autista: durata, prezzo e comfort di ogni soluzione.",
      imageAlt: "Vista aerea dell'aeroporto di Nizza Costa Azzurra e della costa",
      body: [
        "L'aeroporto di Nizza Costa Azzurra dista circa trenta chilometri da Monaco. Esistono diverse soluzioni, ognuna con i propri vantaggi.",
        "L'autista privato",
        "Accoglienza nella sala arrivi, assistenza con i bagagli e viaggio diretto fino all'hotel lungo la Basse Corniche o l'autostrada, a seconda del traffico.",
      ],
    },
    "adresses-monte-carlo-diner": {
      category: "Indirizzi",
      title: "I nostri indirizzi preferiti per una cena a Monte Carlo",
      excerpt: "Ristoranti stellati, terrazze panoramiche e locali più discreti: la selezione dei nostri autisti.",
      imageAlt: "La facciata del Casinò di Monte Carlo a Monaco",
      body: ["Ogni sera i nostri autisti accompagnano i clienti nei migliori ristoranti del Principato. Ecco quelli che consigliano più spesso."],
    },
    "eze-cap-ferrat-chauffeur": {
      category: "Guide",
      title: "Una giornata a Èze e Saint-Jean-Cap-Ferrat con autista",
      excerpt: "Un borgo arroccato, un giardino esotico e le ville della Riviera, senza cercare parcheggio.",
      imageAlt: "Il borgo arroccato di Èze con vista sul Mediterraneo",
      body: ["Un itinerario di mezza giornata, ideale con un autista a disposizione."],
    },
    "monaco-yacht-show-navettes": {
      category: "Eventi",
      title: "Monaco Yacht Show: organizzare i transfer per gli ospiti",
      excerpt: "Port Hercule, hotel e aeroporto: come coordinare più veicoli senza stress.",
      imageAlt: "Superyacht ormeggiati a Port Hercule durante il Monaco Yacht Show",
      body: ["Durante il salone, la zona intorno al porto è molto frequentata. Ecco come organizzarsi."],
    },
    "heliport-monaco": {
      category: "Aeroporto",
      title: "Eliporto di Monaco: come funziona?",
      excerpt: "A sette minuti da Nizza: orari, bagagli e transfer fino all'hotel.",
      imageAlt: "Elicotteri Heli Air Monaco sulla pista dell'eliporto di Monaco",
      body: ["L'eliporto di Fontvieille collega Nizza e Monaco in pochi minuti."],
    },
  },
  ru: {
    "grand-prix-monaco-circuler": {
      category: "Путеводители",
      title: "Гран-при Монако: как передвигаться во время гонки",
      excerpt: "Закрытые дороги, расписание и разрешённые места высадки: наш путеводитель поможет приехать вовремя без лишних забот.",
      imageAlt: "Поворот Fairmont на трассе Гран-при Монако",
      body: [
        "Во время Гран-при часть улиц княжества превращается в гоночную трассу. Привычные маршруты меняются, доступ ограничен, а во время заездов движение особенно плотное.",
        "Бронируйте заранее",
        "Водители пользуются большим спросом за несколько недель до гонки. Планируйте поездки, как только узнаете расписание, особенно обратный путь в конце дня.",
        "Оставьте запас времени",
        "В дни гонок закладывайте значительно больше времени, чем обычно, особенно на дорогу между аэропортом Ниццы и Монако.",
        "«Самый простой вариант — водитель в вашем распоряжении на весь день, который высадит и заберёт вас максимально близко к месту назначения».",
        "Места высадки",
        "Ваш водитель знает разрешённые подъезды и доставит вас как можно ближе к трибуне, отелю или яхте.",
      ],
    },
    "aeroport-nice-monaco-options": {
      category: "Аэропорт",
      title: "Из аэропорта Ниццы в Монако: сравнение всех вариантов",
      excerpt: "Автобус, поезд, вертолёт или водитель: время в пути, цена и комфорт каждого варианта.",
      imageAlt: "Вид с воздуха на аэропорт Ницца Лазурный Берег и побережье",
      body: [
        "Аэропорт Ницца Лазурный Берег находится примерно в тридцати километрах от Монако. Есть несколько вариантов поездки, каждый со своими преимуществами.",
        "Личный водитель",
        "Встреча в зале прилёта, помощь с багажом и прямая поездка до отеля по Нижнему карнизу или автомагистрали в зависимости от дорожной обстановки.",
      ],
    },
    "adresses-monte-carlo-diner": {
      category: "Адреса",
      title: "Наши любимые места для ужина в Монте-Карло",
      excerpt: "Рестораны со звёздами Michelin, террасы с видом и более уединённые заведения: выбор наших водителей.",
      imageAlt: "Фасад казино Монте-Карло в Монако",
      body: ["Каждый вечер наши водители доставляют гостей в лучшие рестораны княжества. Вот места, которые они рекомендуют чаще всего."],
    },
    "eze-cap-ferrat-chauffeur": {
      category: "Путеводители",
      title: "День в Эзе и Сен-Жан-Кап-Ферра с водителем",
      excerpt: "Горная деревня, экзотический сад и виллы Ривьеры без необходимости искать парковку.",
      imageAlt: "Деревня Эзе на холме над Средиземным морем",
      body: ["Маршрут на половину дня, идеально подходящий для поездки с водителем в вашем распоряжении."],
    },
    "monaco-yacht-show-navettes": {
      category: "Мероприятия",
      title: "Monaco Yacht Show: как организовать трансферы для гостей",
      excerpt: "Порт Эркюль, отели и аэропорт: как без стресса скоординировать несколько автомобилей.",
      imageAlt: "Суперъяхты в порту Эркюль во время Monaco Yacht Show",
      body: ["Во время выставки район порта очень загружен. Вот как подготовиться к поездкам."],
    },
    "heliport-monaco": {
      category: "Аэропорт",
      title: "Вертодром Монако: как это работает?",
      excerpt: "Семь минут от Ниццы: расписание, багаж и трансфер до отеля.",
      imageAlt: "Вертолёты Heli Air Monaco на площадке вертодрома Монако",
      body: ["Вертодром Фонвьей соединяет Ниццу и Монако всего за несколько минут."],
    },
  },
};

export function localizeArticle(article: Article, locale: Locale): Article {
  if (locale === "fr") return article;
  const translation = translations[locale][article.slug];
  if (!translation || translation.body.length !== article.body.length) {
    throw new Error(`Traduction de l'article manquante ou incomplète : ${locale}/${article.slug}`);
  }
  return {
    ...article,
    category: translation.category,
    title: translation.title,
    excerpt: translation.excerpt,
    image: article.image && { ...article.image, alt: translation.imageAlt },
    body: article.body.map((block, i) => ({ ...block, text: translation.body[i] })),
  };
}

const pressTranslations: Record<Exclude<Locale, "fr">, Record<string, { title: string; summary: string }>> = {
  en: {
    "Forbes Afrique": { title: "Mbaye Mangara: the success of a Senegalese entrepreneur in Monaco", summary: "The story of Monaco Black Car's founder, from his first car in 2012 to a fleet of twelve vehicles." },
    "BFM TV": { title: "Monaco Black Cars, the specialist in luxury chauffeur-driven transport", summary: "Monaco Black Cars featured in the “Businesses of the Future” section." },
    "Virtually.mc": { title: "Luxury transfer service – Monaco Black Car – Monaco", summary: "Monaco Black Car featured in Monaco's luxury directory: a varied fleet (Mercedes Classe S, Maybach Classe S, Tesla Model Y, Classe V…), 24/7 availability and hourly hire." },
  },
  it: {
    "Forbes Afrique": { title: "Mbaye Mangara: il successo di un imprenditore senegalese a Monaco", summary: "Il percorso del fondatore di Monaco Black Car, dalla prima auto nel 2012 a una flotta di dodici veicoli." },
    "BFM TV": { title: "Monaco Black Cars, lo specialista del trasporto di lusso con autista", summary: "Monaco Black Cars presentata nella rubrica «Imprese del futuro»." },
    "Virtually.mc": { title: "Servizio di transfer di lusso – Monaco Black Car – Monaco", summary: "Monaco Black Car presentata nell'elenco degli indirizzi di prestigio di Monaco: una flotta varia (Mercedes Classe S, Maybach Classe S, Tesla Model Y, Classe V…), disponibilità 24 ore su 24 e servizio a disposizione." },
  },
  ru: {
    "Forbes Afrique": { title: "Мбайе Мангара: успех сенегальского предпринимателя в Монако", summary: "История основателя Monaco Black Car: от первого автомобиля в 2012 году до автопарка из двенадцати машин." },
    "BFM TV": { title: "Monaco Black Cars — специалист по премиальным перевозкам с водителем", summary: "Monaco Black Cars в рубрике «Предприятия будущего»." },
    "Virtually.mc": { title: "Премиальный трансфер — Monaco Black Car — Монако", summary: "Monaco Black Car в каталоге престижных адресов Монако: разнообразный автопарк (Mercedes Classe S, Maybach Classe S, Tesla Model Y, Classe V…), круглосуточная доступность и почасовая аренда." },
  },
};

export function localizePressArticle(article: (typeof pressArticles)[number], locale: Locale) {
  if (locale === "fr") return article;
  const translation = pressTranslations[locale][article.media];
  if (!translation) throw new Error(`Traduction de presse manquante : ${locale}/${article.media}`);
  return { ...article, ...translation };
}
